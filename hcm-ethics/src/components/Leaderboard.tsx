"use client";

import { useEffect, useState } from "react";
import { fetchLeaderboard, ScoreRow, subscribeLeaderboard } from "@/lib/supabaseClient";
import { getResultLabel } from "@/lib/scoring";

type LeaderboardProps = {
  limit?: number;
  compact?: boolean;
};

export default function Leaderboard({ limit = 10, compact = false }: LeaderboardProps) {
  const [rows, setRows] = useState<ScoreRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadRows() {
      const result = await fetchLeaderboard(limit);
      if (!active) {
        return;
      }

      setRows(result.rows);
      setStatus(result.error);
      setLoading(false);
    }

    void loadRows();
    const unsubscribe = subscribeLeaderboard(() => {
      void loadRows();
    });

    return () => {
      active = false;
      unsubscribe?.();
    };
  }, [limit]);

  if (status) {
    return (
      <div className="rounded-[1.5rem] border border-amber-300/30 bg-amber-300/10 p-6 text-center text-amber-100">
        <p className="text-lg font-black">{status}</p>
        <p className="mt-2 text-sm text-amber-50/80">
          Game vẫn chơi được bình thường. Leaderboard sẽ hoạt động sau khi cấu hình Supabase.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.06] shadow-2xl shadow-fuchsia-900/20 backdrop-blur">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <h2 className={compact ? "text-xl font-black text-white" : "text-2xl font-black text-white"}>
          Bảng xếp hạng
        </h2>
        <span className="rounded-full bg-emerald-300/15 px-3 py-1 text-xs font-bold text-emerald-100">
          Realtime
        </span>
      </div>

      {loading ? (
        <div className="p-8 text-center text-slate-300">Đang tải leaderboard...</div>
      ) : rows.length === 0 ? (
        <div className="p-8 text-center text-slate-300">Chưa có điểm. Hãy là người đầu tiên lên bảng.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead className="bg-slate-950/60 text-xs uppercase tracking-[0.16em] text-slate-400">
              <tr>
                <th className="px-4 py-3">Rank</th>
                <th className="px-4 py-3">Tên</th>
                <th className="px-4 py-3">Điểm</th>
                <th className="px-4 py-3">Trận thắng</th>
                <th className="px-4 py-3">Câu đúng</th>
                {!compact ? <th className="px-4 py-3">Thời gian</th> : null}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => {
                const rankClass =
                  index === 0
                    ? "bg-yellow-300/15 text-yellow-100"
                    : index === 1
                      ? "bg-slate-200/10 text-slate-100"
                      : index === 2
                        ? "bg-amber-600/15 text-amber-100"
                        : "text-slate-200";

                return (
                  <tr className={`border-t border-white/10 ${rankClass}`} key={row.id}>
                    <td className="px-4 py-4 text-lg font-black">#{index + 1}</td>
                    <td className="px-4 py-4 font-bold">{row.player_name}</td>
                    <td className="px-4 py-4 text-lg font-black text-cyan-100">{row.score}</td>
                    <td className="px-4 py-4">
                      {row.result === "win" ? 1 : 0}
                      <span className="ml-2 text-xs text-slate-400">({getResultLabel(row.result)})</span>
                    </td>
                    <td className="px-4 py-4">{row.correct_answers}</td>
                    {!compact ? (
                      <td className="px-4 py-4 text-slate-300">
                        {new Intl.DateTimeFormat("vi-VN", {
                          hour: "2-digit",
                          minute: "2-digit",
                          day: "2-digit",
                          month: "2-digit",
                        }).format(new Date(row.created_at))}
                      </td>
                    ) : null}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
