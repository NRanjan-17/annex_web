"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";

/**
 * Rebuilt from "Shortcut Gallery" by Group 256 (x.com/isaacfayemi_,
 * https://x.com/isaacfayemi_/status/2105364159705604137), via lookap 1uhs3o, with Annex's shortcuts.
 *
 * A dark window: a whole Mac keyboard in faint outlines with the keys Annex uses left bright, a
 * title that names one shortcut at a time with its keys pressed under it, and a bar that flips to
 * a list of every shortcut, a column per group. It plays on its own; click a group or press 0–4 to
 * take over, and your own key presses light the keyboard.
 *
 * Every size is in --u, one pixel of the 1268 × 790 source window, so the whole thing scales as
 * one. Phones get a narrower 560-wide window with bigger type, the keyboard shrunk to fit.
 * The glow is white rather than the original lavender: this site keeps colour for "live".
 */

const u = (n: number) => `calc(${n} * var(--u))`;
const EASE = "cubic-bezier(0.2, 0.8, 0.2, 1)";

/** Where everything sits, in source pixels. */
const DESKTOP = {
  W: 1268, H: 790, titleTop: 190, titleH: 40, title: 34, capsTop: 241, cap: 28, capText: 10.5, kbTop: 302, kbScale: 1,
  barKeys: 754, barList: 17, toggleTop: 754, listTop: 300, colW: 416, colStep: 436, rowH: 47, rowText: 12, listCap: 27,
  barText: 11, badge: 13, compactTabs: false,
};
const PHONE: typeof DESKTOP = {
  W: 560, H: 540, titleTop: 70, titleH: 84, title: 34, capsTop: 168, cap: 38, capText: 15, kbTop: 236, kbScale: 0.56,
  barKeys: 440, barList: 70, toggleTop: 492, listTop: 176, colW: 500, colStep: 540, rowH: 64, rowText: 20, listCap: 36,
  barText: 19, badge: 22, compactTabs: true,
};
type Layout = typeof DESKTOP;

// ---- The keyboard -------------------------------------------------------------------------------

/** `c`: one centred character; `n`: a number key (shifted symbol over it); `w`: a word in a corner;
 *  `m`: a modifier (symbol over its name); `arrows`: the inverted-T cluster. */
type Key =
  | { id: string; k: "c"; a: string; w?: number }
  | { id: string; k: "n"; a: string; b: string; w?: number }
  | { id: string; k: "w"; a: string; side: "l" | "r"; w: number }
  | { id: string; k: "m"; a: string; b: string; w?: number }
  | { id: "arrows"; k: "arrows"; w: number };

const chars = (s: string): Key[] => s.split("").map((c) => ({ id: c.toLowerCase(), k: "c", a: c }));
const ROWS: Key[][] = [
  [
    { id: "esc", k: "w", a: "esc", side: "l", w: 1 },
    ...[..."1234567890"].map((d, i): Key => ({ id: d, k: "n", a: d, b: "!@#$%^&*()"[i] })),
    { id: "minus", k: "n", a: "-", b: "_" },
    { id: "equal", k: "n", a: "=", b: "+" },
    { id: "delete", k: "w", a: "delete", side: "r", w: 1.5 },
  ],
  [
    { id: "tab", k: "w", a: "tab", side: "l", w: 1.5 },
    ...chars("QWERTYUIOP"),
    { id: "lbr", k: "n", a: "[", b: "{" },
    { id: "rbr", k: "n", a: "]", b: "}" },
    { id: "bslash", k: "n", a: "\\", b: "|" },
  ],
  [
    { id: "caps", k: "w", a: "caps lock", side: "l", w: 1.75 },
    ...chars("ASDFGHJKL"),
    { id: "semi", k: "n", a: ";", b: ":" },
    { id: "quote", k: "n", a: "'", b: '"' },
    { id: "return", k: "w", a: "return", side: "r", w: 1.75 },
  ],
  [
    { id: "shift", k: "w", a: "shift", side: "l", w: 2.25 },
    ...chars("ZXCVBNM"),
    { id: "comma", k: "n", a: ",", b: "<" },
    { id: "period", k: "n", a: ".", b: ">" },
    { id: "slash", k: "n", a: "/", b: "?" },
    { id: "shift-r", k: "w", a: "shift", side: "r", w: 2.25 },
  ],
  [
    { id: "fn", k: "m", a: "◍", b: "fn" },
    { id: "ctrl", k: "m", a: "⌃", b: "control" },
    { id: "opt", k: "m", a: "⌥", b: "option" },
    { id: "cmd", k: "m", a: "⌘", b: "command", w: 1.25 },
    { id: "space", k: "c", a: "", w: 5 },
    { id: "cmd-r", k: "m", a: "⌘", b: "command", w: 1.25 },
    { id: "opt-r", k: "m", a: "⌥", b: "option" },
    { id: "arrows", k: "arrows", w: 3 },
  ],
];

