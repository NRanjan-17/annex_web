import { CopyCommand } from "./copy-command";
import { AppleIcon, LinuxIcon, WindowsIcon } from "./icons";
import { DOWNLOADS, INSTALL, RELEASES, REPO } from "./links";
import { Section } from "./section";

const PLATFORMS = [
  {
    name: "macOS",
    Icon: AppleIcon,
    body: "macOS 14 or later, Apple silicon and Intel. Signed and notarized by Apple.",
    href: DOWNLOADS.mac,
    cta: "Download for Mac",
    extra: <CopyCommand command={INSTALL.unix} short="curl -fsSL …/install.sh | sh" className="w-full" />,
  },
  {
    name: "Windows",
    Icon: WindowsIcon,
    body: "Windows 10 (2004) or 11, Intel, AMD and ARM. Install to any folder or drive.",
    // Two builds, side by side: x64 for Intel and AMD PCs, ARM for Snapdragon and other ARM PCs.
    download: (
      <div className="grid grid-cols-2 gap-2">
        <a href={DOWNLOADS.windows} className="btn btn-primary" aria-label="Download for Windows x64 (Intel and AMD)">
          x64
        </a>
        <a href={DOWNLOADS.windowsArm} className="btn btn-ghost" aria-label="Download for Windows on ARM">
          ARM
        </a>
      </div>
    ),
    extra: <CopyCommand command={INSTALL.windows} short="irm …/install.ps1 | iex" prompt="PS>" className="w-full" />,
  },
  {
    name: "Linux",
    Icon: LinuxIcon,
    body: "Ubuntu, Debian, Fedora, openSUSE and Raspberry Pi OS, x86_64 and arm64.",
    href: DOWNLOADS.linux,
    cta: "Download for Linux",
    extra: <CopyCommand command={INSTALL.unix} short="curl -fsSL …/install.sh | sh" className="w-full" />,
  },
];

export function Downloads() {
  return (
    <Section id="download" label="Download" title="Get Annex. It's free.">
      <div className="grid gap-3 md:grid-cols-3">
        {PLATFORMS.map(({ name, Icon, body, href, cta, extra, download }) => (
          <article key={name} className="group-surface flex flex-col p-6">
            <Icon className="size-7 text-fg" />
            <h3 className="mt-6 text-[17px] font-semibold tracking-tight">{name}</h3>
            <p className="mt-1.5 flex-1 text-[15px] leading-6 text-dim">{body}</p>
            <div className="mt-6 flex flex-col gap-2">
              {/* Every card: the download on top, the one-line install under it. */}
              {download ?? (
                <a href={href} className="btn btn-primary w-full">
                  {cta}
                </a>
              )}
              {extra}
            </div>
          </article>
        ))}
      </div>
      <p className="mt-6 text-center text-[13px] text-faint">
        Every download is checked against a signature made when it&apos;s built ·{" "}
        <a href={RELEASES} className="text-dim underline-offset-4 hover:underline">
          All versions
        </a>{" "}
        ·{" "}
        <a href={`${REPO}#build-from-source`} className="text-dim underline-offset-4 hover:underline">
          Build from source
        </a>
      </p>
    </Section>
  );
}
