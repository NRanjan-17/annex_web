import Image from "next/image";
import { CopyCommand } from "./copy-command";
import { DownloadForThisComputer } from "./download-button";
import { INSTALL } from "./links";
import { Reveal } from "./reveal";

const NEARBY = [
  { name: "MacBook Air", status: "Sharing", live: true, className: "bob left-0 top-[18%] sm:left-[4%]" },
  { name: "Windows PC", status: "Extending", live: true, className: "bob-2 right-0 top-[8%] sm:right-[4%]" },
  { name: "Raspberry Pi", status: "Nearby", live: false, className: "bob-3 bottom-[6%] right-[8%] sm:right-[16%]" },
];

/** Annex's Nearby screen as the picture: this computer in the middle, rings widening out while it
 *  looks, and the computers around it. Then the headline and the two ways in. */
export function Hero() {
  return (
    <section className="relative mx-auto flex max-w-6xl flex-col items-center px-5 pb-20 pt-28 text-center md:pt-32">
      <Reveal className="relative h-64 w-full max-w-xl md:h-72">
        <div aria-hidden="true">
          {/* Rings widening out from the icon, out of step. */}
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="absolute left-1/2 top-1/2 size-28 -translate-1/2 rounded-full shadow-[inset_0_0_0_1px_rgb(255_255_255/0.12)]"
              style={{ animation: `ring-out 4.5s ${i * 1.5}s cubic-bezier(0.2,0,0,1) infinite` }}
            />
          ))}
          <div className="absolute left-1/2 top-1/2 size-56 -translate-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(255_255_255/0.14),transparent)]" />
          <Image
            src="/assets/icon.png"
            alt=""
            width={104}
            height={104}
            preload
            className="absolute left-1/2 top-1/2 -translate-1/2 drop-shadow-[0_20px_40px_rgb(0_0_0/0.8)]"
          />
          {NEARBY.map((c) => (
            <span
              key={c.name}
              className={`absolute flex items-center gap-2.5 rounded-full bg-[#141416]/90 py-2 pl-3 pr-4 text-left shadow-[inset_0_0_0_1px_rgb(255_255_255/0.1),0_16px_32px_-16px_rgb(0_0_0)] backdrop-blur-md ${c.className}`}
            >
              <span className={c.live ? "live-dot" : "size-[7px] rounded-full bg-white/30"} />
              <span className="text-[13px] font-medium">{c.name}</span>
              <span className="text-[12px] text-faint">{c.status}</span>
            </span>
          ))}
        </div>
      </Reveal>

      <h1 className="relative mt-6 text-[clamp(2.6rem,7vw,4.75rem)] font-semibold leading-[0.98] tracking-[-0.045em]">
        <Reveal as="span" delay={0.1} className="block">
          Your other computer
        </Reveal>
        <Reveal as="span" delay={0.2} className="block bg-linear-to-b from-white to-white/55 bg-clip-text pb-1 text-transparent">
          is a second screen.
        </Reveal>
      </h1>
      <Reveal delay={0.3} as="p" className="relative mt-6 max-w-[38rem] text-lg leading-relaxed text-dim">
        Extend your display onto another computer, or mirror its screen.{" "}
        <strong className="font-medium text-fg">Mac, Windows and Linux</strong>, over your network, a cable or the
        internet. <strong className="font-medium text-fg">Encrypted end to end.</strong>
      </Reveal>
      <Reveal delay={0.35} className="relative mt-6">
        <p className="eyebrow flex items-center gap-2.5">
          <span className="live-dot" aria-hidden="true" />
          Free and open source
        </p>
      </Reveal>
      <Reveal delay={0.4} className="relative mt-8 flex flex-col items-center gap-3 sm:flex-row">
        <DownloadForThisComputer />
        <CopyCommand command={INSTALL.unix} short="curl -fsSL …/install.sh | sh" />
      </Reveal>
      <Reveal delay={0.5} as="p" className="relative mt-5 text-[13px] text-faint">
        macOS 14+ · Windows 10 and 11 · Linux x86_64 and arm64
      </Reveal>
    </section>
  );
}
