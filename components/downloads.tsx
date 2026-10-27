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
    href: DOWNLOADS.windows,
    cta: "Download for Windows",
    extra: (
      <a href={DOWNLOADS.windowsArm} className="btn btn-ghost w-full">
        ARM version
      </a>
    ),
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
        {PLATFORMS.map(({ name, Icon, body, href, cta, extra }) => (
          <article key={name} className="group-surface flex flex-col p-6">
            <Icon className="size-7 text-fg" />
            <h3 className="mt-6 text-[17px] font-semibold tracking-tight">{name}</h3>
            <p className="mt-1.5 flex-1 text-[15px] leading-6 text-dim">{body}</p>
            <div className="mt-6 flex flex-col gap-2">
              <a href={href} className="btn btn-primary w-full">
                {cta}
              </a>
              {extra}
            </div>
          </article>
        ))}
      </div>
      <p className="mt-6 text-center text-[13px] text-faint">
        Windows PowerShell: <code className="font-mono text-dim">{INSTALL.windows}</code>
      </p>
      <p className="mt-2 text-center text-[13px] text-faint">
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
