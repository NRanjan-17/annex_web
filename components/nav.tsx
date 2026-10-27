import Image from "next/image";
import { GitHubIcon } from "./icons";
import { REPO } from "./links";

const SECTIONS = [
  { href: "/#features", label: "Features" },
  { href: "/#how", label: "How it works" },
  { href: "/#privacy", label: "Privacy" },
  { href: "/docs", label: "Docs" },
];

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/[0.06] bg-black/70 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-8 px-5">
        <a href="/" className="flex items-center gap-2.5 font-semibold tracking-tight">
          <Image src="/assets/icon.png" alt="" width={26} height={26} />
          Annex
        </a>
        <nav aria-label="Sections" className="hidden gap-7 text-sm text-dim md:flex">
          {SECTIONS.map((s) => (
            <a key={s.href} href={s.href} className="transition-colors duration-150 hover:text-fg">
              {s.label}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <a
            href={REPO}
            aria-label="Annex on GitHub"
            className="grid size-10 place-items-center rounded-full text-dim transition-colors duration-150 hover:bg-white/[0.07] hover:text-fg"
          >
            <GitHubIcon className="size-[18px]" />
          </a>
          <a href="/#download" className="btn btn-primary btn-small">
            Download
          </a>
        </div>
      </div>
    </header>
  );
}
