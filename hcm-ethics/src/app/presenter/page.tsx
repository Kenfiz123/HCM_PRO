import Leaderboard from "@/components/Leaderboard";
import QRCodeJoin from "@/components/QRCodeJoin";

export default function PresenterPage() {
  return (
    <main className="game-shell min-h-screen overflow-hidden px-6 py-8">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="space-y-7">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.28em] text-cyan-200">Quét QR để tham gia</p>
            <h1 className="neon-title mt-3 text-5xl font-black leading-tight md:text-7xl">Caro Quiz Battle</h1>
          </div>
          <QRCodeJoin />
          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.07] p-5 text-center text-xl font-black leading-9 text-white shadow-2xl shadow-cyan-900/20 backdrop-blur">
            Quét QR - Nhập tên - Đánh bại bot - Trả lời câu hỏi - Lên top bảng xếp hạng
          </div>
        </section>

        <section>
          <Leaderboard compact limit={5} />
        </section>
      </div>
    </main>
  );
}
