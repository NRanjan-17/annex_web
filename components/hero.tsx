import { CopyCommand } from "./copy-command";
import { DownloadForThisComputer } from "./download-button";
import { INSTALL } from "./links";

/** A giant outlined wordmark fading into the black, a tight headline over it, and two ways in. */
export function Hero() {
  return (
    <section className="relative mx-auto flex max-w-6xl flex-col items-center px-5 pb-20 pt-36 text-center md:pt-44">
      <svg
        viewBox="0 0 1000 230"
        className="wordmark pointer-events-none absolute inset-x-5 top-20 mx-auto w-[min(100%,980px)] select-none md:top-24"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="wordmark-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity="0.5" />
            <stop offset="0.75" stopColor="#fff" stopOpacity="0.05" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <text x="500" y="205" textAnchor="middle">
          ANNEX
        </text>
      </svg>

      <p className="eyebrow relative flex items-center gap-2.5">
        <span className="live-dot" aria-hidden="true" />
        Free and open source
      </p>
      <h1 className="relative mt-6 text-[clamp(2.6rem,7vw,4.75rem)] font-semibold leading-[0.98] tracking-[-0.045em]">
        Your other computer
        <br />
        is a second screen.
      </h1>
      <p className="relative mt-6 max-w-[38rem] text-lg leading-relaxed text-dim">
        Extend your display onto another computer, or mirror its screen.{" "}
        <strong className="font-medium text-fg">Mac, Windows and Linux</strong>, over your network, a cable or the
        internet. <strong className="font-medium text-fg">Encrypted end to end.</strong>
      </p>
      <div className="relative mt-9 flex flex-col items-center gap-3 sm:flex-row">
        <DownloadForThisComputer />
        <CopyCommand command={INSTALL.unix} short="curl -fsSL …/install.sh | sh" />
      </div>
      <p className="relative mt-5 text-[13px] text-faint">macOS 14+ · Windows 10 and 11 · Linux x86_64 and arm64</p>
    </section>
  );
}
