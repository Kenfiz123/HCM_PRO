"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type EvidenceMedia = {
  description?: string;
  imageAlt?: string;
  imageSrc?: string;
  sourceUrl?: string;
  title: string;
  videoEmbedUrl?: string;
};

export type PresentationDetailItem = {
  badge?: string;
  body: string[];
  evidenceMedia?: EvidenceMedia[];
  examples?: string[];
  summary: string;
  takeaway?: string;
  title: string;
};

type PresentationDetailCardsProps = {
  columns?: "two" | "three";
  concealFrontContent?: boolean;
  mediaFirstInModal?: boolean;
  items: PresentationDetailItem[];
};

export default function PresentationDetailCards({
  columns = "two",
  concealFrontContent = false,
  mediaFirstInModal = false,
  items,
}: PresentationDetailCardsProps) {
  const [selectedItem, setSelectedItem] = useState<PresentationDetailItem | null>(null);

  useEffect(() => {
    if (!selectedItem) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSelectedItem(null);
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedItem]);

  const gridClass = columns === "three" ? "md:grid-cols-3" : "md:grid-cols-2";
  const mediaSection = selectedItem?.evidenceMedia?.length ? (
    <section className="mt-6 rounded-2xl border border-[#ffd700]/45 bg-white p-5">
      <div className="grid gap-4 md:grid-cols-2">
        {selectedItem.evidenceMedia.map((media) => (
          <article
            className={`rounded-2xl border border-[#c8102e]/10 bg-[#fffaf0] p-3 ${
              media.videoEmbedUrl ? "md:col-span-2" : ""
            }`}
            key={media.title}
          >
            {media.imageSrc ? (
              <div className="relative aspect-video overflow-hidden rounded-2xl bg-[#fff0dc]">
                <Image
                  alt={media.imageAlt ?? media.title}
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  src={media.imageSrc}
                />
              </div>
            ) : null}

            {media.videoEmbedUrl ? (
              <div className="aspect-video overflow-hidden rounded-2xl bg-[#1a0a00]">
                <iframe
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="h-full w-full"
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  src={media.videoEmbedUrl}
                  title={media.title}
                />
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  ) : null;
  const bodySection = selectedItem ? (
    <div className="mt-5 space-y-4 text-base leading-8 text-[#3d1f00]">
      {selectedItem.body.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  ) : null;

  return (
    <>
      <div className={`stagger-child grid gap-5 ${gridClass}`}>
        {items.map((item, index) => {
          const frontLabel = item.badge ?? `Mục ${index + 1}`;

          return (
            <button
              className="detail-card effect-card rounded-2xl border border-[#c8102e]/10 bg-white p-6 text-left"
              key={item.title}
              onClick={() => setSelectedItem(item)}
              type="button"
            >
              {concealFrontContent ? null : (
                <span className="rounded-full bg-gradient-to-r from-[#ffd700] to-[#f59e0b] px-3 py-1 text-xs font-black text-[#8b0000] shadow-sm">
                  {frontLabel}
                </span>
              )}
              <h3 className={concealFrontContent ? "text-2xl font-black text-[#8b0000]" : "mt-4 text-xl font-black text-[#8b0000]"}>
                {concealFrontContent ? frontLabel : item.title}
              </h3>
              {concealFrontContent ? null : <p className="mt-3 leading-7 text-[#3d1f00]">{item.summary}</p>}
              <span className="mt-5 inline-flex text-sm font-black text-[#c8102e]">Mở chi tiết</span>
            </button>
          );
        })}
      </div>

      {selectedItem ? (
        <div
          aria-modal="true"
          className="detail-modal-backdrop fixed inset-0 z-[80] flex items-center justify-center bg-[#1a0a00]/70 px-4 py-6 backdrop-blur-sm"
          onClick={() => setSelectedItem(null)}
          role="dialog"
        >
          <article
            className={`detail-modal modal-pop max-h-[min(86vh,760px)] w-full max-w-3xl overflow-y-auto rounded-3xl border border-[#ffd700]/35 bg-[#fffaf0] p-6 text-[#1a0a00] shadow-2xl md:p-8 ${
              mediaFirstInModal ? "media-first-modal" : ""
            }`}
            onClick={(event) => event.stopPropagation()}
          >
            <header className="flex items-start justify-between gap-4 border-b border-[#c8102e]/15 pb-4">
              <div>
                {selectedItem.badge ? (
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-[#c8102e]">{selectedItem.badge}</p>
                ) : null}
                <h2 className="mt-2 text-2xl font-black text-[#8b0000] md:text-3xl">{selectedItem.title}</h2>
              </div>
              <button
                aria-label="Đóng nội dung chi tiết"
                className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-[#c8102e]/20 bg-white text-lg font-black text-[#8b0000] transition hover:bg-[#fff0dc]"
                onClick={() => setSelectedItem(null)}
                type="button"
              >
                x
              </button>
            </header>

            {mediaFirstInModal ? mediaSection : bodySection}
            {mediaFirstInModal ? bodySection : mediaSection}

            {selectedItem.takeaway ? (
              <p className="mt-6 rounded-2xl bg-[#8b0000] px-5 py-4 font-bold leading-7 text-[#fff0a0]">
                {selectedItem.takeaway}
              </p>
            ) : null}
          </article>
        </div>
      ) : null}
    </>
  );
}
