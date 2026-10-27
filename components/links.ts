/** Where everything lives. `latest/download/<name>` always serves the newest release's file. */
export const REPO = "https://github.com/NRanjan-17/Annex";
export const RELEASES = `${REPO}/releases`;
const latest = (file: string) => `${RELEASES}/latest/download/${file}`;

export const DOWNLOADS = {
  mac: latest("Annex-macos-universal.dmg"),
  windows: latest("Annex-Setup-x64.exe"),
  windowsArm: latest("Annex-Setup-arm64.exe"),
  linux: `${RELEASES}/latest`,
} as const;

export const INSTALL = {
  unix: "curl -fsSL https://raw.githubusercontent.com/NRanjan-17/Annex/main/scripts/install.sh | sh",
  windows: "irm https://raw.githubusercontent.com/NRanjan-17/Annex/main/scripts/install.ps1 | iex",
} as const;
