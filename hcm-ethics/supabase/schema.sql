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

create or replace function public.apply_score_card_target_effect(
  p_target_score_id uuid,
  p_player_score int,
  p_effect text
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

  if p_effect = 'steal' then
    effect_delta := least(current_target_score, greatest(1, ceil(current_target_score * 0.25)::int));
    next_target_score := greatest(0, current_target_score - effect_delta);
    next_player_score := p_player_score + effect_delta;
    message := 'Cướp ' || effect_delta || ' điểm từ đối thủ.';
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

revoke all on function public.apply_score_card_target_effect(uuid, int, text) from public;
grant execute on function public.apply_score_card_target_effect(uuid, int, text) to anon, authenticated;

do $$
begin
  alter publication supabase_realtime add table public.scores;
exception
  when duplicate_object then null;
end $$;
