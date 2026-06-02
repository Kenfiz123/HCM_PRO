"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function GameHomePage() {
  const router = useRouter();
  const [playerName, setPlayerName] = useState(() =>
    typeof window === "undefined" ? "" : (localStorage.getItem("caro-player-name") ?? ""),
  );

  function startGame(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedName = playerName.trim() || "Khách mời";
    localStorage.setItem("caro-player-name", trimmedName);
    router.push("/play");
  }

  return (
    <main className="game-shell flex min-h-screen items-center justify-center px-4 py-8">
      <section className="grid w-full max-w-6xl items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6">
          <div className="inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm font-bold text-cyan-100 shadow-lg shadow-cyan-500/10">
            Mini game cuối bài thuyết trình
          </div>
          <div>
            <h1 className="neon-title text-5xl font-black leading-tight md:text-7xl">Caro Quiz Battle</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-200">
              Đánh caro với bot, trả lời câu hỏi để nhận kỹ năng và leo bảng xếp hạng.
            </p>
          </div>

          <form
            className="max-w-xl rounded-[1.5rem] border border-white/10 bg-white/[0.07] p-5 shadow-2xl shadow-fuchsia-900/20 backdrop-blur"
            onSubmit={startGame}
          >
            <label className="text-sm font-bold text-slate-200" htmlFor="player-name">
              Tên người chơi
            </label>
            <input
              autoComplete="name"
              className="mt-3 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-4 text-lg font-bold text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300 focus:ring-4 focus:ring-cyan-300/15"
              id="player-name"
              maxLength={28}
              onChange={(event) => setPlayerName(event.target.value)}
              placeholder="Nhập tên để lên top"
              value={playerName}
            />
            <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto]">
              <button
                className="rounded-2xl bg-cyan-300 px-6 py-4 text-base font-black text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5 hover:bg-cyan-200"
                type="submit"
              >
                Bắt đầu chơi
              </button>
              <Link
                className="rounded-2xl border border-white/10 px-6 py-4 text-center font-bold text-white transition hover:-translate-y-0.5 hover:border-fuchsia-300 hover:bg-fuchsia-300/10"
                href="/leaderboard"
              >
                Bảng xếp hạng
              </Link>
            </div>
          </form>
        </div>

        <div className="float-card rounded-[2rem] border border-white/10 bg-slate-950/60 p-5 shadow-2xl shadow-cyan-900/20 backdrop-blur">
          <div className="grid grid-cols-3 gap-3">
            {Array.from({ length: 9 }).map((_, index) => (
              <div
                className={[
                  "aspect-square rounded-2xl border border-white/10 bg-white/[0.06] text-center text-4xl font-black leading-[1.9]",
                  index === 0 || index === 4 || index === 8
                    ? "text-cyan-200 shadow-lg shadow-cyan-500/10"
                    : index === 2 || index === 5
                      ? "text-fuchsia-200 shadow-lg shadow-fuchsia-500/10"
                      : "text-slate-700",
                ].join(" ")}
                key={index}
              >
                {index === 0 || index === 4 || index === 8 ? "X" : index === 2 || index === 5 ? "O" : ""}
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-2xl bg-gradient-to-r from-cyan-300/15 via-fuchsia-300/15 to-yellow-300/15 p-4">
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="text-2xl font-black text-cyan-100">9x9</p>
                <p className="text-xs text-slate-300">Bàn caro</p>
              </div>
              <div>
                <p className="text-2xl font-black text-fuchsia-100">18</p>
                <p className="text-xs text-slate-300">Câu hỏi</p>
              </div>
              <div>
                <p className="text-2xl font-black text-yellow-100">Live</p>
                <p className="text-xs text-slate-300">Leaderboard</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
