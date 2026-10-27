import { ClipboardIcon, FileIcon, SoundIcon } from "./icons";
import { Section } from "./section";

function Cell({ title, body, wide, children }: { title: string; body: string; wide?: boolean; children: React.ReactNode }) {
  return (
    <article className={`group-surface flex flex-col justify-between gap-10 p-6 ${wide ? "md:col-span-2" : ""}`}>
      <div>{children}</div>
      <div>
        <h3 className="text-[17px] font-semibold tracking-tight">{title}</h3>
        <p className="mt-1.5 text-[15px] leading-6 text-dim">{body}</p>
      </div>
    </article>
  );
}

const Pill = ({ children }: { children: React.ReactNode }) => (
  <span className="rounded-full bg-white/[0.06] px-3 py-1.5 text-[13px] text-dim shadow-[inset_0_0_0_1px_rgb(255_255_255/0.08)]">{children}</span>
);

export function Bento() {
  return (
    <Section label="Everything else" title="Made to feel like it's plugged in.">
      <div className="grid gap-3 md:grid-cols-3">
        <Cell wide title="Any combination" body="Mac to Windows, Windows to Linux, Mac to Mac. Every pairing, in either direction.">
          <div className="flex flex-wrap items-center gap-3 text-lg font-medium" aria-hidden="true">
            {["macOS", "Windows", "Linux"].map((os, i) => (
              <span key={os} className="flex items-center gap-3">
                {i > 0 && <span className="h-px w-8 bg-linear-to-r from-white/5 via-white/40 to-white/5" />}
                {os}
              </span>
            ))}
          </div>
        </Cell>
        <Cell title="Low delay" body="Hardware video encoding over a direct link. A cable is faster still.">
          <p className="font-semibold tracking-tight" aria-hidden="true">
            <span className="text-5xl tabular-nums">~8</span>
            <span className="ml-1 text-lg text-faint">ms</span>
          </p>
        </Cell>
        <Cell title="Sound, clipboard and files" body="Hear the other computer, copy here and paste there, and drag files across.">
          <div className="flex gap-2 text-dim" aria-hidden="true">
            {[SoundIcon, ClipboardIcon, FileIcon].map((Icon, i) => (
              <span key={i} className="grid size-11 place-items-center rounded-full bg-white/[0.06] shadow-[inset_0_0_0_1px_rgb(255_255_255/0.08)]">
                <Icon className="size-5" />
              </span>
            ))}
          </div>
        </Cell>
        <Cell title="Any link" body="Your network, an Ethernet or Thunderbolt cable, or no router at all.">
          <div className="flex flex-wrap gap-2" aria-hidden="true">
            {["Wi-Fi", "Cable", "Direct Wi-Fi", "Peer-to-peer"].map((l) => (
              <Pill key={l}>{l}</Pill>
            ))}
          </div>
        </Cell>
        <Cell
          title="Pair once with a PIN"
          body="The first time, type the 6-digit PIN the other computer shows. After that they connect on their own, and nothing else can pretend to be them."
        >
          <div className="flex gap-1.5 font-mono text-xl tabular-nums" aria-hidden="true">
            {[4, 8, 2, 9, 1, 6].map((d, i) => (
              <span key={i} className="grid h-12 w-9 place-items-center rounded-[10px] bg-white/[0.06] shadow-[inset_0_0_0_1px_rgb(255_255_255/0.08)]">
                {d}
              </span>
            ))}
          </div>
        </Cell>
      </div>
    </Section>
  );
}
