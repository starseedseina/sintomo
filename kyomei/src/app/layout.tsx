import type { Metadata } from "next";
import { Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { MessagesProvider } from "@/context/MessagesContext";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

const notoSerifJP = Noto_Serif_JP({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "共鳴 - 心友と共鳴して繋がる場所",
  description: "価値観・感性・精神性の近い人と本質的なつながりを育むコミュニティ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${notoSansJP.variable} ${notoSerifJP.variable} h-full`}
    >
      <body className="min-h-full bg-kyomei-cream text-kyomei-dark antialiased">
        <AppProvider>
          <MessagesProvider>
            {children}
          </MessagesProvider>
        </AppProvider>
      </body>
    </html>
  );
}
