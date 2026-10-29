import type { Metadata } from "next";
import { Code, Key, Step, Steps, Ui } from "@/components/docs-ui";
import { FEATURES, PROBLEMS, SHORTCUTS, TOC } from "./content";
import { KeyboardGallery } from "@/components/keyboard-gallery";
import { Footer } from "@/components/footer";
import { DOWNLOADS, INSTALL, REPO } from "@/components/links";
import { JsonLd } from "@/components/json-ld";
import { Nav } from "@/components/nav";
import { Reveal } from "@/components/reveal";
import { docsData } from "@/lib/structured-data";

const description =
  "How to install Annex on Mac, Windows and Linux, pair two computers, and use every feature: Extend, Mirror, Control, " +
  "internet codes, cable, sound, clipboard, files, shortcuts and troubleshooting.";

export const metadata: Metadata = {
  title: { absolute: "Annex docs: install, pair two computers and use every feature" },
  description,
  alternates: { canonical: "/docs", types: { "text/plain": [{ url: "/llms-full.txt", title: "Annex docs for AI agents" }] } },
  // Setting these here replaces the home page's, so the share image is named again.
  openGraph: { title: "Annex docs", description, url: "/docs", siteName: "Annex", locale: "en_US", type: "article", images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", title: "Annex docs", description, images: ["/twitter-image"] },
};

function Heading({ id, label, title }: { id: string; label: string; title: string }) {
  return (
    <Reveal>
      <p className="eyebrow">{label}</p>
      <h2 id={id} className="mt-3 scroll-mt-24 text-[clamp(1.7rem,3.4vw,2.4rem)] font-semibold leading-[1.08] tracking-[-0.03em]">
        {title}
      </h2>
    </Reveal>
  );
}

export default function DocsPage() {
  return (
    <>
      <JsonLd data={docsData} />
      <Nav />
      <main id="main" className="mx-auto grid max-w-6xl gap-12 px-5 pb-24 pt-28 lg:grid-cols-[180px_1fr]">
        <aside className="hidden lg:block">
          <nav aria-label="On this page" className="sticky top-24 space-y-1 text-sm">
            {TOC.map((t) => (
              <a key={t.id} href={`#${t.id}`} className="block rounded-lg px-3 py-1.5 text-faint transition-colors duration-150 hover:bg-white/[0.05] hover:text-fg">
                {t.label}
              </a>
            ))}
          </nav>
        </aside>

        <div className="min-w-0">
          <Reveal>
            <h1 className="text-[clamp(2.4rem,5.5vw,3.75rem)] font-semibold leading-[1] tracking-[-0.04em]">Annex docs</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-dim">
              Install it, pair two computers, then try every feature. Each one takes a minute.
            </p>
          </Reveal>
          {/* Like the Linear gallery: the docs open on the keyboard. */}
          <Reveal delay={0.15} className="mt-10">
            <KeyboardGallery />
          </Reveal>

          <section className="mt-20" aria-labelledby="start">
            <Heading id="start" label="Get started" title="Install on both computers, then pair once." />
            <div className="mt-8 grid gap-3 md:grid-cols-3">
              <div className="group-surface p-5">
                <h3 className="font-semibold">macOS</h3>
                <Steps>
                  <Step><a className="text-fg underline-offset-4 hover:underline" href={DOWNLOADS.mac}>Download the .dmg</a> and drag Annex to Applications.</Step>
                  <Step>Allow <Ui>Local Network</Ui> when asked.</Step>
                  <Step>To share: allow <Ui>Screen Recording</Ui> once.</Step>
                </Steps>
              </div>
              <div className="group-surface p-5">
                <h3 className="font-semibold">Windows</h3>
                <Steps>
                  <Step>Download <a className="text-fg underline-offset-4 hover:underline" href={DOWNLOADS.windows}>x64</a> or <a className="text-fg underline-offset-4 hover:underline" href={DOWNLOADS.windowsArm}>ARM</a> and run it.</Step>
                  <Step>If SmartScreen appears: <Ui>More info</Ui> → <Ui>Run anyway</Ui>.</Step>
                  <Step>Allow Annex on <Ui>private networks</Ui>.</Step>
                </Steps>
              </div>
              <div className="group-surface p-5">
                <h3 className="font-semibold">Linux</h3>
                <Steps>
                  <Step>Run <Code>{INSTALL.unix.replace("https://raw.githubusercontent.com/NRanjan-17/Annex/main/scripts/", "…/")}</Code></Step>
                  <Step>Or install the <Code>.deb</Code> or <Code>.rpm</Code> from the release.</Step>
                  <Step>Open Annex from the app menu.</Step>
                </Steps>
              </div>
            </div>
            <div className="group-surface mt-3 p-5">
              <h3 className="font-semibold">Pair</h3>
              <Steps>
                <Step>Open Annex on both. Each shows the other under <Ui>Nearby</Ui> within a few seconds.</Step>
                <Step>Connect from one; the other shows a 6-digit PIN. Type it. After that, they connect without a PIN.</Step>
              </Steps>
            </div>
          </section>

          <section className="mt-24" aria-labelledby="try">
            <Heading id="try" label="Try every feature" title="Sixteen things to try, a minute each." />
            <div className="mt-8 grid gap-3 md:grid-cols-2">
              {FEATURES.map((f, i) => (
                <Reveal key={f.id} delay={(i % 2) * 0.06} className="group-surface p-6">
                  <article id={f.id} className="scroll-mt-24">
                    <h3 className="text-[17px] font-semibold tracking-tight">{f.title}</h3>
                    <p className="mt-1.5 text-[14.5px] leading-6 text-dim">{f.what}</p>
                    <Steps>
                      {f.steps.map((s, j) => (
                        <Step key={j}>{s}</Step>
                      ))}
                    </Steps>
                    {f.note && <p className="mt-4 border-t border-white/[0.06] pt-4 text-[13.5px] leading-6 text-faint">{f.note}</p>}
                  </article>
                </Reveal>
              ))}
            </div>
          </section>

          <section className="mt-24" aria-labelledby="shortcuts">
            <Heading id="shortcuts" label="Shortcuts" title="Keys worth knowing." />
            <div className="group-surface mt-8 divide-y divide-white/[0.06]">
              {SHORTCUTS.map((s) => (
                <div key={s.what + s.where} className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:gap-6">
                  <span className="flex gap-1.5">
                    {s.keys.map((k) => (
                      <Key key={k} wide={k.length > 2}>
                        {k}
                      </Key>
                    ))}
                  </span>
                  <span className="flex flex-1 flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <span className="text-[15px]">{s.what}</span>
                    <span className="text-[13px] text-faint">{s.where}</span>
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-24" aria-labelledby="troubleshooting">
            <Heading id="troubleshooting" label="Troubleshooting" title="If something doesn't work." />
            <div className="group-surface mt-8 divide-y divide-white/[0.06]">
              {PROBLEMS.map(([problem, fix]) => (
                <div key={problem} className="grid gap-2 px-5 py-4 md:grid-cols-[240px_1fr] md:gap-6">
                  <p className="text-[15px] font-medium">{problem}</p>
                  <p className="text-[14.5px] leading-6 text-dim">{fix}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-[13.5px] text-faint">
              Still stuck? <a className="text-dim underline-offset-4 hover:underline" href={`${REPO}/issues`}>Open an issue</a> with your <Code>annex.log</Code>.
            </p>
          </section>

          <section className="mt-24" aria-labelledby="uninstall">
            <Heading id="uninstall" label="Uninstall" title="Removing Annex removes everything." />
            <div className="mt-8 grid gap-3 md:grid-cols-3">
              <div className="group-surface p-5 text-[14.5px] leading-6 text-dim">
                <h3 className="mb-2 font-semibold text-fg">macOS</h3>
                <Ui>About</Ui> → <Ui>Uninstall…</Ui> removes the app, its key, paired devices, settings and permissions.
              </div>
              <div className="group-surface p-5 text-[14.5px] leading-6 text-dim">
                <h3 className="mb-2 font-semibold text-fg">Windows</h3>
                Settings → Apps → Annex → Uninstall. It also removes the display driver, the firewall rule and all settings.
              </div>
              <div className="group-surface p-5 text-[14.5px] leading-6 text-dim">
                <h3 className="mb-2 font-semibold text-fg">Linux</h3>
                <Code>sudo apt remove annex</Code>, then delete <Code>~/.config/annex</Code> and <Code>~/.local/share/annex</Code>.
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
