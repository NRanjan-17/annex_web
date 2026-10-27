import { ConnectionField } from "./connection-field";
import { CopyCommand } from "./copy-command";
import { DownloadForThisComputer } from "./download-button";
import { INSTALL } from "./links";
import { Reveal } from "./reveal";

/** After Oğuz Yağız Kara's shader-driven hero (lookap x0r410): the words on the left, and on the
 *  right a field of bars that builds two screens and the link between them, over a faint grid. */
export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/[0.06] pt-16">
      {/* The faint grid the field sits on. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgb(255_255_255/0.04)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.04)_1px,transparent_1px)] bg-[size:92px_92px] [mask-image:radial-gradient(ellipse_at_70%_45%,black_30%,transparent_75%)]"
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-6 px-5 py-16 lg:min-h-[calc(100svh-4rem)] lg:grid-cols-[1fr_1.15fr] lg:py-10">
        <div className="relative z-10">
          <Reveal className="eyebrow flex items-center gap-2.5">
            <span className="live-dot" aria-hidden="true" />
            Free and open source
          </Reveal>
          <h1 className="mt-6 text-[clamp(2.6rem,6vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.045em]">
            <Reveal as="span" delay={0.1} className="block">
              Your other computer
            </Reveal>
            <Reveal as="span" delay={0.2} className="block bg-linear-to-b from-white to-white/55 bg-clip-text pb-1 text-transparent">
              is a second screen.
            </Reveal>
          </h1>
          <Reveal delay={0.3} as="p" className="mt-6 max-w-[34rem] text-lg leading-relaxed text-dim">
            Extend your display onto another computer, or mirror its screen.{" "}
            <strong className="font-medium text-fg">Mac, Windows and Linux</strong>, over your network, a cable or the
            internet. <strong className="font-medium text-fg">Encrypted end to end.</strong>
          </Reveal>
          <Reveal delay={0.4} className="mt-9 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <DownloadForThisComputer />
            <CopyCommand command={INSTALL.unix} short="curl -fsSL …/install.sh | sh" />
          </Reveal>
          <Reveal delay={0.5} as="p" className="mt-5 text-[13px] text-faint">
            macOS 14+ · Windows 10 and 11 · Linux x86_64 and arm64
          </Reveal>
        </div>

        <Reveal delay={0.2} className="relative aspect-square w-full max-lg:max-h-[480px] lg:aspect-[1/0.92]">
          <ConnectionField />
          {/* A narrow rail label, as in the reference. */}
          <span className="absolute -right-1 top-2 hidden font-mono text-[10px] tracking-[0.2em] text-faint [writing-mode:vertical-rl] lg:block">
            CONNECTION · LIVE
          </span>
        </Reveal>
      </div>
    </section>
  );
}
