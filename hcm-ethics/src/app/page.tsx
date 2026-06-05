import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import PresentationChatbot from "@/components/PresentationChatbot";
import AnimateOnScroll from "@/components/AnimateOnScroll";

const foundations = [
  {
    icon: "01",
    title: "Truyền thống đạo đức dân tộc Việt Nam",
    body: "Lòng yêu nước, nhân nghĩa, cần cù, đoàn kết và tinh thần lấy dân làm gốc.",
  },
  {
    icon: "02",
    title: "Tinh hoa đạo đức nhân loại",
    body: "Tiếp thu các giá trị tích cực từ Nho giáo, Phật giáo và đạo đức phương Tây tiến bộ.",
  },
  {
    icon: "03",
    title: "Chủ nghĩa Mác - Lênin",
    body: "Nền tảng của đạo đức cộng sản, tinh thần quốc tế vô sản và lý tưởng giải phóng con người.",
  },
];

const qualities = [
  "Trung với nước, hiếu với dân",
  "Cần, kiệm, liêm, chính, chí công vô tư",
  "Yêu thương con người",
  "Tinh thần quốc tế trong sáng",
];

const principles = [
  ["Nói đi đôi với làm", "Cán bộ, đảng viên phải nêu gương bằng hành động thực tế."],
  ["Xây đi đôi với chống", "Xây dựng đạo đức mới gắn với đấu tranh chống chủ nghĩa cá nhân."],
  ["Tu dưỡng suốt đời", "Rèn luyện đạo đức là việc làm thường xuyên, bền bỉ."],
  ["Gắn cá nhân với tập thể", "Đặt lợi ích chung lên trên lợi ích cá nhân."],
];

const meaningCards = [
  ["Đối với cách mạng", "Là nền tảng tư tưởng và đạo đức của Đảng, soi đường cho xây dựng đất nước."],
  ["Giá trị thời đại", "Kết tinh những giá trị đạo đức nhân loại, thống nhất lý tưởng với lối sống."],
  ["Đối với thế hệ trẻ", "Lấy đạo đức làm nền tảng trong học tập, nghề nghiệp và cuộc sống."],
];

