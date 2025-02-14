import type { Metadata } from "next";

export const defaultMetadata: Metadata = {
  title: {
    template: "%s | CodeCraft",
    default: "CodeCraft",
  },
  description: "CodeCraft",
  keywords: ["교육 관리", "학습 플랫폼", "온라인 교육"],
  authors: [{ name: "JungAngBibim", url: "https://bibimfront.vercel.app/" }],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://bibimfront.vercel.app/",
    siteName: "CodeCraft",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeCraft",
    description: "CodeCraft",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}; 