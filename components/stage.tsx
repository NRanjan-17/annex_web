"use client";

import { useEffect, useState, type ComponentType } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ExtendIcon, GlobeIcon, MirrorIcon, PointerIcon } from "./icons";

type Mode = "extend" | "mirror" | "control" | "internet";

const MODES: { id: Mode; tab: string; title: string; body: string; caption: string; link: string; Icon: ComponentType<{ className?: string }> }[] = [
  {
    id: "extend",
    tab: "Extend",
    title: "Extend.",
    body: "Any computer becomes a second display. Arrange it, scale it and pick its refresh rate, like a real monitor.",
    caption: "The PC becomes a second monitor for the Mac. Drag windows onto it.",
    link: "Wi-Fi · 8 ms",
    Icon: ExtendIcon,
  },
  {
    id: "mirror",
    tab: "Mirror",
    title: "Mirror.",
    body: "See and use another computer's screen in a window or full screen, with its sound too.",
    caption: "The Mac's screen, on the PC. Full screen or in a window.",
    link: "Cable · 4 ms",
    Icon: MirrorIcon,
  },
  {
    id: "control",
    tab: "Control",
    title: "Control.",
    body: "One mouse and keyboard for both. The pointer crosses screens, and copy and paste works between them.",
    caption: "One pointer for both computers. It crosses from screen to screen.",
    link: "Direct Wi-Fi · 6 ms",
    Icon: PointerIcon,
  },
  {
    id: "internet",
    tab: "Anywhere",
    title: "Anywhere.",
    body: "Across the room or across the world: a 6-character code connects two computers on different networks.",
    caption: "Type the code on the other computer. The screen goes straight between the two.",
    link: "Internet · 34 ms",
    Icon: GlobeIcon,
  },
];

const ADVANCE_MS = 6000;
const ease = [0.2, 0, 0, 1] as const;

/** The product panel: tabs over a live scene, and four points under it; the active one lights up
 *  and fills a ring until the next mode. */
export function Stage() {
  const [active, setActive] = useState<Mode>("extend");
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const mode = MODES.find((m) => m.id === active)!;

  useEffect(() => {
    if (paused || reduce) return;
    const t = setTimeout(() => {
      const i = MODES.findIndex((m) => m.id === active);
      setActive(MODES[(i + 1) % MODES.length].id);
    }, ADVANCE_MS);
    return () => clearTimeout(t);
  }, [active, paused, reduce]);

  return (
    <section id="features" aria-label="What Annex does" className="mx-auto max-w-6xl px-5 py-10">
      <div
        className="group-surface overflow-hidden p-3 md:p-4"
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        <div role="tablist" aria-label="Modes" className="flex justify-center gap-1 pb-3 pt-1">
          {MODES.map((m) => (
            <button
              key={m.id}
              role="tab"
              id={`tab-${m.id}`}
              aria-selected={m.id === active}
              aria-controls="stage-panel"
              onClick={() => setActive(m.id)}
              className={`relative h-10 rounded-full px-4 text-sm transition-colors duration-150 ${m.id === active ? "text-fg" : "text-faint hover:text-dim"}`}
            >
              {m.id === active && (
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 rounded-full bg-white/[0.08]"
                  transition={{ type: "spring", duration: 0.35, bounce: 0 }}
                />
              )}
              <span className="relative">{m.tab}</span>
            </button>
          ))}
        </div>

        <div id="stage-panel" role="tabpanel" aria-labelledby={`tab-${active}`} className="rounded-[14px] bg-black/60 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.06)]">
          <Scene mode={active} link={mode.link} />
          <div className="h-14 px-6 pb-6 text-center text-sm text-dim">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={active}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2, ease }}
              >
                {mode.caption}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        <div className="grid gap-2 pt-3 sm:grid-cols-2 lg:grid-cols-4">
          {MODES.map((m) => {
            const on = m.id === active;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setActive(m.id)}
                className={`relative rounded-[14px] p-4 text-left transition-colors duration-200 ${on ? "bg-white/[0.05]" : "hover:bg-white/[0.03]"}`}
              >
                <m.Icon className={`size-5 transition-colors duration-200 ${on ? "text-fg" : "text-faint"}`} />
                <p className={`mt-3 text-[15px] leading-6 transition-colors duration-200 ${on ? "text-fg/90" : "text-faint"}`}>
                  <strong className={`font-semibold ${on ? "text-fg" : "text-dim"}`}>{m.title}</strong> {m.body}
                </p>
                {on && !paused && !reduce && <ProgressRing key={active} />}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** Fills once over ADVANCE_MS: how long until the next mode. */
function ProgressRing() {
  return (
    <svg viewBox="0 0 16 16" className="absolute right-4 top-4 size-4 -rotate-90" aria-hidden="true">
      <circle cx="8" cy="8" r="6" fill="none" stroke="rgb(255 255 255 / 0.12)" strokeWidth="1.5" />
      <motion.circle
        cx="8"
        cy="8"
        r="6"
        fill="none"
        stroke="#fff"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: ADVANCE_MS / 1000, ease: "linear" }}
      />
    </svg>
  );
}

