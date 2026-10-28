import type { Metadata } from "next";
import { Code, Key, Step, Steps, Ui } from "@/components/docs-ui";
import { KeyboardGallery } from "@/components/keyboard-gallery";
import { Footer } from "@/components/footer";
import { DOWNLOADS, INSTALL, REPO } from "@/components/links";
import { Nav } from "@/components/nav";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Docs · Annex",
  description: "Install Annex, pair two computers, and try every feature: Extend, Mirror, Control, internet codes, sound, clipboard, files and more.",
};

const TOC = [
  { id: "start", label: "Get started" },
  { id: "try", label: "Try every feature" },
  { id: "shortcuts", label: "Shortcuts" },
  { id: "troubleshooting", label: "Troubleshooting" },
  { id: "uninstall", label: "Uninstall" },
];

/** One feature to try: what it is, and the steps to see it work. */
type Feature = { id: string; title: string; what: string; steps: React.ReactNode[]; note?: React.ReactNode };

const FEATURES: Feature[] = [
  {
    id: "extend",
    title: "Extend",
    what: "The other computer becomes a second monitor. Drag windows onto it.",
    steps: [
      <>On the computer whose screen you'll use, turn on <Ui>Share this Mac</Ui> or <Ui>Share this PC</Ui>.</>,
      <>On the other, pick it under <Ui>Nearby</Ui>, then <Ui>Extend Display</Ui>.</>,
      <>Drag a window off the edge of your screen: it appears on the other computer.</>,
    ],
    note: <>A Windows PC that shares needs the <Ui>Extend-mode display driver</Ui>, an option in its installer.</>,
  },
  {
    id: "mirror",
    title: "Mirror",
    what: "See and use another computer's screen in a window or full screen.",
    steps: [
      <>Turn on sharing on the other computer.</>,
      <>Pick it under <Ui>Nearby</Ui>, then <Ui>Show Its Screen</Ui>.</>,
      <>Press <Ui>Esc</Ui> to leave.</>,
    ],
  },
  {
    id: "control",
    title: "Control",
    what: "Use one mouse and keyboard for both. In Extend, the pointer crosses between screens.",
    steps: [
      <>On the sharing computer, open <Ui>Paired Devices</Ui> and turn on <Ui>Can use this Mac&apos;s mouse and keyboard</Ui> for your device.</>,
      <>On a Mac, allow <Ui>Accessibility</Ui> when asked.</>,
      <>On your computer, turn on <Ui>Control the other computer</Ui> in Settings, then connect.</>,
    ],
    note: <>Leave with <Ui>⌃⌥⇧Q</Ui> on a Mac or <Ui>Ctrl+Alt+Shift+Q</Ui> on Windows.</>,
  },
  {
    id: "internet",
    title: "Over the internet",
    what: "Connect two computers on different networks with a 6-character code.",
    steps: [
      <>On the sharing computer, open <Ui>This Mac</Ui> or <Ui>This PC</Ui>, find <Ui>Over the internet</Ui>, and click <Ui>Get a Code</Ui>.</>,
      <>On the other, choose <Ui>Connect by Code or Address…</Ui> and type the code. It works once, for 10 minutes.</>,
      <>The first time, type the PIN too.</>,
    ],
    note: (
      <>
        The relay is used only when a network blocks a direct link (some internet providers, college and office
        networks). It stays encrypted: nothing you share is stored or seen. Limit: 10 relayed sessions a day per
        sharing computer. Your own relay, under <Ui>Internet</Ui> in Settings, has none.
      </>
    ),
  },
  {
    id: "cable",
    title: "Cable",
    what: "The fastest link. Annex uses it by itself when one is plugged in.",
    steps: [
      <>Mac to Mac: connect a Thunderbolt or USB4 cable.</>,
      <>Anything else: connect an Ethernet cable, with a USB-C adapter if needed.</>,
      <>Connect as usual. The link shows as <Ui>Cable</Ui>.</>,
    ],
    note: <>A plain USB charging or data cable isn&apos;t a network link, so it doesn&apos;t work.</>,
  },
  {
    id: "direct-wifi",
    title: "Direct Wi-Fi",
    what: "The Windows PC runs its hotspot and the other computer joins it: no router in between.",
    steps: [
      <>Set up Mobile hotspot once in Windows Settings.</>,
      <>Turn on <Ui>Use direct Wi-Fi</Ui> before connecting, or <Ui>Switch to direct Wi-Fi</Ui> during a session.</>,
      <>Annex joins the hotspot and reconnects by itself.</>,
    ],
  },
  {
    id: "p2p",
    title: "Peer-to-peer Wi-Fi",
    what: "Mac to Mac with no network at all, over the link AirDrop uses.",
    steps: [
      <>Keep <Ui>Peer-to-peer Wi-Fi</Ui> on in Settings (it is by default).</>,
      <>On a Mac you haven&apos;t paired yet, choose <Ui>Let a new Mac find this one</Ui> for 5 minutes.</>,
      <>It appears under <Ui>Nearby</Ui> on the other Mac as <Ui>Peer-to-peer</Ui>.</>,
    ],
  },
  {
    id: "sound",
    title: "Sound",
    what: "Hear the computer you're viewing, and send your microphone back.",
    steps: [
      <>On the sharing computer, keep <Ui>Share this computer&apos;s sound</Ui> on.</>,
      <>On yours, keep <Ui>Hear the other computer</Ui> on.</>,
      <>For calls, turn on <Ui>Send my microphone</Ui>. On Linux it appears as <Ui>Annex Microphone</Ui>.</>,
    ],
    note: <>Both computers need Annex 0.3.2 or later.</>,
  },
  {
    id: "clipboard",
    title: "Copy and paste",
    what: "Copy on one computer, paste on the other, while you control it.",
    steps: [
      <>Keep <Ui>Share the clipboard</Ui> on in Settings.</>,
      <>Control the other computer, copy some text or a picture.</>,
      <>Paste it on your own computer, or the other way round.</>,
    ],
    note: <>Passwords copied from password managers stay where they were copied.</>,
  },
  {
    id: "files",
    title: "Send files",
    what: "Drag files across; they arrive in the other computer's Downloads folder, checked.",
    steps: [
      <>Start dragging a file during a session.</>,
      <>Drop it on the island at the top of the screen (the notch on a Mac), or on the viewer window.</>,
      <>Use <Ui>Pause</Ui> or <Ui>Unsend</Ui> in the island while it sends.</>,
    ],
  },
  {
    id: "display",
    title: "Scaling and refresh rate",
    what: "Set the extended display like a real monitor: sharp, larger text, or 144 Hz.",
    steps: [
      <>Mac: choose <Ui>Extended display scaling</Ui> in Settings, or the resolution in System Settings → Displays.</>,
      <>Pick the refresh rate in System Settings → Displays → <Ui>Annex Display</Ui>.</>,
      <>Windows: use Settings → System → Display, as for any monitor.</>,
    ],
  },
  {
    id: "headless",
    title: "No one at this screen",
    what: "Share a Raspberry Pi or Mac mini you only reach over SSH.",
    steps: [
      <>Turn on <Ui>No one at this screen</Ui>, or run <Code>annex --headless --share</Code> on Linux.</>,
      <>Turn on <Ui>Open at login</Ui> and <Ui>Start sharing when Annex opens</Ui>.</>,
      <>Read the PIN over SSH from <Code>pairing-pin.txt</Code> in Annex&apos;s data folder.</>,
    ],
  },
  {
    id: "updates",
    title: "Updates",
    what: "Annex installs new versions for you, checked against a signature.",
    steps: [
      <>Open <Ui>About</Ui> and click <Ui>Check Now</Ui>.</>,
      <>Turn on <Ui>Receive beta updates</Ui> to try pre-releases early.</>,
      <>See <Ui>What&apos;s New</Ui> after each update.</>,
    ],
  },
  {
    id: "logs",
    title: "Logs for a bug report",
    what: "Annex keeps a log on your computer. It never sends it anywhere.",
    steps: [
      <>Open <Ui>Developer</Ui> in Settings and click <Ui>Show Log Files</Ui>.</>,
      <>Reproduce the problem, then attach <Code>annex.log</Code> to an issue.</>,
    ],
  },
];

