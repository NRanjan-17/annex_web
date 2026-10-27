/** A keyboard key, outlined like the Linear shortcut gallery (lookap 1uhs3o). */
export function Key({ children, wide = false }: { children: React.ReactNode; wide?: boolean }) {
  return (
    <kbd
      className={`inline-grid h-11 place-items-center rounded-[10px] bg-linear-to-b from-[#1c1c1f] to-[#121214] px-3 font-sans text-[15px] font-medium text-fg shadow-[inset_0_0_0_1px_rgb(255_255_255/0.12),inset_0_-2px_0_rgb(255_255_255/0.04),0_6px_14px_-8px_rgb(0_0_0)] ${wide ? "min-w-20" : "min-w-11"}`}
    >
      {children}
    </kbd>
  );
}

/** A name from the app (a button, setting or page), shown as it appears there. */
export function Ui({ children }: { children: React.ReactNode }) {
  return <span className="whitespace-nowrap rounded-md bg-white/[0.07] px-1.5 py-0.5 text-[0.92em] text-fg shadow-[inset_0_0_0_1px_rgb(255_255_255/0.08)]">{children}</span>;
}

/** Inline code: a command or a file path. */
export function Code({ children }: { children: React.ReactNode }) {
  return <code className="rounded-md bg-white/[0.06] px-1.5 py-0.5 font-mono text-[0.86em] text-fg">{children}</code>;
}

/** Numbered steps, each a short sentence. */
export function Steps({ children }: { children: React.ReactNode }) {
  return <ol className="mt-4 space-y-2.5 text-[14.5px] leading-6 text-dim [counter-reset:step]">{children}</ol>;
}

export function Step({ children }: { children: React.ReactNode }) {
  return (
    <li className="relative pl-8 [counter-increment:step] before:absolute before:left-0 before:top-0.5 before:grid before:size-5 before:place-items-center before:rounded-full before:bg-white/[0.08] before:text-[11px] before:font-semibold before:text-fg before:content-[counter(step)]">
      {children}
    </li>
  );
}