/** Two computers and the link between them; what's on each screen follows the mode. */
function Scene({ mode, link }: { mode: Mode; link: string }) {
  const mirrored = mode === "mirror";
  const pointer =
    mode === "extend" ? "animate-[cross_5s_cubic-bezier(0.4,0,0.2,1)_infinite]" : mode === "control" ? "animate-[drift_5s_cubic-bezier(0.4,0,0.2,1)_infinite]" : "opacity-0";

  return (
    <div className="relative grid grid-cols-[1fr_auto_1fr] items-end gap-3 px-5 pb-6 pt-12 md:gap-8 md:px-16 md:pt-16" aria-hidden="true">
      {/* This Mac */}
      <div className="flex flex-col items-center">
        <Screen className="aspect-[16/10] w-full max-w-[340px] rounded-t-[12px]">
          <Desktop variant="mac" />
        </Screen>
        <div className="h-2.5 w-[108%] max-w-[370px] rounded-b-[10px] bg-linear-to-b from-[#3a3a3e] to-[#1c1c1f]" />
        <Label>This Mac</Label>
      </div>

      {/* The link */}
      <div className="mb-16 flex w-16 flex-col items-center gap-2 md:w-28">
        <div className="relative h-px w-full overflow-hidden bg-white/10">
          <span className="absolute inset-y-0 w-1/2 animate-[flow_1.6s_linear_infinite] bg-linear-to-r from-transparent via-white/70 to-transparent" />
        </div>
        <span className="whitespace-nowrap font-mono text-[11px] tabular-nums text-faint">{link}</span>
      </div>

      {/* The PC */}
      <div className="flex flex-col items-center">
        <Screen className="aspect-[16/10] w-full max-w-[360px] rounded-[10px]">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={mode}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease }}
            >
              {mirrored ? <Desktop variant="mac" /> : mode === "internet" ? <CodeCard /> : <Desktop variant="extra" />}
            </motion.div>
          </AnimatePresence>
        </Screen>
        <div className="h-7 w-2 bg-linear-to-b from-[#2a2a2e] to-[#141416]" />
        <div className="h-1.5 w-24 rounded-full bg-[#1d1d20]" />
        <Label>{mode === "extend" ? "PC · Annex Display" : mode === "internet" ? "A PC, anywhere" : "Windows PC"}</Label>
      </div>

      <svg viewBox="0 0 24 24" className={`absolute left-[26%] top-[42%] size-5 transition-opacity duration-200 ${pointer}`}>
        <path d="M5 3l14 7.5-6.2 1.6L10 18.5z" fill="#fff" stroke="#000" strokeWidth="1.2" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function Screen({ className, children }: { className: string; children: React.ReactNode }) {
  return (
    <div className={`relative overflow-hidden bg-[#0d0d0f] p-[6px] shadow-[inset_0_0_0_1px_rgb(255_255_255/0.1),0_30px_60px_-30px_rgb(0_0_0)] ${className}`}>
      <div className="relative h-full w-full overflow-hidden rounded-[6px] bg-[radial-gradient(120%_90%_at_30%_10%,#2b2b31,#0e0e10_70%)]">{children}</div>
    </div>
  );
}

function Desktop({ variant }: { variant: "mac" | "extra" }) {
  return (
    <>
      <div className="absolute inset-x-0 top-0 h-[7%] bg-white/[0.06]" />
      {variant === "mac" ? (
        <>
          <Win className="left-[8%] top-[18%] h-[52%] w-[52%]" />
          <Win className="left-[42%] top-[34%] h-[50%] w-[48%]" />
        </>
      ) : (
        <Win className="left-[14%] top-[20%] h-[62%] w-[66%]" />
      )}
    </>
  );
}

function Win({ className }: { className: string }) {
  return (
    <div className={`absolute rounded-[5px] bg-white/[0.07] shadow-[inset_0_0_0_1px_rgb(255_255_255/0.08)] ${className}`}>
      <div className="flex gap-1 p-1.5">
        {[0, 1, 2].map((i) => (
          <span key={i} className="size-1.5 rounded-full bg-white/25" />
        ))}
      </div>
    </div>
  );
}

function CodeCard() {
  return (
    <div className="grid h-full place-items-center">
      <div className="rounded-[10px] bg-white/[0.06] px-5 py-3 text-center shadow-[inset_0_0_0_1px_rgb(255_255_255/0.1)]">
        <p className="eyebrow">Code</p>
        <p className="mt-1 font-mono text-lg font-medium tracking-[0.2em] text-fg">K7P2QX</p>
      </div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <span className="mt-3 text-xs text-faint">{children}</span>;
}
