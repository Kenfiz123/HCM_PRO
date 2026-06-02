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

export async function fetchLeaderboard(limit = 10): Promise<{
  rows: ScoreRow[];
  error: string | null;
}> {
  if (!supabase) {
    return { rows: [], error: "Chưa kết nối Supabase" };
  }

  const { data, error } = await supabase
    .from("scores")
    .select("*")
    .order("score", { ascending: false })
    .order("created_at", { ascending: true })
    .limit(limit);

  if (error) {
    return { rows: [], error: error.message };
  }

  return { rows: (data ?? []) as ScoreRow[], error: null };
}

export async function submitScore(payload: ScoreInsert): Promise<{ error: string | null }> {
  if (!supabase) {
    return { error: "Chưa kết nối Supabase" };
  }

  const { error } = await supabase.from("scores").insert(payload);
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
      { event: "INSERT", schema: "public", table: "scores" },
      () => onChange(),
    )
    .subscribe();

  return () => {
    void supabase.removeChannel(channel);
  };
}
