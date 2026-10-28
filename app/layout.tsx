import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const sans = Geist({ subsets: ["latin"], variable: "--font-geist-sans", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

const description =
  "Annex turns another computer into a second display, or mirrors its screen. Mac, Windows and Linux in any " +
  "combination, over your network, a cable or the internet. Encrypted end to end. Free and open source.";

export const metadata: Metadata = {
  metadataBase: new URL("https://getannex.dev"),
  title: "Annex: use another computer as a second screen",
  description,
  applicationName: "Annex",
  icons: { icon: [{ url: "/assets/mark.svg", type: "image/svg+xml" }, { url: "/assets/favicon-64.png", sizes: "64x64" }], apple: "/assets/icon-256.png" },
  openGraph: {
    title: "Annex",
    description: "Use another computer as a second screen. Mac, Windows and Linux, encrypted end to end.",
    images: ["/assets/icon-256.png"],
    type: "website",
  },
  twitter: { card: "summary", title: "Annex", description },
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
