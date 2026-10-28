import { AppleIcon, LinuxIcon, WindowsIcon } from "./icons";
import { REPO } from "./links";

const NODES = [
  { label: "macOS", Icon: AppleIcon, className: "bob left-[6%] top-[12%]" },
  { label: "Windows", Icon: WindowsIcon, className: "bob-2 right-[4%] top-[30%]" },
  { label: "Linux", Icon: LinuxIcon, className: "bob-3 left-[30%] bottom-[6%]" },
];

/** After Boomtax's closing call to action (lookap 1dyli6): the ask on the left, and on the right
 *  the three systems as tiles wired together, the way Annex links them. */
export function Cta() {
  return (
    <section aria-labelledby="cta-title" className="border-y border-white/[0.06]">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-2 md:py-24">
        <div>
          <h2 id="cta-title" className="text-[clamp(2.2rem,5vw,3.5rem)] font-semibold leading-[1] tracking-[-0.04em]">
            Ready for a
            <br />
            second screen?
          </h2>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#download" className="btn btn-primary">
              Download Annex
            </a>
            <a href={REPO} className="btn btn-ghost">
              View on GitHub
            </a>
          </div>
        </div>

        <div className="relative h-72" aria-hidden="true">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
            <path d="M22 26 C 45 26, 55 40, 80 44 M22 26 C 30 50, 35 70, 44 84 M80 44 C 70 60, 60 78, 44 84" fill="none" stroke="rgb(255 255 255 / 0.18)" strokeWidth="0.35" strokeDasharray="1 1.4" className="wire" />
          </svg>
          {NODES.map(({ label, Icon, className }) => (
            <span
              key={label}
              className={`group-surface absolute flex items-center gap-2.5 bg-black px-4 py-3 font-mono text-[12px] uppercase tracking-[0.08em] ${className}`}
            >
              <Icon className="size-[18px]" />
              {label}
            </span>
          ))}
          <span className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full bg-black px-3 py-1.5 font-mono text-[11px] text-faint shadow-[inset_0_0_0_1px_rgb(255_255_255/0.12)]">
            <span className="live-dot" />
            encrypted
          </span>
        </div>
      </div>
    </section>
  );
}
