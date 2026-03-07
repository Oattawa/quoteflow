import type { Metadata } from "next";
import localFont from "next/font/local";
import { SpeedInsights } from '@vercel/speed-insights/next';
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://quoteflow.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "QuoteFlow — AI Proposal Generator for Freelancers",
    template: "%s | QuoteFlow",
  },
  description:
    "Write winning freelance proposals in 60 seconds. QuoteFlow uses AI to generate professional, client-ready proposals instantly — no templates needed.",
  keywords: [
    "freelance proposal generator",
    "AI proposal writer",
    "proposal template for freelancers",
    "freelance quote generator",
    "client proposal software",
    "how to write a freelance proposal",
    "proposal writer AI",
    "business proposal generator",
    "freelancer tools",
  ],
  authors: [{ name: "QuoteFlow" }],
  creator: "QuoteFlow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "QuoteFlow",
    title: "QuoteFlow — AI Proposal Generator for Freelancers",
    description:
      "Write winning freelance proposals in 60 seconds with AI. Free to start.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "QuoteFlow — AI Proposal Generator for Freelancers" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "QuoteFlow — AI Proposal Generator for Freelancers",
    description:
      "Write winning freelance proposals in 60 seconds with AI. Free to start.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
