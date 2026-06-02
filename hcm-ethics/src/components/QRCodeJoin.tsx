"use client";

import { useMemo, useState } from "react";

export default function QRCodeJoin() {
  const [origin] = useState(() => process.env.NEXT_PUBLIC_SITE_URL || (typeof window === "undefined" ? "" : window.location.origin));

  const joinUrl = useMemo(() => {
    const baseUrl = origin || "https://your-vercel-app.vercel.app";
    return `${baseUrl.replace(/\/$/, "")}/game`;
  }, [origin]);

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=360x360&margin=18&data=${encodeURIComponent(
    joinUrl,
  )}`;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="rounded-[2rem] border border-cyan-300/40 bg-white p-4 shadow-2xl shadow-cyan-500/20">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="QR code vào game Caro Quiz Battle" className="h-64 w-64 rounded-2xl md:h-80 md:w-80" src={qrUrl} />
      </div>
      <a
        className="max-w-full break-all rounded-full border border-white/10 bg-white/[0.07] px-4 py-2 text-center text-sm font-semibold text-cyan-100"
        href={joinUrl}
      >
        {joinUrl}
      </a>
    </div>
  );
}
