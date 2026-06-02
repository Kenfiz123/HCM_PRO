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

do $$
begin
  alter publication supabase_realtime add table public.scores;
exception
  when duplicate_object then null;
end $$;
