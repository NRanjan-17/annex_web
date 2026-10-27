"use client";

import { useState } from "react";
import { CheckIcon, CopyIcon } from "./icons";

/** A terminal line that copies itself. Shows a shortened form; copies the full command. */
export function CopyCommand({ command, short, className = "" }: { command: string; short: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard blocked (insecure context or permissions): leave the text selectable instead.
    }
  }

  return (
    <button type="button" onClick={copy} className={`chip ${className}`} aria-label={`Copy: ${command}`}>
      <span className="text-faint" aria-hidden="true">$</span>
      <span className="truncate">{short}</span>
      <span className="relative ml-auto grid size-7 place-items-center rounded-full text-dim" aria-hidden="true">
        {/* Both icons stay mounted and cross-fade, so the swap has an exit as well as an enter. */}
        <CopyIcon
          className={`absolute size-3.5 transition-[opacity,scale,filter] duration-200 ease-[cubic-bezier(0.2,0,0,1)] ${copied ? "scale-25 opacity-0 blur-[4px]" : "scale-100 opacity-100 blur-none"}`}
        />
        <CheckIcon
          className={`absolute size-3.5 text-live transition-[opacity,scale,filter] duration-200 ease-[cubic-bezier(0.2,0,0,1)] ${copied ? "scale-100 opacity-100 blur-none" : "scale-25 opacity-0 blur-[4px]"}`}
        />
      </span>
      <span className="sr-only" aria-live="polite">{copied ? "Copied" : ""}</span>
    </button>
  );
}
