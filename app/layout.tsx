import type { Metadata } from "next";
import { Geist, Lora } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const loraSerif = Lora({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Memory Garden V2 — Cultivate Your Precious Moments",
  description:
    "A peaceful digital sanctuary where personal memories are nurtured and preserved as blooming flowers, plants, and gardens.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${loraSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-parchment text-earth-900 font-sans selection:bg-sage-100 selection:text-sage-900">
        {children}
      </body>
    </html>
  );
}

