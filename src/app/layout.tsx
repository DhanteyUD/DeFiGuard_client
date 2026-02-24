import type { Metadata } from "next";
import { Geist, Geist_Mono, Handjet, Silkscreen } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const handjet = Handjet({
  variable: "--font-handjet",
  subsets: ["latin"],
});

const silkscreen = Silkscreen({
  variable: "--font-silkscreen",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const stedelijk = localFont({
  src: [
    {
      path: "../../public/fonts/architype-stedelijk/architype-stedelijk.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/architype-stedelijk/architype-stedelijk.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-stedelijk",
});

export const metadata: Metadata = {
  title: "DeFiGuard",
  description:
    "DeFiGuard is an AI-powered, multi-agent system that provides 24/7 proactive risk monitoring for DeFi portfolios across Solana and 12 EVM chains",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "DeFiGuard",
  },
  formatDetection: {
    telephone: false,
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#0f172a" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${handjet.variable} ${silkscreen.variable} ${stedelijk.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
