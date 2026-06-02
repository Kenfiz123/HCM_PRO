"use client";

import { useState } from "react";
import { CLEAR_LEADERBOARD_CONFIRM, LEADERBOARD_REFRESH_EVENT } from "@/lib/leaderboardEvents";
import { clearLeaderboard } from "@/lib/supabaseClient";

type LeaderboardClearButtonProps = {
  className?: string;
};

export default function LeaderboardClearButton({ className = "" }: LeaderboardClearButtonProps) {
  const [clearing, setClearing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClearLeaderboard() {
    if (clearing) {
      return;
    }

    const confirmed = window.confirm(CLEAR_LEADERBOARD_CONFIRM);
    if (!confirmed) {
      return;
    }

    setError(null);
    setClearing(true);
    const result = await clearLeaderboard();
    setClearing(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    window.dispatchEvent(new Event(LEADERBOARD_REFRESH_EVENT));
  }

  return (
    <div className="flex flex-col items-stretch gap-2 sm:items-end">
      <button
        className={
          className ||
          "rounded-2xl bg-rose-300 px-5 py-3 font-black text-slate-950 transition hover:bg-rose-200 disabled:cursor-not-allowed disabled:opacity-60"
        }
        disabled={clearing}
        onClick={handleClearLeaderboard}
        type="button"
      >
        {clearing ? "Đang xóa" : "Xóa data BXH"}
      </button>
      {error ? <p className="max-w-52 text-right text-xs font-semibold text-rose-200">{error}</p> : null}
    </div>
  );
}
