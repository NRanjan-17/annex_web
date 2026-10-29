import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SITE } from "@/components/links";
import "./globals.css";

const sans = Geist({ subsets: ["latin"], variable: "--font-geist-sans", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

const title = "Annex: use another computer as a second monitor (Mac, Windows, Linux)";
const description =
  "Free, open-source app that turns another computer into a second monitor, or mirrors its screen. " +
  "Mac, Windows and Linux in any combination, encrypted end to end.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: title, template: "%s · Annex" },
  description,
  applicationName: "Annex",
  authors: [{ name: "Nalinish Ranjan", url: "https://github.com/NRanjan-17" }],
  creator: "Nalinish Ranjan",
  category: "technology",
  keywords: [
    "second monitor",
    "use laptop as second monitor",
    "use PC as second monitor for Mac",
    "use Mac as second monitor for PC",
    "extend display to another computer",
    "screen mirroring Mac Windows Linux",
    "share mouse and keyboard between computers",
    "remote desktop",
    "open source",
  ],
  // The plain-text version of the site, for AI agents (llmstxt.org).
  alternates: { canonical: "/", types: { "text/plain": [{ url: "/llms.txt", title: "Annex for AI agents" }] } },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  icons: { icon: [{ url: "/assets/mark.svg", type: "image/svg+xml" }, { url: "/assets/favicon-64.png", sizes: "64x64" }], apple: "/assets/icon-256.png" },
  openGraph: { title, description, url: "/", siteName: "Annex", locale: "en_US", type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-black"
        >
          Skip to content
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
