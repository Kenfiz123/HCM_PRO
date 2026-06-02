import Link from "next/link";
import Leaderboard from "@/components/Leaderboard";
import LeaderboardClearButton from "@/components/LeaderboardClearButton";

export default function LeaderboardPage() {
  return (
    <main className="game-shell min-h-screen px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-cyan-200">Caro Quiz Battle</p>
            <h1 className="neon-title mt-2 text-4xl font-black md:text-6xl">Top người chơi</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              className="rounded-2xl bg-cyan-300 px-5 py-3 font-black text-slate-950 transition hover:bg-cyan-200"
              href="/game"
            >
              Chơi ngay
            </Link>
            <LeaderboardClearButton />
            <Link
              className="rounded-2xl border border-white/10 px-5 py-3 font-bold text-white transition hover:border-fuchsia-300 hover:bg-fuchsia-300/10"
              href="/presenter"
            >
              Presenter
            </Link>
          </div>
        </div>
        <Leaderboard captureEnabled limit={10} />
      </div>
    </main>
  );
}