const SHORTCUTS: { keys: string[]; what: string; where: string }[] = [
  { keys: ["⌃", "⌥", "⇧", "Q"], what: "Leave control of the other computer", where: "Mac" },
  { keys: ["Ctrl", "Alt", "Shift", "Q"], what: "Leave control of the other computer", where: "Windows and Linux" },
  { keys: ["Esc"], what: "Leave a view-only session", where: "Everywhere" },
  { keys: ["⌘", ","], what: "Open Settings", where: "Mac" },
  { keys: ["Return"], what: "Connect to the selected computer", where: "Nearby" },
  { keys: ["↑", "↓"], what: "Move between computers", where: "Nearby" },
];

const PROBLEMS: [string, React.ReactNode][] = [
  ["The other computer isn't under Nearby", <>Same network, not guest Wi-Fi or a VPN? On Windows, allow the firewall and set the network to Private. On a Mac, allow Annex under Local Network. Or use <Ui>Connect by Code or Address…</Ui>.</>],
  ["It's listed but greyed out", <>It isn&apos;t sharing yet: turn on sharing on that computer.</>],
  ["Extend Display is greyed out", <>A sharing Windows PC needs the Extend-mode display driver, an option in its installer.</>],
  ["Black screen when viewing a Mac", <>Allow Screen Recording for Annex in System Settings → Privacy &amp; Security, then turn sharing off and on.</>],
  ["The mouse and keyboard do nothing", <>The sharing computer must allow your device under <Ui>Paired Devices</Ui> (and a Mac needs Accessibility). Turn on <Ui>Control the other computer</Ui> on yours.</>],
  ["The PIN keeps failing", <>After 5 wrong PINs, pairing pauses for 10 minutes. Type the PIN shown on the sharing computer.</>],
  ["The picture lags", <>Use a cable or Direct Wi-Fi, or set <Ui>Quality</Ui> to <Ui>Fast (Wi-Fi)</Ui>.</>],
];

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
            <Heading id="try" label="Try every feature" title="Fourteen things to try, a minute each." />
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
