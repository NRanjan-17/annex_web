import { Code, Ui } from "@/components/docs-ui";

/** What the docs say, kept apart from the layout so /llms-full.txt can say the same. */

export const TOC = [
  { id: "start", label: "Get started" },
  { id: "try", label: "Try every feature" },
  { id: "shortcuts", label: "Shortcuts" },
  { id: "troubleshooting", label: "Troubleshooting" },
  { id: "uninstall", label: "Uninstall" },
];

/** One feature to try: what it is, and the steps to see it work. */
export type Feature = { id: string; title: string; what: string; steps: React.ReactNode[]; note?: React.ReactNode };

export const FEATURES: Feature[] = [
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
      <>While the viewer is in front, your computer&apos;s own shortcuts go to the other one too: <Ui>⌘Space</Ui> and <Ui>⌘Tab</Ui> on a Mac, the <Ui>Windows key</Ui>, <Ui>Alt+Tab</Ui> and <Ui>Print Screen</Ui> on Windows, <Ui>Super</Ui> and <Ui>Alt+Tab</Ui> on Linux. Click outside the viewer to have them back.</>,
    ],
    note: <>Leave with <Ui>⌃⌥⇧Q</Ui> on a Mac or <Ui>Ctrl+Alt+Shift+Q</Ui> on Windows and Linux.</>,
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
    id: "own-server",
    title: "Your own server and relay",
    what: "Use your own code server or relay instead of Annex's.",
    steps: [
      <>Open <Ui>Internet</Ui> in Settings.</>,
      <><Ui>Server</Ui>: your code server&apos;s address, like <Code>wss://rendezvous.example.com</Code>. Set the same on both computers.</>,
      <><Ui>Your relay</Ui>: a TURN server, like <Code>turn:relay.example.com:3478</Code>, then its username and password. The sharing computer is the one that needs it.</>,
    ],
    note: (
      <>
        Leave both empty to use Annex&apos;s. The code server is a small Cloudflare Worker in the repository; any standard
        TURN server works as a relay. Step by step: the{" "}
        <a className="underline-offset-4 hover:underline" href="https://github.com/NRanjan-17/annex/blob/main/docs/GUIDE.md#your-own-code-server-and-relay">
          guide
        </a>
        .
      </>
    ),
  },
  {
    id: "hevc",
    title: "A sharper picture (HEVC)",
    what: "When both computers support HEVC, the picture is sharper at the same speed. Otherwise it's H.264.",
    steps: [
      <>Nothing to do: it&apos;s on by default, in <Ui>Settings → HEVC</Ui>.</>,
      <>Windows: to receive HEVC, install the <Ui>HEVC Video Extensions</Ui> from the Microsoft Store if your PC doesn&apos;t have them.</>,
      <>Linux: install <Code>gstreamer1.0-libav</Code> to receive it. Sending needs an HEVC encoder on the graphics chip.</>,
    ],
    note: <>When several computers watch one screen, it&apos;s HEVC only while all of them support it.</>,
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

export const SHORTCUTS: { keys: string[]; what: string; where: string }[] = [
  { keys: ["⌃", "⌥", "⇧", "Q"], what: "Leave control of the other computer", where: "Mac" },
  { keys: ["Ctrl", "Alt", "Shift", "Q"], what: "Leave control of the other computer", where: "Windows and Linux" },
  { keys: ["Esc"], what: "Leave a view-only session", where: "Everywhere" },
  { keys: ["⌘", "Space"], what: "Spotlight on the Mac you control (⌘Tab and screenshots too)", where: "Mac, while controlling" },
  { keys: ["Win"], what: "Start on the computer you control (Alt+Tab and Print Screen too)", where: "Windows, while controlling" },
  { keys: ["Super"], what: "Super on the computer you control (Alt+Tab too)", where: "Linux, while controlling" },
  { keys: ["⌘", ","], what: "Open Settings", where: "Mac" },
  { keys: ["Return"], what: "Connect to the selected computer", where: "Nearby" },
  { keys: ["↑", "↓"], what: "Move between computers", where: "Nearby" },
];

export const PROBLEMS: [string, React.ReactNode][] = [
  ["The other computer isn't under Nearby", <>Same network, not guest Wi-Fi or a VPN? On Windows, allow the firewall and set the network to Private. On a Mac, allow Annex under Local Network. Or use <Ui>Connect by Code or Address…</Ui>.</>],
  ["It's listed but greyed out", <>It isn&apos;t sharing yet: turn on sharing on that computer.</>],
  ["Extend Display is greyed out", <>A sharing Windows PC needs the Extend-mode display driver, an option in its installer.</>],
  ["Black screen when viewing a Mac", <>Allow Screen Recording for Annex in System Settings → Privacy &amp; Security, then turn sharing off and on.</>],
  ["The mouse and keyboard do nothing", <>The sharing computer must allow your device under <Ui>Paired Devices</Ui> (and a Mac needs Accessibility). Turn on <Ui>Control the other computer</Ui> on yours.</>],
  ["The PIN keeps failing", <>After 5 wrong PINs, pairing pauses for 10 minutes. Type the PIN shown on the sharing computer.</>],
  ["The picture lags", <>Use a cable or Direct Wi-Fi, or set <Ui>Quality</Ui> to <Ui>Fast (Wi-Fi)</Ui>.</>],
];
