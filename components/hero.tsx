import { CopyCommand } from "./copy-command";
import { DotField } from "./dot-field";
import { DownloadForThisComputer } from "./download-button";
import { INSTALL } from "./links";
import { Reveal } from "./reveal";

/** After the first of shaders' "Shader Blocks" (lookap 1u0ife): a full-screen field with a
 *  dot-matrix "annex" you can stir with the pointer, and the words at the bottom left. */
export function Hero() {
  return (
    <section className="relative h-svh min-h-[620px] overflow-hidden bg-black">
      <DotField />
      <h1 className="sr-only">Annex: use another computer as a second screen, on Mac, Windows and Linux</h1>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-black via-black/60 to-transparent pt-32">
        <div className="mx-auto max-w-6xl px-5 pb-12 sm:pb-16">
          <Reveal delay={0.2} as="p" className="pointer-events-auto max-w-md text-[17px] leading-relaxed text-fg/90">
            Annex turns your other computer into a second screen, or shows its screen on yours. Mac, Windows and Linux,
            over your network, a cable or the internet, encrypted end to end.
          </Reveal>
          <Reveal delay={0.3} className="pointer-events-auto mt-7 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <DownloadForThisComputer />
            <CopyCommand command={INSTALL.unix} short="curl -fsSL …/install.sh | sh" />
            <a href="/docs" className="font-mono text-[13px] text-dim transition-colors duration-150 hover:text-fg sm:ml-2">
              Read the docs →
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
