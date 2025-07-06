import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ファイル拡張子チェッカー | File Extension Checker",
  description: "画像ファイルの拡張子と実際のファイル形式を比較して不一致を検出するツール。マジックバイトを読み取って正確な形式を判定し、最大1000ファイルまで一括処理可能。",
  keywords: ["ファイル拡張子", "画像形式", "マジックバイト", "ファイル判定", "JPEG", "PNG", "GIF", "WebP"],
  authors: [{ name: "File Extension Checker" }],
  robots: "index, follow",
  openGraph: {
    title: "ファイル拡張子チェッカー",
    description: "画像ファイルの拡張子と実際のファイル形式を比較して不一致を検出するツール",
    type: "website",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "ファイル拡張子チェッカー",
    description: "画像ファイルの拡張子と実際のファイル形式を比較して不一致を検出するツール",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
