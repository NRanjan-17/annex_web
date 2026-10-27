"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

/**
 * After the Linear shortcut gallery (lookap 1uhs3o): a whole Mac keyboard in faint outlines, the
 * keys Annex uses a little brighter. A title cycles through the shortcuts; each one's keys press
 * down and its combination shows under the title. Pressing the keys on your own keyboard lights
 * them too, so it doubles as practice.
 */

type K = { id: string; label: string; sub?: string; w?: number };

// Rows of a Mac keyboard; `w` is the width in key units.
const ROWS: K[][] = [
  [{ id: "esc", label: "esc", w: 1.5 }, ...Array.from({ length: 12 }, (_, i) => ({ id: `f${i + 1}`, label: `F${i + 1}` })), { id: "power", label: "", w: 1.5 }],
  [{ id: "grave", label: "`" }, ..."1234567890".split("").map((c) => ({ id: c, label: c })), { id: "minus", label: "-" }, { id: "equal", label: "=" }, { id: "delete", label: "delete", w: 1.5 }],
  [{ id: "tab", label: "tab", w: 1.5 }, ..."QWERTYUIOP".split("").map((c) => ({ id: c.toLowerCase(), label: c })), { id: "lbr", label: "[" }, { id: "rbr", label: "]" }, { id: "bslash", label: "\\" }],
  [{ id: "caps", label: "caps lock", w: 1.75 }, ..."ASDFGHJKL".split("").map((c) => ({ id: c.toLowerCase(), label: c })), { id: "semi", label: ";" }, { id: "quote", label: "'" }, { id: "return", label: "return", w: 1.75 }],
  [{ id: "shift", label: "shift", w: 2.25 }, ..."ZXCVBNM".split("").map((c) => ({ id: c.toLowerCase(), label: c })), { id: "comma", label: "," }, { id: "period", label: "." }, { id: "slash", label: "/" }, { id: "shift-r", label: "shift", w: 2.25 }],
  [
    { id: "fn", label: "fn" },
    { id: "ctrl", label: "⌃", sub: "control" },
    { id: "opt", label: "⌥", sub: "option" },
    { id: "cmd", label: "⌘", sub: "command", w: 1.25 },
    { id: "space", label: "", w: 5 },
    { id: "cmd-r", label: "⌘", sub: "command", w: 1.25 },
    { id: "opt-r", label: "⌥", sub: "option" },
    { id: "left", label: "◂" },
    { id: "up", label: "▴" },
    { id: "down", label: "▾" },
    { id: "right", label: "▸" },
  ],
];

type Shortcut = { title: string; keys: string[]; then?: string[]; group: string };

const SHORTCUTS: Shortcut[] = [
  { title: "Leave control of the other computer", keys: ["ctrl", "opt", "shift", "q"], group: "Control" },
  { title: "Leave a view-only session", keys: ["esc"], group: "Viewing" },
  { title: "Open Settings", keys: ["cmd", "comma"], group: "App" },
  { title: "Connect to the selected computer", keys: ["return"], group: "Nearby" },
  { title: "Move between computers", keys: ["up"], then: ["down"], group: "Nearby" },
  { title: "Quit Annex", keys: ["cmd", "q"], group: "App" },
];
const GROUPS = ["All", ...Array.from(new Set(SHORTCUTS.map((s) => s.group)))];
const USED = new Set(SHORTCUTS.flatMap((s) => [...s.keys, ...(s.then ?? [])]));
const LABEL: Record<string, string> = Object.fromEntries(ROWS.flat().map((k) => [k.id, k.label || k.sub || k.id]));

// What a real key press maps to here (event.code → key id).
const CODE: Record<string, string> = {
  Escape: "esc", ControlLeft: "ctrl", ControlRight: "ctrl", AltLeft: "opt", AltRight: "opt-r", ShiftLeft: "shift", ShiftRight: "shift-r",
  MetaLeft: "cmd", MetaRight: "cmd-r", Comma: "comma", Period: "period", Slash: "slash", Enter: "return", Space: "space",
  ArrowUp: "up", ArrowDown: "down", ArrowLeft: "left", ArrowRight: "right", Tab: "tab", Backspace: "delete",
};
const idFor = (code: string) => CODE[code] ?? (code.startsWith("Key") ? code.slice(3).toLowerCase() : code.startsWith("Digit") ? code.slice(5) : undefined);

const STEP_MS = 2600;

