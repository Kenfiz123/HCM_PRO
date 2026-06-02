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
