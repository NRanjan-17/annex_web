import Image from "next/image";
import { RELEASES, REPO } from "./links";

const LINKS = [
  { href: REPO, label: "GitHub" },
  { href: RELEASES, label: "Releases" },
  { href: `${REPO}/blob/main/docs/SECURITY.md`, label: "Security" },
  { href: `${REPO}/issues`, label: "Report a bug" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 text-sm text-faint md:flex-row md:items-center">
        <span className="flex items-center gap-2.5 font-semibold text-fg">
          <Image src="/assets/icon.png" alt="" width={22} height={22} />
          Annex
        </span>
        <p>Open source under the MIT licence.</p>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 md:ml-auto">
          {LINKS.map((l) => (
            <a key={l.label} href={l.href} className="transition-colors duration-150 hover:text-fg">
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
