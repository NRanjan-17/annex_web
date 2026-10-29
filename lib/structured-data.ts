import { QUESTIONS } from "@/components/faq";
import { DOWNLOADS, REPO, SITE } from "@/components/links";

const author = { "@type": "Person", "@id": `${SITE}/#author`, name: "Nalinish Ranjan", url: "https://github.com/NRanjan-17" };

const app = {
  "@type": "SoftwareApplication",
  "@id": `${SITE}/#app`,
  name: "Annex",
  url: SITE,
  description:
    "Annex turns another computer into a second display, or mirrors its screen. Mac, Windows and Linux in any combination, " +
    "over your network, a cable or the internet. Encrypted end to end. Free and open source.",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "macOS 14 or later, Windows 10 (2004) or 11, Linux",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  isAccessibleForFree: true,
  license: "https://opensource.org/licenses/MIT",
  downloadUrl: [DOWNLOADS.mac, DOWNLOADS.windows, DOWNLOADS.windowsArm, DOWNLOADS.linux],
  image: `${SITE}/assets/icon-256.png`,
  featureList: [
    "Extend: use another computer as a second monitor",
    "Mirror: see and use another computer's screen",
    "Control: one mouse and keyboard for both computers",
    "Mac, Windows and Linux in any combination",
    "Local network, Ethernet or Thunderbolt cable, direct Wi-Fi, or the internet with a 6-character code",
    "About 8 ms delay with hardware video encoding; up to 240 Hz",
    "Sound, clipboard and file transfer",
    "End-to-end encryption (TLS 1.3 over QUIC), PIN pairing with SPAKE2",
    "No account and no tracking",
  ],
  author,
  sameAs: [REPO],
};

export const homeData = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebSite", "@id": `${SITE}/#website`, url: SITE, name: "Annex", publisher: { "@id": `${SITE}/#author` } },
    author,
    app,
    {
      "@type": "FAQPage",
      "@id": `${SITE}/#faq`,
      mainEntity: QUESTIONS.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
    },
  ],
};

export const docsData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TechArticle",
      "@id": `${SITE}/docs#article`,
      headline: "Annex docs: install, pair two computers and use every feature",
      url: `${SITE}/docs`,
      about: { "@id": `${SITE}/#app` },
      author: { "@id": `${SITE}/#author` },
      inLanguage: "en",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Annex", item: SITE },
        { "@type": "ListItem", position: 2, name: "Docs", item: `${SITE}/docs` },
      ],
    },
  ],
};