export function KeyboardGallery() {
  const reduce = useReducedMotion();
  const [group, setGroup] = useState("All");
  const [index, setIndex] = useState(-1); // -1: the resting title
  const [phase, setPhase] = useState(0); // a "then" key's turn, for sequences
  const [held, setHeld] = useState<Set<string>>(new Set());
  const list = useMemo(() => SHORTCUTS.filter((s) => group === "All" || s.group === group), [group]);
  const current = index >= 0 ? list[index % list.length] : null;

  // Step through the shortcuts; a sequence shows its second key half-way.
  useEffect(() => {
    if (reduce) return;
    const t = setTimeout(() => {
      setPhase(0);
      setIndex((i) => (i + 1) % list.length);
    }, index < 0 ? 1400 : STEP_MS);
    const half = current?.then ? setTimeout(() => setPhase(1), STEP_MS / 2) : undefined;
    return () => {
      clearTimeout(t);
      if (half) clearTimeout(half);
    };
  }, [index, list.length, current, reduce]);

  // Your own key presses light the keys too.
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const id = idFor(e.code);
      if (id) setHeld((h) => new Set(h).add(id));
    };
    const up = (e: KeyboardEvent) => {
      const id = idFor(e.code);
      if (id) setHeld((h) => {
        const n = new Set(h);
        n.delete(id);
        return n;
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
  }, []);

  const pressed = new Set<string>([...held, ...(current ? (phase === 1 && current.then ? current.then : current.keys) : [])]);
  // Pressing a shortcut yourself names it, like the reference's active recall.
  const yours = SHORTCUTS.find((s) => s.keys.length > 0 && s.keys.every((k) => held.has(k)));
  const shown = yours ?? current;

  return (
    <div className="group-surface overflow-hidden px-4 pb-4 pt-10 sm:px-8">
      <div className="flex h-24 flex-col items-center text-center">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={shown?.title ?? "rest"}
            initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
            transition={{ duration: 0.25, ease: [0.2, 0, 0, 1] }}
            className="text-[clamp(1.2rem,2.4vw,1.6rem)] font-semibold tracking-[-0.02em]"
          >
            {shown?.title ?? "Breeze through Annex"}
          </motion.p>
        </AnimatePresence>
        <div className="mt-3 flex h-8 items-center gap-1.5" aria-hidden="true">
          {shown &&
            [...shown.keys.map((k) => ({ k, sep: false })), ...(shown.then ? [{ k: "→", sep: true }, ...shown.then.map((k) => ({ k, sep: false }))] : [])].map(({ k, sep }, i) =>
              sep ? (
                <span key={`s${i}`} className="text-xs text-faint">→</span>
              ) : (
                <span key={`${k}${i}`} className="grid h-7 min-w-7 place-items-center rounded-md px-1.5 text-[12px] text-fg shadow-[inset_0_0_0_1px_rgb(255_255_255/0.5),0_0_14px_rgb(255_255_255/0.25)]">
                  {LABEL[k]}
                </span>
              ),
            )}
        </div>
      </div>

      {/* The keyboard: fixed proportions, scaled to fit. */}
      <div className="mx-auto mt-2 max-w-[760px] select-none" aria-hidden="true">
        {ROWS.map((row, r) => (
          <div key={r} className={`flex gap-[0.6%] ${r === 0 ? "mb-[1.4%]" : "mb-[0.6%]"}`}>
            {row.map((k) => {
              const on = pressed.has(k.id);
              const used = USED.has(k.id);
              return (
                <div
                  key={k.id}
                  style={{ flex: `${k.w ?? 1} 1 0` }}
                  className={`relative flex flex-col items-center justify-center rounded-[6px] text-[clamp(7px,1.15vw,11px)] transition-[background-color,box-shadow,color,translate] duration-150 ${r === 0 ? "h-[clamp(14px,2.4vw,24px)]" : "h-[clamp(24px,4.6vw,46px)]"} ${
                    on
                      ? "translate-y-px bg-white/[0.14] text-white shadow-[inset_0_0_0_1px_rgb(255_255_255/0.7),0_0_18px_rgb(255_255_255/0.22)]"
                      : used
                        ? "text-white/75 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.2)]"
                        : "text-white/20 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.06)]"
                  }`}
                >
                  <span className={k.sub ? "text-[1.15em] leading-none" : ""}>{k.label}</span>
                  {k.sub && <span className="mt-1 text-[0.8em] leading-none opacity-80">{k.sub}</span>}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Groups, like the reference's bottom bar. */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-1.5 border-t border-white/[0.06] pt-4">
        {GROUPS.map((g, i) => (
          <button
            key={g}
            type="button"
            onClick={() => {
              setGroup(g);
              setIndex(-1);
            }}
            className={`flex h-8 items-center gap-2 rounded-full px-3 text-[12.5px] transition-colors duration-150 ${group === g ? "bg-white/[0.08] text-fg" : "text-faint hover:text-dim"}`}
          >
            <span className="grid size-4 place-items-center rounded-[4px] text-[10px] shadow-[inset_0_0_0_1px_rgb(255_255_255/0.2)]">{i + 1}</span>
            {g}
          </button>
        ))}
      </div>
    </div>
  );
}
