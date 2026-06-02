import { createClient, RealtimeChannel } from "@supabase/supabase-js";
import { GameResult } from "@/lib/gameLogic";

function normalizeSupabaseUrl(url: string | undefined): string | null {
  if (!url) {
    return null;
  }

  const trimmedUrl = url.trim().replace(/\/+$/, "");
  const restEndpointSuffix = "/rest/v1";
  return trimmedUrl.endsWith(restEndpointSuffix)
    ? trimmedUrl.slice(0, -restEndpointSuffix.length)
    : trimmedUrl;
}

const supabaseUrl = normalizeSupabaseUrl(process.env.NEXT_PUBLIC_SUPABASE_URL);
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export type ScoreRow = {
  id: string;
  player_name: string;
  score: number;
  result: GameResult;
  correct_answers: number;
  wrong_answers: number;
  total_moves: number;
  created_at: string;
};

export type ScoreInsert = Omit<ScoreRow, "id" | "created_at">;
export type TargetCardEffect = "steal" | "split";

export type TargetCardEffectResult = {
  player_score: number;
  target_score: number;
  delta: number;
  message: string;
};

export async function fetchLeaderboard(limit = 10): Promise<{
  rows: ScoreRow[];
  error: string | null;
}> {
  if (!supabase) {
    return { rows: [], error: "Chưa kết nối Supabase" };
  }

  const { data, error } = await supabase
    .rpc("get_leaderboard", { p_limit: limit });

  if (error) {
    return { rows: [], error: error.message };
  }

  return { rows: (data ?? []) as ScoreRow[], error: null };
}

export async function submitScore(payload: ScoreInsert): Promise<{ error: string | null }> {
  if (!supabase) {
    return { error: "Chưa kết nối Supabase" };
  }

  const { error } = await supabase.rpc("upsert_player_score", {
    p_player_name: payload.player_name,
    p_score: payload.score,
    p_result: payload.result,
    p_correct_answers: payload.correct_answers,
    p_wrong_answers: payload.wrong_answers,
    p_total_moves: payload.total_moves,
  });
  return { error: error?.message ?? null };
}

export async function applyTargetCardEffect(payload: {
  targetScoreId: string;
  playerScore: number;
  effect: TargetCardEffect;
  percent?: number;
}): Promise<{ result: TargetCardEffectResult | null; error: string | null }> {
  if (!supabase) {
    return { result: null, error: "Chưa kết nối Supabase" };
  }

  const { data, error } = await supabase.rpc("apply_score_card_target_effect", {
    p_target_score_id: payload.targetScoreId,
    p_player_score: Math.max(0, Math.floor(payload.playerScore)),
    p_effect: payload.effect,
    p_percent: payload.percent ?? null,
  });

  if (error) {
    return { result: null, error: error.message };
  }

  const firstRow = Array.isArray(data) ? data[0] : data;
  return { result: (firstRow ?? null) as TargetCardEffectResult | null, error: null };
}

export async function clearLeaderboard(): Promise<{ error: string | null }> {
  if (!supabase) {
    return { error: "Chưa kết nối Supabase" };
  }

  const { error } = await supabase.rpc("clear_leaderboard");
  return { error: error?.message ?? null };
}

export function subscribeLeaderboard(onChange: () => void): (() => void) | null {
  if (!supabase) {
    return null;
  }

  const channel: RealtimeChannel = supabase
    .channel("scores-realtime")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "scores" },
      () => onChange(),
    )
    .subscribe();

  return () => {
    void supabase.removeChannel(channel);
  };
}
