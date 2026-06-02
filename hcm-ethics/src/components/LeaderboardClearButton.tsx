"use client";

import { type FormEvent, useState } from "react";
import { CLEAR_LEADERBOARD_CONFIRM, LEADERBOARD_REFRESH_EVENT } from "@/lib/leaderboardEvents";
import { clearLeaderboard } from "@/lib/supabaseClient";

type LeaderboardClearButtonProps = {
  className?: string;
  inputClassName?: string;
  onCleared?: () => void;
  wrapperClassName?: string;
};

export default function LeaderboardClearButton({
  className = "",
  inputClassName = "",
  onCleared,
  wrapperClassName = "",
}: LeaderboardClearButtonProps) {
  const [clearing, setClearing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState("");

  async function handleClearLeaderboard(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (clearing) {
      return;
    }

    const trimmedPassword = password.trim();
    if (!trimmedPassword) {
      setError("Nhập pass để xóa BXH.");
      return;
    }

    const confirmed = window.confirm(CLEAR_LEADERBOARD_CONFIRM);
    if (!confirmed) {
      return;
    }

    setError(null);
    setClearing(true);
    const result = await clearLeaderboard(trimmedPassword);
    setClearing(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    setPassword("");
    onCleared?.();
    window.dispatchEvent(new Event(LEADERBOARD_REFRESH_EVENT));
  }

  return (
    <form
      className={wrapperClassName || "flex flex-col items-stretch gap-2 sm:items-end"}
      onSubmit={handleClearLeaderboard}
    >
      <input
        autoComplete="off"
        className={
          inputClassName ||
          "w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-2 text-sm font-semibold text-white outline-none transition placeholder:text-slate-400 focus:border-cyan-300 sm:w-44"
        }
        disabled={clearing}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Pass xóa"
        type="password"
        value={password}
      />
      <button
        className={
          className ||
          "rounded-2xl bg-rose-300 px-5 py-3 font-black text-slate-950 transition hover:bg-rose-200 disabled:cursor-not-allowed disabled:opacity-60"
        }
        disabled={clearing || !password.trim()}
        type="submit"
      >
        {clearing ? "Đang xóa" : "Xóa data BXH"}
      </button>
      {error ? <p className="max-w-52 text-right text-xs font-semibold text-rose-200">{error}</p> : null}
    </form>
  );
}