// Measured: the keyboard is 990 wide at the bottom and 900 at the number row, 275 tall. A 900-wide
// board tipped back 20° under a 977 perspective lands on those numbers.
const BOARD = 900;
const GAP = 8;
const KEY_H = 48;
const PITCH = (BOARD + GAP) / 14.5;

// ---- Annex's shortcuts ---------------------------------------------------------------------------

/** `keys` are keyboard ids; `caps` overrides what the keycaps say; `sep` joins alternatives. */
type Shortcut = { title: string; keys: string[]; caps?: string[]; sep?: "/" };
const TABS: { name: string; items: Shortcut[] }[] = [
  {
    name: "Sessions",
    items: [
      { title: "Leave control of the other computer", keys: ["ctrl", "opt", "shift", "q"] },
      { title: "Leave a view-only session", keys: ["esc"] },
    ],
  },
  {
    name: "App",
    items: [
      { title: "Open Settings", keys: ["cmd", "comma"] },
      { title: "Quit Annex", keys: ["cmd", "q"] },
    ],
  },
  {
    name: "Nearby",
    items: [
      { title: "Connect to the selected computer", keys: ["return"] },
      { title: "Move between computers", keys: ["up", "down"], sep: "/" },
    ],
  },
  {
    name: "Windows and Linux",
    items: [
      { title: "Leave control of the other computer", keys: ["ctrl", "opt", "shift", "q"], caps: ["Ctrl", "Alt", "Shift", "Q"] },
      { title: "Full screen, on Linux", keys: ["ctrl", "opt", "shift", "f"], caps: ["Ctrl", "Alt", "Shift", "F"] },
      { title: "Leave a view-only session", keys: ["esc"], caps: ["Esc"] },
    ],
  },
];
const ALL = TABS.flatMap((t) => t.items);
const USED = new Set(ALL.flatMap((s) => s.keys));
const CAP: Record<string, string> = { ctrl: "⌃", opt: "⌥", shift: "⇧", cmd: "⌘", comma: ",", esc: "esc", return: "return", up: "▲", down: "▼" };
const capOf = (s: Shortcut, i: number) => s.caps?.[i] ?? CAP[s.keys[i]] ?? s.keys[i].toUpperCase();
const REST = "Breeze through Annex";

// What a real key press maps to here (event.code → key id).
const CODE: Record<string, string> = {
  Escape: "esc", ControlLeft: "ctrl", ControlRight: "ctrl", AltLeft: "opt", AltRight: "opt-r", ShiftLeft: "shift", ShiftRight: "shift-r",
  MetaLeft: "cmd", MetaRight: "cmd-r", Comma: "comma", Period: "period", Slash: "slash", Enter: "return", Space: "space",
  ArrowUp: "up", ArrowDown: "down", ArrowLeft: "left", ArrowRight: "right", Tab: "tab", Backspace: "delete", CapsLock: "caps",
  Minus: "minus", Equal: "equal", BracketLeft: "lbr", BracketRight: "rbr", Backslash: "bslash", Semicolon: "semi", Quote: "quote",
};
const idFor = (code: string) => CODE[code] ?? (code.startsWith("Key") ? code.slice(3).toLowerCase() : code.startsWith("Digit") ? code.slice(5) : undefined);

// ---- The script ----------------------------------------------------------------------------------

