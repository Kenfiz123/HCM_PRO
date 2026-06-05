import type { Metadata } from "next";
import ScrollEffects from "@/components/ScrollEffects";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tư tưởng đạo đức Hồ Chí Minh",
  description: "Bài thuyết trình về tư tưởng đạo đức Hồ Chí Minh kèm mini game Caro Quiz Battle cuối bài.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <head>
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link crossOrigin="anonymous" href="https://fonts.gstatic.com" rel="preconnect" />
        <link
          href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ScrollEffects />
        {children}
      </body>
    </html>
  );
}
