create extension if not exists pgcrypto;

create table if not exists public.scores (
  id uuid primary key default gen_random_uuid(),
  player_name text not null,
  score int not null default 0,
  result text not null check (result in ('win', 'lose', 'draw')),
  correct_answers int not null default 0,
  wrong_answers int not null default 0,
  total_moves int not null default 0,
  created_at timestamptz default now()
);

alter table public.scores enable row level security;

drop policy if exists "scores_select_leaderboard" on public.scores;
create policy "scores_select_leaderboard"
on public.scores
for select
to anon, authenticated
using (true);

drop policy if exists "scores_insert_client" on public.scores;
create policy "scores_insert_client"
on public.scores
for insert
to anon, authenticated
with check (
  length(trim(player_name)) between 1 and 40
  and score >= 0
  and correct_answers >= 0
  and wrong_answers >= 0
  and total_moves >= 0
  and result in ('win', 'lose', 'draw')
);

create index if not exists scores_leaderboard_idx
on public.scores (score desc, created_at asc);

create or replace function public.get_leaderboard(p_limit int default 10)
returns table (
  id uuid,
  player_name text,
  score int,
  result text,
  correct_answers int,
  wrong_answers int,
  total_moves int,
  created_at timestamptz
)
language sql
security definer
set search_path = public
as $$
  with ranked_scores as (
    select
      scores.*,
      row_number() over (
        partition by lower(trim(scores.player_name))
        order by scores.score desc, scores.created_at asc
      ) as player_rank
    from public.scores
  )
  select
    ranked_scores.id,
    ranked_scores.player_name,
    ranked_scores.score,
    ranked_scores.result,
    ranked_scores.correct_answers,
    ranked_scores.wrong_answers,
    ranked_scores.total_moves,
    ranked_scores.created_at
  from ranked_scores
  where ranked_scores.player_rank = 1
  order by ranked_scores.score desc, ranked_scores.created_at asc
  limit greatest(1, least(coalesce(p_limit, 10), 50));
$$;

revoke all on function public.get_leaderboard(int) from public;
grant execute on function public.get_leaderboard(int) to anon, authenticated;

create or replace function public.upsert_player_score(
  p_player_name text,
  p_score int,
  p_result text default 'draw',
  p_correct_answers int default 0,
  p_wrong_answers int default 0,
  p_total_moves int default 0
)
returns table (
  id uuid,
  player_name text,
  score int,
  result text,
  correct_answers int,
  wrong_answers int,
  total_moves int,
  created_at timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
declare
  clean_name text;
  existing_id uuid;
begin
  clean_name := nullif(trim(p_player_name), '');

  if clean_name is null or length(clean_name) > 40 then
    raise exception 'Invalid player name';
  end if;

  if p_result not in ('win', 'lose', 'draw') then
    raise exception 'Invalid result';
  end if;

  select scores.id
  into existing_id
  from public.scores
  where lower(trim(scores.player_name)) = lower(clean_name)
  order by scores.score desc, scores.created_at asc
  limit 1
  for update;

  if existing_id is null then
    insert into public.scores as inserted_score (
      player_name,
      score,
      result,
      correct_answers,
      wrong_answers,
      total_moves
    )
    values (
      clean_name,
      greatest(0, coalesce(p_score, 0)),
      p_result,
      greatest(0, coalesce(p_correct_answers, 0)),
      greatest(0, coalesce(p_wrong_answers, 0)),
      greatest(0, coalesce(p_total_moves, 0))
    )
    returning inserted_score.id into existing_id;
  else
    delete from public.scores
    where lower(trim(scores.player_name)) = lower(clean_name)
      and scores.id <> existing_id;

    update public.scores
    set
      player_name = clean_name,
      score = greatest(0, coalesce(p_score, 0)),
      result = p_result,
      correct_answers = greatest(0, coalesce(p_correct_answers, 0)),
      wrong_answers = greatest(0, coalesce(p_wrong_answers, 0)),
      total_moves = greatest(0, coalesce(p_total_moves, 0))
    where scores.id = existing_id;
  end if;

  return query
  select
    scores.id,
    scores.player_name,
    scores.score,
    scores.result,
    scores.correct_answers,
    scores.wrong_answers,
    scores.total_moves,
    scores.created_at
  from public.scores
  where scores.id = existing_id;
end;
$$;

revoke all on function public.upsert_player_score(text, int, text, int, int, int) from public;
grant execute on function public.upsert_player_score(text, int, text, int, int, int) to anon, authenticated;

drop function if exists public.apply_score_card_target_effect(uuid, int, text);
drop function if exists public.apply_score_card_target_effect(uuid, int, text, int);

create or replace function public.apply_score_card_target_effect(
  p_target_score_id uuid,
  p_player_score int,
  p_effect text,
  p_percent int default 25
)
returns table (
  player_score int,
  target_score int,
  delta int,
  message text
)
language plpgsql
security definer
set search_path = public
as $$
declare
  current_target_score int;
  next_player_score int;
  next_target_score int;
  effect_delta int;
  safe_percent int;
begin
  if p_player_score is null or p_player_score < 0 then
    raise exception 'Invalid player score';
  end if;

  select score
  into current_target_score
  from public.scores
  where id = p_target_score_id
  for update;

  if not found then
    raise exception 'Target score not found';
  end if;

  safe_percent := greatest(0, least(coalesce(p_percent, 25), 100));

  if p_effect = 'steal' then
    effect_delta := least(current_target_score, ceil(current_target_score * safe_percent / 100.0)::int);
    next_target_score := greatest(0, current_target_score - effect_delta);
    next_player_score := p_player_score + effect_delta;
    message := 'Cướp ' || effect_delta || ' điểm (' || safe_percent || '%) từ đối thủ.';
  elsif p_effect = 'split' then
    next_player_score := ceil((p_player_score + current_target_score)::numeric / 2)::int;
    next_target_score := floor((p_player_score + current_target_score)::numeric / 2)::int;
    effect_delta := next_player_score - p_player_score;
    message := 'Chia đều điểm với đối thủ. Bạn ' ||
      case when effect_delta >= 0 then '+' else '' end ||
      effect_delta || ' điểm.';
  else
    raise exception 'Unsupported card effect';
  end if;

  update public.scores
  set score = next_target_score
  where id = p_target_score_id;

  player_score := greatest(0, next_player_score);
  target_score := greatest(0, next_target_score);
  delta := effect_delta;
  return next;
end;
$$;

revoke all on function public.apply_score_card_target_effect(uuid, int, text, int) from public;
grant execute on function public.apply_score_card_target_effect(uuid, int, text, int) to anon, authenticated;

create or replace function public.clear_leaderboard()
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  delete from public.scores
  where id is not null;
end;
$$;

revoke all on function public.clear_leaderboard() from public;
grant execute on function public.clear_leaderboard() to service_role;

do $$
begin
  alter publication supabase_realtime add table public.scores;
exception
  when duplicate_object then null;
end $$;

notify pgrst, 'reload schema';