export default function PresentationPage() {
  return (
    <main className="presentation-shell min-h-screen overflow-hidden bg-[#fff7ec] text-[#1a0a00]">
      <nav className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-gradient-to-r from-[#7f0000]/95 via-[#c8102e]/95 to-[#9f1239]/95 px-4 py-3 shadow-lg backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-2">
          {[
            ["Cơ sở", "#co-so"],
            ["Vai trò", "#vai-tro"],
            ["Phẩm chất", "#pham-chat"],
            ["Nguyên tắc", "#nguyen-tac"],
            ["Ý nghĩa", "#y-nghia"],
          ].map(([label, href]) => (
            <a className="nav-pill rounded-lg px-3 py-2 text-sm font-semibold text-white/85" href={href} key={href}>
              {label}
            </a>
          ))}
          <Link className="gold-button rounded-lg px-4 py-2 text-sm font-black text-[#8b0000]" href="/game">
            Chơi mini game
          </Link>
        </div>
      </nav>

      <section className="hero-stage relative flex min-h-screen items-center overflow-hidden bg-[url('/vietnam-bg.png')] bg-cover bg-center px-5 pb-24 pt-28 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-[#7f0000]/95 via-[#c8102e]/86 to-[#4c0519]/95" />
        <div className="hero-grid absolute inset-0 opacity-45" />
        <div className="light-beams absolute inset-0" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="sparkle-field absolute inset-0" aria-hidden="true">
          {Array.from({ length: 18 }).map((_, index) => (
            <span
              className="sparkle"
              key={index}
              style={
                {
                  "--sparkle-delay": `${index * -0.42}s`,
                  "--sparkle-duration": `${6 + (index % 5) * 0.55}s`,
                  "--sparkle-left": `${(index * 47) % 100}%`,
                } as CSSProperties
              }
            />
          ))}
        </div>

        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="text-center lg:text-left">
            <span className="hero-kicker mb-6 inline-flex rounded-full border border-[#ffd700]/45 bg-white/10 px-5 py-2 text-sm font-black uppercase tracking-[0.22em] text-[#fff0a0] backdrop-blur">
              Bài học tư tưởng đạo đức
            </span>
            <h1 className="hero-title text-4xl font-black leading-tight text-[#fff0a0] md:text-6xl">
              Tư Tưởng Đạo Đức
              <br />
              Hồ Chí Minh
            </h1>
            <p className="hero-description mt-5 max-w-3xl text-lg leading-8 text-white/90">
              Nền tảng tinh thần, sức mạnh nội sinh và kim chỉ nam cho sự nghiệp cách mạng Việt Nam, kết tinh từ tinh hoa văn hóa dân tộc và nhân loại.
            </p>
            <div className="hero-actions mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
              <a className="gold-button rounded-2xl px-6 py-4 font-black text-[#8b0000]" href="#co-so">
                Bắt đầu bài học
              </a>
              <Link className="glass-button rounded-2xl px-6 py-4 font-black text-white" href="/game">
                Ôn tập bằng game
              </Link>
            </div>
            <div className="scroll-cue mx-auto mt-10 lg:mx-0" aria-hidden="true">
              <span />
            </div>
          </div>

          <div className="portrait-aura mx-auto">
            <div className="portrait-ring">
              <Image
                alt="Chân dung Chủ tịch Hồ Chí Minh"
                className="rounded-full border-4 border-white object-cover"
                height={280}
                priority
                src="/hcm-portrait.png"
                width={280}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="lesson-section px-5 py-20" id="co-so">
        <AnimateOnScroll className="mx-auto max-w-6xl">
          <SectionTitle
            subtitle="Những cội nguồn và nét đặc trưng cốt lõi của tư tưởng đạo đức Hồ Chí Minh"
            title="Cơ Sở Hình Thành & Đặc Điểm"
          />
          <div className="stagger-child grid gap-5 md:grid-cols-3">
            {foundations.map((item) => (
              <article className="effect-card group rounded-2xl border border-[#c8102e]/10 bg-white p-6" key={item.title}>
                <span className="number-chip">{item.icon}</span>
                <h3 className="mt-5 text-xl font-black text-[#8b0000]">{item.title}</h3>
                <p className="mt-3 leading-7 text-[#3d1f00]">{item.body}</p>
              </article>
            ))}
          </div>
          <div className="effect-panel stagger-child mt-8 rounded-2xl border border-[#ffd700]/50 bg-white p-6">
            <h3 className="text-xl font-black text-[#8b0000]">Đặc điểm</h3>
            <ul className="mt-4 grid gap-3 text-[#3d1f00] md:grid-cols-2">
              <li>Kết hợp hài hòa giữa lý luận và thực tiễn, giữa nói và làm.</li>
              <li>Mang đậm tính dân tộc và tính thời đại.</li>
              <li>Coi đạo đức là gốc rễ, nền tảng của người cách mạng.</li>
              <li>Nhấn mạnh tu dưỡng đạo đức là việc làm suốt đời.</li>
            </ul>
          </div>
        </AnimateOnScroll>
      </section>

      <section className="lesson-section bg-[#fff0dc] px-5 py-20" id="vai-tro">
        <AnimateOnScroll className="mx-auto max-w-6xl">
          <SectionTitle subtitle="Tầm quan trọng mang tính nền tảng và quyết định" title="Vai Trò Của Đạo Đức" />
          <div className="stagger-child grid gap-5 md:grid-cols-2">
            {[
              "Đạo đức là gốc của người cách mạng, là nền tảng để hoàn thành sứ mệnh cách mạng.",
              "Đạo đức quyết định sự thành bại của người cán bộ và sự nghiệp cách mạng.",
              "Đạo đức cách mạng là đạo đức mới: vì Đảng, vì Tổ quốc, vì nhân dân.",
              "Đức và tài bổ sung cho nhau, trong đó đức là gốc và tài là biểu hiện trong hành động.",
            ].map((item, index) => (
              <article className="effect-card rounded-2xl bg-white p-6" key={item}>
                <span className="rounded-full bg-gradient-to-r from-[#ffd700] to-[#f59e0b] px-3 py-1 text-xs font-black text-[#8b0000] shadow-sm">
                  Vai trò {index + 1}
                </span>
                <p className="mt-4 leading-7 text-[#3d1f00]">{item}</p>
              </article>
            ))}
          </div>
        </AnimateOnScroll>
      </section>

      <section className="lesson-section px-5 py-20" id="pham-chat">
        <AnimateOnScroll className="mx-auto max-w-6xl">
          <SectionTitle subtitle="Bốn phẩm chất then chốt tạo nên nhân cách người cách mạng" title="Phẩm Chất Đạo Đức" />
          <div className="stagger-child grid gap-5 md:grid-cols-2">
            {qualities.map((quality, index) => (
              <article className="quality-card rounded-2xl border border-[#c8102e]/10 bg-white p-6" key={quality}>
                <div className="flex items-center gap-4">
                  <span className="quality-index">{index + 1}</span>
                  <h3 className="text-xl font-black text-[#8b0000]">{quality}</h3>
                </div>
              </article>
            ))}
          </div>
        </AnimateOnScroll>
      </section>

      <section className="lesson-section bg-[#fff0dc] px-5 py-20" id="nguyen-tac">
        <AnimateOnScroll className="mx-auto max-w-6xl">
          <SectionTitle subtitle="Phương châm hành động định hướng sự rèn luyện" title="Nguyên Tắc Xây Dựng Đạo Đức" />
          <div className="stagger-child timeline-list overflow-hidden rounded-2xl bg-white shadow-lg">
            {principles.map(([title, body], index) => (
              <div className="timeline-row grid border-b border-[#c8102e]/10 p-5 md:grid-cols-[260px_1fr]" key={title}>
                <strong className="text-[#8b0000]">
                  <span>{index + 1}</span>. {title}
                </strong>
                <p className="text-[#3d1f00]">{body}</p>
              </div>
            ))}
          </div>
        </AnimateOnScroll>
      </section>

      <section className="lesson-section px-5 py-20" id="y-nghia">
        <AnimateOnScroll className="mx-auto max-w-6xl">
          <SectionTitle title="Ý Nghĩa Của Tư Tưởng Đạo Đức Hồ Chí Minh" />
          <div className="stagger-child grid gap-5 md:grid-cols-3">
            {meaningCards.map(([title, body]) => (
              <article className="effect-card rounded-2xl bg-white p-6" key={title}>
                <h3 className="text-xl font-black text-[#8b0000]">{title}</h3>
                <p className="mt-3 leading-7 text-[#3d1f00]">{body}</p>
              </article>
            ))}
          </div>
          <div className="cta-animate cta-panel stagger-child mt-10 rounded-3xl bg-gradient-to-r from-[#8b0000] via-[#c8102e] to-[#9f1239] p-8 text-center text-white">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#fff0a0]">Cuối bài thuyết trình</p>
            <h2 className="mt-2 text-3xl font-black">Caro Quiz Battle</h2>
            <p className="mx-auto mt-3 max-w-2xl text-white/85">
              Sau khi xem bài, người nghe có thể bấm vào mini game để ôn lại nội dung qua câu hỏi và bảng xếp hạng.
            </p>
            <Link className="gold-button mt-6 inline-flex rounded-2xl px-7 py-4 font-black text-[#8b0000]" href="/game">
              Mở mini game
            </Link>
          </div>
        </AnimateOnScroll>
      </section>
      <PresentationChatbot />
    </main>
  );
}

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="section-title stagger-child mb-10 text-center">
      <h2 className="text-3xl font-black text-[#8b0000] md:text-4xl">{title}</h2>
      <div className="section-underline mx-auto mt-3 h-1 w-24 rounded-full bg-gradient-to-r from-[#c8102e] to-[#ffd700]" />
      {subtitle ? <p className="mx-auto mt-4 max-w-3xl text-[#6b4226]">{subtitle}</p> : null}
    </div>
  );
}
