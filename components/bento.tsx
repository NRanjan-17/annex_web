import { ClipboardIcon, FileIcon, SoundIcon } from "./icons";
import { Section } from "./section";
import { Spotlight } from "./spotlight";

/** After James McDonald's bento (lookap 1ln7hx): a deep cell holding a small floating piece of
 *  interface, with a bold lead-in and grey body at the bottom. */
function Cell({ title, body, wide, children }: { title: string; body: string; wide?: boolean; children: React.ReactNode }) {
  return (
    <Spotlight
      className={`group-surface flex min-h-64 flex-col justify-between gap-8 p-6 ${wide ? "md:col-span-2" : ""}`}
    >
      <div className="flex flex-1 items-center justify-center" aria-hidden="true">
        {children}
      </div>
      <p className="max-w-md text-[15px] leading-6 text-dim">
        <strong className="font-semibold text-fg">{title}.</strong> {body}
      </p>
    </Spotlight>
  );
}

/** A small floating chip, like a notification over the cell. */
const Float = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <span
    className={`rounded-[12px] bg-[#1d1d20]/90 px-3.5 py-2 text-[13px] text-dim shadow-[inset_0_0_0_1px_rgb(255_255_255/0.09),0_12px_30px_-12px_rgb(0_0_0)] ${className}`}
  >
    {children}
  </span>
);

export function Bento() {
  return (
    <Section label="Everything else" title="Made to feel like it's plugged in.">
      <div className="grid gap-3 md:grid-cols-3">
        <Cell wide title="Any combination" body="Mac to Windows, Windows to Linux, Mac to Mac. Every pairing, in either direction.">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {["macOS", "Windows", "Linux"].map((os, i) => (
              <span key={os} className="flex items-center gap-3">
                {i > 0 && <span className="h-px w-10 bg-linear-to-r from-white/5 via-white/40 to-white/5" />}
                <Float className={`text-fg ${["bob", "bob-2", "bob-3"][i]}`}>{os}</Float>
              </span>
            ))}
          </div>
        </Cell>
        <Cell title="Low delay" body="Hardware video encoding over a direct link. A cable is faster still.">
          <p className="font-semibold tracking-tight">
            <span className="text-6xl tabular-nums">~8</span>
            <span className="ml-1 text-lg text-faint">ms</span>
          </p>
        </Cell>
        <Cell title="Sound, clipboard and files" body="Hear the other computer, copy here and paste there, and drag files across.">
          <div className="flex flex-col items-center gap-2">
            <Float className="bob -translate-x-6">Copied on the Mac</Float>
            <Float className="bob-2 translate-x-6 text-fg">Pasted on the PC</Float>
            <div className="mt-2 flex gap-2 text-dim">
              {[SoundIcon, ClipboardIcon, FileIcon].map((Icon, i) => (
                <span key={i} className="grid size-10 place-items-center rounded-full bg-white/[0.06] shadow-[inset_0_0_0_1px_rgb(255_255_255/0.08)]">
                  <Icon className="size-[18px]" />
                </span>
              ))}
            </div>
          </div>
        </Cell>
        <Cell title="Any link" body="Your network, an Ethernet or Thunderbolt cable, or no router at all.">
          <div className="flex flex-col items-center">
            {/* A wire down to a small node, as in the reference. */}
            <Float className="bob-3 text-fg">Cable · 4 ms</Float>
            <span className="h-10 w-px bg-linear-to-b from-white/30 to-white/5" />
            <span className="grid size-12 place-items-center rounded-[10px] bg-[#1d1d20] shadow-[inset_0_0_0_1px_rgb(255_255_255/0.12)]">
              <span className="live-dot" />
            </span>
          </div>
        </Cell>
        <Cell
          title="Pair once with a PIN"
          body="The first time, type the 6-digit PIN the other computer shows. After that they connect on their own, and nothing else can pretend to be them."
        >
          <div className="flex gap-1.5 font-mono text-xl tabular-nums">
            {[4, 8, 2, 9, 1, 6].map((d, i) => (
              <span key={i} className="grid h-12 w-9 place-items-center rounded-[10px] bg-[#1d1d20] shadow-[inset_0_0_0_1px_rgb(255_255_255/0.1)]">
                {d}
              </span>
            ))}
          </div>
        </Cell>
      </div>
    </Section>
  );
}
