import { ImageResponse } from "next/og";

/** The picture shown when a link to the site is shared, and in search results that show one. */
export const alt = "Annex: use another computer as a second screen. Mac, Windows and Linux, free and open source.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 80, background: "#000", color: "#f5f5f5" }}>
        {/* The mark from public/assets/mark.svg, with the gap behind the front screen drawn in black. */}
        <svg width="120" height="120" viewBox="110 130 296 296" fill="none" stroke="#fff" strokeWidth="20" strokeLinecap="round">
          <g transform="translate(0 10)">
            <rect x="139" y="168" width="184" height="123" rx="20" />
            <rect x="186" y="201" width="214" height="150" rx="30" fill="#000" stroke="none" />
            <rect x="209" y="224" width="167" height="102" rx="18" />
            <path d="M290 335v34M256 371h68" />
          </g>
        </svg>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>Annex</div>
          <div style={{ marginTop: 24, fontSize: 48, lineHeight: 1.2, letterSpacing: -1, color: "rgba(255,255,255,0.62)" }}>
            Use another computer as a second screen.
          </div>
          <div style={{ marginTop: 40, fontSize: 28, color: "rgba(255,255,255,0.42)" }}>Mac · Windows · Linux · Encrypted · Free and open source</div>
        </div>
      </div>
    ),
    size,
  );
}
