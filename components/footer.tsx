import { RELEASES, REPO } from "./links";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { href: "/#features", label: "Features" },
      { href: "/#how", label: "How it works" },
      { href: "/#download", label: "Download" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: RELEASES, label: "Releases" },
      { href: "/docs", label: "Docs" },
      { href: `${REPO}/issues`, label: "Report a bug" },
    ],
  },
  {
    title: "Open source",
    links: [
      { href: REPO, label: "GitHub" },
      { href: `${REPO}/blob/main/docs/SECURITY.md`, label: "Security" },
      { href: `${REPO}/blob/main/LICENSE`, label: "MIT licence" },
    ],
  },
];

/** After Clicky's footer (lookap b5fjfa): link columns over a giant wordmark, here outlined and
 *  fading like the hero's, so the page ends where it began. */
export function Footer() {
  return (
    <footer className="overflow-hidden">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-10 px-5 pt-20 md:grid-cols-4">
        {COLUMNS.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <p className="text-sm font-medium text-fg">{c.title}</p>
            <ul className="mt-4 space-y-3 text-sm text-faint">
              {c.links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="transition-colors duration-150 hover:text-fg">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
        <div className="col-span-2 md:col-span-1">
          <p className="text-sm font-medium text-fg">Privacy</p>
          <p className="mt-4 text-sm leading-6 text-faint">
            Annex has no accounts and no tracking. Your screen only ever goes between your own computers.
          </p>
        </div>
      </div>

      <svg viewBox="0 0 1000 200" className="mx-auto mt-10 block w-full max-w-6xl px-5" aria-hidden="true">
        <defs>
          <linearGradient id="footer-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity="0.32" />
            <stop offset="1" stopColor="#fff" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <text
          x="500"
          y="190"
          textAnchor="middle"
          fill="none"
          stroke="url(#footer-fade)"
          strokeWidth="1.4"
          className="font-sans"
          style={{ fontSize: 245, fontWeight: 600, letterSpacing: "-0.02em" }}
        >
          ANNEX
        </text>
      </svg>
      <p className="pb-8 text-center text-xs text-faint">© {new Date().getFullYear()} Annex</p>
    </footer>
  );
}
