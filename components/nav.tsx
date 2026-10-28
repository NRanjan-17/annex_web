"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { GitHubIcon } from "./icons";
import { REPO } from "./links";

const SECTIONS = [
  { href: "/#features", label: "Features" },
  { href: "/#how", label: "How it works" },
  { href: "/#privacy", label: "Privacy" },
  { href: "/docs", label: "Docs" },
];

/** After the Parallax and Vercel navs (lookap 1u0ife, ti5i8b): see-through over the hero, then a
 *  blurred black bar with a hairline; links in the middle; GitHub and Download on the right; a menu
 *  on phones. */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        solid ? "border-b border-white/[0.07] bg-black/75 backdrop-blur-xl backdrop-saturate-150" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto grid h-16 max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-5">
        <a href="/" className="flex items-center gap-2.5 justify-self-start font-semibold tracking-tight">
          <Image src="/assets/icon.png" alt="" width={26} height={26} />
          Annex
        </a>

        <nav aria-label="Sections" className="hidden items-center gap-1 md:flex">
          {SECTIONS.map((s) => (
            <a
              key={s.href}
              href={s.href}
              className="rounded-full px-3.5 py-1.5 text-[13.5px] text-dim transition-colors duration-150 hover:bg-white/[0.06] hover:text-fg"
            >
              {s.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 justify-self-end">
          <a
            href={REPO}
            className="hidden h-9 items-center gap-2 rounded-full px-3.5 text-[13px] text-dim shadow-[inset_0_0_0_1px_rgb(255_255_255/0.14)] transition-colors duration-150 hover:bg-white/[0.06] hover:text-fg sm:flex"
          >
            <GitHubIcon className="size-4" />
            GitHub
          </a>
          <a href="/#download" className="btn btn-primary btn-small">
            Download
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
            className="grid size-10 place-items-center rounded-full text-fg md:hidden"
          >
            <span className="relative block h-3 w-4" aria-hidden="true">
              <span className={`absolute left-0 h-px w-4 bg-current transition-[top,rotate] duration-200 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-px w-4 bg-current transition-[top,rotate] duration-200 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Menu" className="border-t border-white/[0.06] px-5 pb-6 pt-2 md:hidden">
          {[...SECTIONS, { href: REPO, label: "GitHub" }].map((s) => (
            <a
              key={s.href}
              href={s.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between border-b border-white/[0.06] py-3.5 text-[17px]"
            >
              {s.label}
              <span aria-hidden="true" className="font-mono text-xs text-faint">→</span>
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
