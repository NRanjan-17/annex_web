import { FEATURES, PROBLEMS, SHORTCUTS } from "@/app/docs/content";
import { QUESTIONS } from "@/components/faq";
import { DOWNLOADS, INSTALL, RELEASES, REPO, SITE } from "@/components/links";
import { plainText } from "./plain-text";

/** The site as Markdown for AI agents and answer engines, following llmstxt.org:
 *  /llms.txt is the short index, /llms-full.txt has the whole of the docs and FAQ in one file.
 *  Built from the same content as the pages, so the two never drift apart. */

const SUMMARY =
  "Annex is a free, open-source app (MIT licence) that turns another computer into a second monitor for yours, " +
  "or shows its screen on yours. It works between Mac, Windows and Linux in any combination, over your local " +
  "network, a cable, direct Wi-Fi or the internet, and is encrypted end to end. No account, no tracking.";

const FACTS = [
  "Modes: Extend (the other computer becomes a second display), Mirror (see and use its screen), Control (one mouse and keyboard for both, with a shared clipboard).",
  "Platforms: macOS 14 or later (Apple silicon and Intel); Windows 10 (2004) or 11 (x64 and ARM); Linux (Ubuntu, Debian, Fedora, openSUSE, Raspberry Pi OS; x86_64 and arm64).",
  "Any pairing works in either direction: Mac to Windows, Windows to Linux, Mac to Mac, and so on.",
  "Delay: about 8 ms on a direct link, with hardware video encoding. Extend matches the other screen's refresh rate, up to 240 Hz. Mirror goes up to 2560×1600 at 60 fps. HEVC when both computers support it, otherwise H.264.",
  "Links: local network, Ethernet, Thunderbolt or USB4 cable (Mac to Mac), direct Wi-Fi (Windows hotspot), peer-to-peer Wi-Fi (Mac to Mac), or the internet with a 6-character code.",
  "Security: TLS 1.3 over QUIC; computers pair once with a 6-digit PIN (SPAKE2, the PIN is never sent) and remember each other's keys.",
  "Privacy: on a local network Annex never talks to a server. Over the internet, the code server only swaps the two computers' addresses; a relay is used only when a network blocks a direct link, and it stays encrypted.",
  "Also: sound both ways, copy and paste, drag-and-drop file transfer, headless sharing (Raspberry Pi, Mac mini over SSH), automatic signed updates.",
  "Price: free. No paid version, no sign-up.",
];

const bullets = (items: string[]) => items.map((i) => `- ${i}`).join("\n");

export function llmsIndex() {
  return `# Annex

> ${SUMMARY}

${bullets(FACTS)}

## Docs

- [Annex docs](${SITE}/docs): install, pair, try every feature, shortcuts, troubleshooting, uninstall
- [Full docs and FAQ as one Markdown file](${SITE}/llms-full.txt)
${FEATURES.map((f) => `- [${f.title}](${SITE}/docs#${f.id}): ${f.what}`).join("\n")}
- [Troubleshooting](${SITE}/docs#troubleshooting)

## Download

- [macOS (universal .dmg)](${DOWNLOADS.mac})
- [Windows x64](${DOWNLOADS.windows}) · [Windows ARM](${DOWNLOADS.windowsArm})
- [Linux (.deb, .rpm, or the install script)](${DOWNLOADS.linux})
- macOS and Linux in a terminal: \`${INSTALL.unix}\`
- Windows in PowerShell: \`${INSTALL.windows}\`

## Optional

- [Source code on GitHub](${REPO})
- [All releases](${RELEASES})
- [Report a bug](${REPO}/issues)
`;
}

export function llmsFull() {
  return `# Annex

> ${SUMMARY}

Website: ${SITE} · Docs: ${SITE}/docs · Source: ${REPO}

## At a glance

${bullets(FACTS)}

## Get started

Install Annex on both computers, then pair once.

### macOS

1. [Download the .dmg](${DOWNLOADS.mac}) and drag Annex to Applications.
2. Allow \`Local Network\` when asked.
3. To share: allow \`Screen Recording\` once.

### Windows

1. Download [x64](${DOWNLOADS.windows}) or [ARM](${DOWNLOADS.windowsArm}) and run it. Or in PowerShell: \`${INSTALL.windows}\`
2. If SmartScreen appears: \`More info\` → \`Run anyway\`.
3. Allow Annex on \`private networks\`.

### Linux

1. Run \`${INSTALL.unix}\`
2. Or install the \`.deb\` or \`.rpm\` from the [latest release](${DOWNLOADS.linux}).
3. Open Annex from the app menu.

### Pair

1. Open Annex on both. Each shows the other under \`Nearby\` within a few seconds.
2. Connect from one; the other shows a 6-digit PIN. Type it. After that, they connect without a PIN.

## Features

${FEATURES.map(
  (f) => `### ${f.title}

${f.what}

${f.steps.map((s, i) => `${i + 1}. ${plainText(s)}`).join("\n")}${f.note ? `\n\nNote: ${plainText(f.note)}` : ""}`,
).join("\n\n")}

## Shortcuts

${SHORTCUTS.map((s) => `- \`${s.keys.join(s.keys.includes("↑") ? " / " : " + ")}\`: ${s.what} (${s.where})`).join("\n")}

## Troubleshooting

${PROBLEMS.map(([problem, fix]) => `- **${problem}**: ${plainText(fix)}`).join("\n")}

Still stuck? [Open an issue](${REPO}/issues) with your \`annex.log\`.

## Uninstall

- macOS: \`About\` → \`Uninstall…\` removes the app, its key, paired devices, settings and permissions.
- Windows: Settings → Apps → Annex → Uninstall. It also removes the display driver, the firewall rule and all settings.
- Linux: \`sudo apt remove annex\`, then delete \`~/.config/annex\` and \`~/.local/share/annex\`.

## FAQ

${QUESTIONS.map(({ q, a }) => `### ${q}\n\n${a}`).join("\n\n")}
`;
}