/** One beat of the autoplay: which view, which group, which shortcut (null: the resting title). */
type Beat = { at: number; view: "keys" | "list"; tab: number; show: [number, number] | null };
const SCRIPT: Beat[] = [
  { at: 4, view: "keys", tab: 0, show: [0, 0] },
  { at: 7, view: "keys", tab: 0, show: null },
  { at: 8, view: "keys", tab: 1, show: [1, 0] },
  { at: 10.5, view: "keys", tab: 2, show: [2, 1] },
  { at: 13, view: "keys", tab: 2, show: null },
  { at: 14, view: "list", tab: 0, show: null },
  { at: 15.8, view: "list", tab: 1, show: null },
  { at: 17, view: "list", tab: 2, show: null },
  { at: 18.2, view: "list", tab: 3, show: null },
  { at: 19.6, view: "keys", tab: 0, show: null },
  { at: 24, view: "keys", tab: 0, show: null },
];

/** Intro stages: 1 outlines fade in, 2 the title resolves, 3 labels appear, 4 unused keys dim. */
const STAGES: [number, number][] = [[0, 1], [0.6, 2], [1.5, 3], [3, 4]];

export function KeyboardGallery() {
  const reduce = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const inView = useInView(root, { amount: 0.4 });
  const [L, setL] = useState<Layout>(DESKTOP);
  const [stage, setStage] = useState(0);
  const [view, setView] = useState<"keys" | "list">("keys");
  const [tab, setTab] = useState(0);
  const [show, setShow] = useState<Shortcut | null>(null);
  const [lit, setLit] = useState<string[]>([]); // the shown shortcut's keys still held down
  const [held, setHeld] = useState<Set<string>>(new Set());
  const [auto, setAuto] = useState(true);
  const started = useRef(false);

  // Narrow columns (phones) get the phone layout.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setL(e.contentRect.width < 640 ? PHONE : DESKTOP));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // The intro, once, the first time it comes into view.
  useEffect(() => {
    if (reduce) return setStage(4);
    if (!inView || started.current) return;
    started.current = true;
    const ts = STAGES.map(([at, s]) => setTimeout(() => setStage(s), at * 1000));
    return () => ts.forEach(clearTimeout);
  }, [inView, reduce]);

  // The autoplay: walk the script while it's on screen, then loop.
  useEffect(() => {
    if (reduce || !auto || !inView || stage < 4) return;
    let i = 0;
    let t: ReturnType<typeof setTimeout>;
    const run = () => {
      const b = SCRIPT[i];
      setView(b.view);
      setTab(b.tab);
      setShow(b.show ? TABS[b.show[0]].items[b.show[1]] : null);
      const wait = i + 1 < SCRIPT.length ? SCRIPT[i + 1].at - b.at : 0.01;
      i = (i + 1) % SCRIPT.length;
      t = setTimeout(run, wait * 1000);
    };
    t = setTimeout(run, 1000);
    return () => clearTimeout(t);
  }, [auto, inView, reduce, stage]);

  // A shown shortcut's keys press together, then let go one by one.
  useEffect(() => {
    if (!show || reduce) return setLit([]);
    setLit(show.keys);
    const ts = show.keys.map((_, i) => setTimeout(() => setLit(show.keys.slice(i + 1)), 900 + i * 280));
    return () => ts.forEach(clearTimeout);
  }, [show, reduce]);

  const takeOver = () => {
    setAuto(false);
    setStage(4);
    setShow(null);
  };

  // Your own keys light the keyboard; while it's in view, 0 flips the view and 1–4 pick a group.
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const id = idFor(e.code);
      if (id) setHeld((h) => new Set(h).add(id));
      const target = e.target as HTMLElement | null;
      if (!inView || e.metaKey || e.ctrlKey || e.altKey || target?.closest("input, textarea, [contenteditable]")) return;
      const n = /^Digit(\d)$/.exec(e.code)?.[1];
      if (n === "0") {
        takeOver();
        setView((v) => (v === "keys" ? "list" : "keys"));
      } else if (n && +n >= 1 && +n <= TABS.length) {
        takeOver();
        setTab(+n - 1);
        setView("list");
      }
    };
    const up = (e: KeyboardEvent) => {
      const id = idFor(e.code);
      if (id) setHeld((h) => {
        const next = new Set(h);
        next.delete(id);
        return next;
      });
    };
    const clear = () => setHeld(new Set());
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", clear);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("blur", clear);
    };
  }, [inView]);

  // Pressing a whole shortcut yourself names it.
  const yours = ALL.find((s) => s.keys.length > 1 && s.keys.every((k) => held.has(k)));
  const shown = yours ?? show;
  const pressed = new Set([...held, ...lit]);
  const list = view === "list";

  return (
    <div ref={root} className="@container w-full">
      <div
        style={{ ["--u" as string]: `calc(100cqw / ${L.W})`, height: u(L.H), borderRadius: u(6) }}
        className="relative w-full select-none overflow-hidden bg-[#060608] shadow-[inset_0_0_0_1px_rgb(255_255_255/0.08),0_30px_80px_-20px_rgb(0_0_0/0.9)]"
      >
        {/* The charcoal sheen across the top, keyboard view only. */}
        <div
          aria-hidden="true"
          style={{ height: u(265), transition: "opacity 600ms", background: "linear-gradient(#3a3b3f, #1d1f22 30%, #0f0f12 55%, #060608)" }}
          className={`pointer-events-none absolute inset-x-0 top-0 ${list ? "opacity-0" : "opacity-100"}`}
        />

        {/* The keyboard view. */}
        <div
          aria-hidden={list}
          style={{ transition: `opacity 450ms ${EASE}, transform 600ms ${EASE}`, transform: list ? `translateY(${u(-40)})` : "none" }}
          className={`absolute inset-0 ${list ? "pointer-events-none opacity-0" : "opacity-100"}`}
        >
          <Title text={shown?.title ?? REST} stage={stage} raised={!!shown} L={L} />
          <div className="absolute inset-x-0 flex items-center justify-center" style={{ top: u(L.capsTop), height: u(L.cap), gap: u(4) }}>
            <AnimatePresence mode="popLayout">
              {shown &&
                shown.keys.map((k, i) => (
                  <motion.span
                    key={`${shown.title}${shown.caps ? "w" : ""}${i}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1], delay: i * 0.04 }}
                    className="flex items-center"
                    style={{ gap: u(4) }}
                  >
                    {i > 0 && shown.sep && <span style={{ fontSize: u(L.capText) }} className="text-white/40">{shown.sep}</span>}
                    <Cap label={capOf(shown, i)} glow={pressed.has(k)} size={L.cap} text={L.capText} />
                  </motion.span>
                ))}
            </AnimatePresence>
          </div>
          <Keyboard stage={stage} pressed={pressed} top={L.kbTop} scale={L.kbScale} />
        </div>

        {/* The list view: a column per group, the chosen one in the middle. */}
        <div className={`absolute inset-0 ${list ? "" : "pointer-events-none"}`} aria-hidden={!list}>
          {TABS.map((t, c) => (
            <div
              key={t.name}
              style={{
                left: `calc(50% - ${u(L.colW / 2)})`,
                top: u(L.listTop),
                width: u(L.colW),
                transform: `translateX(${u((c - tab) * L.colStep)})`,
                transition: `transform 400ms ${EASE}, color 400ms`,
              }}
              className={`absolute ${c === tab ? "text-white/80" : "text-white/20"}`}
            >
              {t.items.map((s, r) => {
                const delay = list ? 120 + r * 40 : 0;
                return (
                  <div
                    key={s.title + r}
                    style={{
                      height: u(L.rowH),
                      gap: u(12),
                      transform: list ? "none" : `translateY(${u(40 + r * 8)})`,
                      opacity: list ? 1 : 0,
                      transition: `transform 600ms ${EASE} ${delay}ms, opacity 400ms ${delay}ms`,
                    }}
                    className="flex items-center justify-between"
                  >
                    <span style={{ fontSize: u(L.rowText) }} className="truncate">{s.title}</span>
                    <span className="flex shrink-0 items-center" style={{ gap: u(4) }}>
                      {s.keys.map((_, i) => (
                        <span key={i} className="flex items-center" style={{ gap: u(4) }}>
                          {i > 0 && s.sep && <span style={{ fontSize: u(L.capText) }} className="opacity-50">{s.sep}</span>}
                          <Cap label={capOf(s, i)} size={L.listCap} text={L.capText * 0.92} dim={c !== tab} />
                        </span>
                      ))}
                    </span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* The bar: Toggle view stays bottom-left; the groups travel from the bottom to the header. */}
        <button
          type="button"
          onClick={() => {
            takeOver();
            setView(list ? "keys" : "list");
          }}
          style={{ left: u(19), top: u(L.toggleTop), height: u(L.badge + 3), gap: u(7), fontSize: u(L.barText) }}
          className="absolute flex items-center text-white"
        >
          <Badge n={0} on size={L.badge} />
          Toggle view
          <span className="text-white/60">{list ? "↑" : "↓"}</span>
        </button>
        <nav
          aria-label="Shortcut groups"
          style={{ top: u(list ? L.barList : L.barKeys), height: u(L.badge + 3), gap: u(L.compactTabs ? 14 : 26), transition: `top 600ms ${EASE}` }}
          className="absolute inset-x-0 flex items-center justify-center"
        >
          {TABS.map((t, i) => (
            <button
              key={t.name}
              type="button"
              aria-pressed={list && i === tab}
              aria-label={L.compactTabs && i !== tab ? t.name : undefined}
              onClick={() => {
                takeOver();
                setTab(i);
                setView("list");
              }}
              style={{ gap: u(7), fontSize: u(L.barText) }}
              className={`flex items-center transition-colors duration-200 ${i === tab ? "text-white" : "text-[#8a8a8a] hover:text-white/80"}`}
            >
              <Badge n={i + 1} on={i === tab} size={L.badge} />
              {/* On phones only the chosen group keeps its name. */}
              {(!L.compactTabs || i === tab) && t.name}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}

/** The headline: resolves out of a blur letter by letter the first time, then crossfades in place. */
function Title({ text, stage, raised, L }: { text: string; stage: number; raised: boolean; L: Layout }) {
  const first = useRef(true);
  const intro = first.current && text === REST;
  useEffect(() => {
    if (stage >= 3) first.current = false;
  }, [stage]);
  return (
    <div
      className="absolute inset-x-0 flex items-center justify-center"
      style={{ top: u(L.titleTop - (raised ? 4 : 0)), height: u(L.titleH), padding: `0 ${u(30)}`, transition: `top 400ms ${EASE}` }}
    >
      {stage >= 2 && (
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={text}
            initial={{ opacity: 0, filter: "blur(6px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(6px)" }}
            transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
            style={{ fontSize: u(L.title) }}
            className="text-balance text-center font-medium leading-[1.15] tracking-[-0.025em] text-white"
          >
            {intro
              ? [...text].map((ch, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.35, delay: i * 0.03, ease: "easeOut" }}
                    className="inline-block whitespace-pre"
                  >
                    {ch}
                  </motion.span>
                ))
              : text}
          </motion.p>
        </AnimatePresence>
      )}
    </div>
  );
}

/** A keycap under the title or in the list; `glow` is pressed. */
function Cap({ label, glow, dim, size, text }: { label: string; glow?: boolean; dim?: boolean; size: number; text: number }) {
  const wide = label.length > 1;
  return (
    <span
      style={{
        minWidth: u(size),
        height: u(size),
        padding: `0 ${u(wide ? size / 4 : 0)}`,
        borderRadius: u(size / 5.5),
        fontSize: u(wide ? text * 0.9 : text),
        boxShadow: glow
          ? `inset 0 0 0 ${u(1)} rgb(255 255 255 / 0.85), 0 0 ${u(6)} ${u(1)} rgb(255 255 255 / 0.35)`
          : `inset 0 0 0 ${u(1)} rgb(255 255 255 / ${dim ? 0.05 : 0.12})`,
        transition: "box-shadow 200ms",
      }}
      className={`grid place-items-center ${dim ? "bg-white/[0.02]" : "bg-[#151517] text-white"}`}
    >
      {label}
    </span>
  );
}

function Badge({ n, on, size }: { n: number; on: boolean; size: number }) {
  return (
    <span
      style={{ width: u(size), height: u(size), borderRadius: u(size / 4.3), fontSize: u(size * 0.58) }}
      className={`grid shrink-0 place-items-center transition-colors duration-200 ${on ? "bg-white/25 text-white" : "bg-white/[0.08] text-white/50"}`}
    >
      {n}
    </span>
  );
}

/** The keyboard, tipped back so the bottom row is wider than the number row. */
function Keyboard({ stage, pressed, top, scale }: { stage: number; pressed: Set<string>; top: number; scale: number }) {
  return (
    <div
      aria-hidden="true"
      className="absolute left-1/2"
      style={{
        top: u(top),
        width: u(BOARD),
        transform: `translateX(-50%) scale(${scale}) perspective(${u(977)}) rotateX(20deg)`,
        transformOrigin: "50% 0",
        opacity: stage >= 1 ? 1 : 0,
        transition: "opacity 500ms ease-out",
      }}
    >
      {ROWS.map((row, r) => (
        <div key={r} className="flex" style={{ gap: u(GAP), marginTop: r ? u(GAP) : 0 }}>
          {row.map((k) => (
            <KeyCap key={k.id} k={k} stage={stage} pressed={pressed} />
          ))}
        </div>
      ))}
    </div>
  );
}

function KeyCap({ k, stage, pressed }: { k: Key; stage: number; pressed: Set<string> }) {
  const width = u((k.w ?? 1) * PITCH - GAP);
  if (k.k === "arrows") {
    const half = (KEY_H - 4) / 2;
    const one = (id: string, label: string) => (
      <Face id={id} stage={stage} pressed={pressed} style={{ flex: 1, height: u(half) }}>
        <span style={{ fontSize: u(7) }}>{label}</span>
      </Face>
    );
    return (
      <div className="flex items-end" style={{ width, height: u(KEY_H), gap: u(4) }}>
        {one("left", "◀")}
        <div className="flex flex-1 flex-col" style={{ gap: u(4) }}>
          {one("up", "▲")}
          {one("down", "▼")}
        </div>
        {one("right", "▶")}
      </div>
    );
  }
  return (
    <Face id={k.id} stage={stage} pressed={pressed} style={{ width, height: u(KEY_H) }}>
      {k.k === "c" && <span style={{ fontSize: u(14) }}>{k.a}</span>}
      {k.k === "n" && (
        <span className="flex flex-col items-center leading-none" style={{ gap: u(4) }}>
          <span style={{ fontSize: u(10) }}>{k.b}</span>
          <span style={{ fontSize: u(13) }}>{k.a}</span>
        </span>
      )}
      {k.k === "w" && (
        <span className={`absolute ${k.side === "l" ? "left-0" : "right-0"}`} style={{ bottom: u(8), margin: `0 ${u(9)}`, fontSize: u(10.5) }}>
          {k.a}
        </span>
      )}
      {k.k === "m" && (
        <span className="flex flex-col items-center leading-none" style={{ gap: u(6) }}>
          <span style={{ fontSize: u(12) }}>{k.a}</span>
          <span style={{ fontSize: u(10) }}>{k.b}</span>
        </span>
      )}
    </Face>
  );
}

/** One key's face: outlines first, then labels, then everything but Annex's keys dims. */
function Face({ id, stage, pressed, style, children }: { id: string; stage: number; pressed: Set<string>; style: React.CSSProperties; children: React.ReactNode }) {
  const on = pressed.has(id);
  const used = USED.has(id);
  const line = on ? 0.85 : stage < 3 ? 0.13 : stage < 4 ? 0.07 : used ? 0.16 : 0.05;
  const ink = on ? 1 : stage < 3 ? 0 : stage < 4 || used ? 0.88 : 0.28;
  return (
    <div
      style={{
        ...style,
        borderRadius: u(6),
        color: `rgb(255 255 255 / ${ink})`,
        boxShadow: `inset 0 0 0 ${u(1)} rgb(255 255 255 / ${line})${on ? `, 0 0 ${u(10)} ${u(1)} rgb(255 255 255 / 0.25)` : ""}`,
        background: on ? "rgb(255 255 255 / 0.1)" : "transparent",
        transition: on ? "all 120ms" : "color 500ms, box-shadow 500ms, background-color 300ms",
      }}
      className="relative grid place-items-center"
    >
      {children}
    </div>
  );
}
