/** Line icons on a 20-unit grid, 1.5 stroke beside regular text; colour comes from currentColor. */
type IconProps = { className?: string };

const line = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function ExtendIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden="true" {...line}>
      <rect x="2" y="4" width="10" height="8" rx="1.5" />
      <rect x="10" y="7" width="8" height="8" rx="1.5" />
    </svg>
  );
}

export function MirrorIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden="true" {...line}>
      <rect x="2" y="4" width="16" height="10" rx="1.5" />
      <path d="M7 17h6" />
    </svg>
  );
}

export function PointerIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden="true" {...line}>
      <path d="M5 3l10 5.5-4.5 1L8 14z" />
    </svg>
  );
}

export function GlobeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden="true" {...line}>
      <circle cx="10" cy="10" r="7.5" />
      <path d="M2.5 10h15M10 2.5c2.2 2.3 2.2 12.7 0 15M10 2.5c-2.2 2.3-2.2 12.7 0 15" />
    </svg>
  );
}

export function SoundIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden="true" {...line}>
      <path d="M3 8v4h3l4 3V5L6 8z" />
      <path d="M13.5 7.5a3.5 3.5 0 0 1 0 5" />
    </svg>
  );
}

export function ClipboardIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden="true" {...line}>
      <rect x="5" y="3.5" width="10" height="13.5" rx="2" />
      <path d="M8 3.5V2.5h4v1" />
    </svg>
  );
}

export function FileIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden="true" {...line}>
      <path d="M10 3v10M6 9l4 4 4-4M4 17h12" />
    </svg>
  );
}

export function CopyIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true" {...line}>
      <rect x="5" y="5" width="9" height="9" rx="2" />
      <path d="M11 5V3.5A1.5 1.5 0 0 0 9.5 2h-6A1.5 1.5 0 0 0 2 3.5v6A1.5 1.5 0 0 0 3.5 11H5" />
    </svg>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true" {...line} strokeWidth={1.75}>
      <path d="M3 8.5 6.5 12 13 4.5" />
    </svg>
  );
}

export function GitHubIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"
      />
    </svg>
  );
}

export function AppleIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M16.4 12.6c0-2.4 2-3.6 2.1-3.6-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.8 0-1.9-.9-3.2-.8-1.6 0-3.1 1-4 2.4-1.7 3-.4 7.3 1.2 9.7.8 1.2 1.8 2.5 3 2.4 1.2 0 1.7-.8 3.2-.8s1.9.8 3.2.8c1.3 0 2.2-1.2 3-2.4.9-1.3 1.3-2.7 1.3-2.8-.1 0-2.6-1-2.6-3.9ZM14 5.4c.7-.8 1.1-1.9 1-3-1 0-2.1.7-2.8 1.5-.6.7-1.2 1.8-1 2.9 1.1.1 2.1-.6 2.8-1.4Z"
      />
    </svg>
  );
}

export function WindowsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="currentColor" d="M3 5.5 10.4 4.5v7H3zm8.4-1.1L21 3v8.5h-9.6zM3 12.5h7.4v7L3 18.5zm8.4 0H21V21l-9.6-1.4z" />
    </svg>
  );
}

export function LinuxIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2c-2.2 0-3.4 1.8-3.4 4.3 0 1.6-.3 2.4-1.4 3.9C5.9 12 5 13.7 5 15.5c0 .9.2 1.6.6 2.2-.9.5-1.6 1.1-1.6 1.8 0 1.3 2.2 1.6 3.5 2.1 1 .4 1.6.4 2.2-.4h4.6c.6.8 1.2.8 2.2.4 1.3-.5 3.5-.8 3.5-2.1 0-.7-.7-1.3-1.6-1.8.4-.6.6-1.3.6-2.2 0-1.8-.9-3.5-2.2-5.3-1.1-1.5-1.4-2.3-1.4-3.9C15.4 3.8 14.2 2 12 2Zm-1.6 4.2c.4 0 .7.4.7 1s-.3 1-.7 1-.7-.4-.7-1 .3-1 .7-1Zm3.2 0c.4 0 .7.4.7 1s-.3 1-.7 1-.7-.4-.7-1 .3-1 .7-1ZM12 9.4c.9 0 1.9.5 1.9 1s-1 1.2-1.9 1.2-1.9-.7-1.9-1.2.9-1 1.9-1Z"
      />
    </svg>
  );
}

/** Annex's mark without its tile: two screens, the front one on a stand (traced from the app icon). */
export function AnnexMark({ className }: IconProps) {
  return (
    <svg viewBox="120 150 276 234" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="18" strokeLinecap="round">
      <mask id="annex-mark-gap">
        <rect x="120" y="150" width="276" height="234" fill="#fff" />
        <rect x="186" y="201" width="214" height="150" rx="30" fill="#000" />
      </mask>
      <rect x="139" y="168" width="184" height="123" rx="20" mask="url(#annex-mark-gap)" />
      <rect x="209" y="224" width="167" height="102" rx="18" />
      <path d="M290 335v34M256 371h68" />
    </svg>
  );
}
