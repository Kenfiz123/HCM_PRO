drop function if exists public.apply_score_card_target_effect(uuid, int, text);

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
