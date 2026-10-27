"use client";

import { useEffect, useRef } from "react";

/**
 * After Oğuz Yağız Kara's shader-driven hero (lookap x0r410), told as a connection: a field of thin
 * vertical bars builds two glowing screens and the link between them, with data flowing along it.
 * Every few seconds the scene morphs to the next mode (Extend, Mirror, Control, Anywhere).
 * Canvas 2D, so it runs everywhere; paused off screen; one still frame with Reduce motion.
 */

type Rect = { x: number; y: number; w: number; h: number };
type Scene = { a: Rect; b: Rect; tagA: string; tagB: string; link: string; relay: boolean; pointer: boolean };

// Positions are fractions of the canvas.
const SCENES: Scene[] = [
  { a: { x: 0.08, y: 0.5, w: 0.34, h: 0.22 }, b: { x: 0.56, y: 0.2, w: 0.34, h: 0.22 }, tagA: "MACBOOK · 2560×1664", tagB: "PC · ANNEX DISPLAY", link: "EXTEND · 8 MS", relay: false, pointer: false },
  { a: { x: 0.06, y: 0.36, w: 0.36, h: 0.24 }, b: { x: 0.58, y: 0.36, w: 0.36, h: 0.24 }, tagA: "MAC · SHARING", tagB: "PC · 1920×1080", link: "MIRROR · CABLE 4 MS", relay: false, pointer: false },
  { a: { x: 0.1, y: 0.22, w: 0.32, h: 0.22 }, b: { x: 0.56, y: 0.52, w: 0.34, h: 0.22 }, tagA: "LINUX · CONTROLLED", tagB: "MAC · YOUR MOUSE", link: "CONTROL · DIRECT WI-FI", relay: false, pointer: true },
  { a: { x: 0.04, y: 0.64, w: 0.26, h: 0.18 }, b: { x: 0.7, y: 0.1, w: 0.26, h: 0.18 }, tagA: "HOME · MAC", tagB: "OFFICE · PC", link: "ANYWHERE · CODE K7P2QX", relay: true, pointer: false },
];

const HOLD_MS = 4200;
const MORPH_MS = 1100;
const COL = 7; // px between bars, like the reference's 8 px rhythm
const ROW = 3;
const GREEN = "61, 209, 133";

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const mixRect = (a: Rect, b: Rect, t: number): Rect => ({ x: mix(a.x, b.x, t), y: mix(a.y, b.y, t), w: mix(a.w, b.w, t), h: mix(a.h, b.h, t) });
// Cheap deterministic noise per bar, so the field shimmers without a texture.
const hash = (x: number, y: number) => {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return s - Math.floor(s);
};

export function ConnectionField({ className = "" }: { className?: string }) {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvas.current;
    const ctx = el?.getContext("2d");
    if (!el || !ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    const start = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = el.clientWidth;
      h = el.clientHeight;
      el.width = Math.round(w * dpr);
      el.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    /** How strongly a point belongs to a screen slab: a front face plus a dimmer offset back face. */
    const slab = (px: number, py: number, r: Rect, t: number) => {
      const x = r.x * w, y = r.y * h, rw = r.w * w, rh = r.h * h;
      const inside = (ox: number, oy: number) => px >= x + ox && px <= x + ox + rw && py >= y + oy && py <= y + oy + rh;
      if (inside(0, 0)) {
        // Brighter towards the top-left, with a slow ripple: a lit screen.
        const u = (px - x) / rw, v = (py - y) / rh;
        return 0.55 + 0.35 * (1 - (u + v) / 2) + 0.12 * Math.sin(u * 9 + v * 5 - t * 2.2);
      }
      if (inside(rw * 0.06, -rh * 0.18)) return 0.22; // depth: the back of the slab
      return 0;
    };

    const draw = (now: number) => {
      const elapsed = reduce ? 0 : now - start;
      const cycle = HOLD_MS + MORPH_MS;
      const i = Math.floor(elapsed / cycle) % SCENES.length;
      const into = elapsed % cycle;
      const k = into < HOLD_MS ? 0 : ease((into - HOLD_MS) / MORPH_MS);
      const from = SCENES[i], to = SCENES[(i + 1) % SCENES.length];
      const a = mixRect(from.a, to.a, k), b = mixRect(from.b, to.b, k);
      const t = elapsed / 1000;

      ctx.clearRect(0, 0, w, h);

      // The link: from the right edge middle of A to the left edge middle of B (a gentle curve).
      const ax = (a.x + a.w) * w, ay = (a.y + a.h / 2) * h;
      const bx = b.x * w, by = (b.y + b.h / 2) * h;
      const cx = (ax + bx) / 2, cy = Math.min(ay, by) - 0.08 * h;
      const curve = (s: number) => ({
        x: (1 - s) * (1 - s) * ax + 2 * (1 - s) * s * cx + s * s * bx,
        y: (1 - s) * (1 - s) * ay + 2 * (1 - s) * s * cy + s * s * by,
      });

      // Bars: screens.
      for (let px = COL / 2; px < w; px += COL) {
        for (let py = 0; py < h; py += ROW) {
          const f = Math.max(slab(px, py, a, t), slab(px, py, b, t));
          if (f <= 0) continue;
          const n = hash(px, Math.floor(py / 9));
          if (n > f + 0.25) continue; // gaps in the field
          ctx.fillStyle = `rgba(255,255,255,${(f * (0.55 + 0.45 * n)).toFixed(3)})`;
          ctx.fillRect(px, py, f > 0.5 ? 2.4 : 1.2, ROW - 0.6);
        }
      }

      // The wire: a dotted trail of short bars along the curve, with data flowing in green.
      const steps = 46;
      for (let s = 0; s <= steps; s++) {
        const p = curve(s / steps);
        const flow = (s / steps - t * 0.45) % 1;
        const head = Math.max(0, 1 - Math.abs(((flow + 1) % 1) - 0.5) * 2);
        const g = Math.pow(head, 6);
        ctx.fillStyle = g > 0.05 ? `rgba(${GREEN},${(0.35 + 0.65 * g).toFixed(3)})` : "rgba(255,255,255,0.32)";
        ctx.fillRect(p.x, p.y - 3, 2, 6 + g * 6);
      }

      // Anywhere: the code server, a small node mid-way that only introduces the two.
      const relay = mix(from.relay ? 1 : 0, to.relay ? 1 : 0, k);
      if (relay > 0.01) {
        const m = curve(0.5);
        ctx.strokeStyle = `rgba(255,255,255,${(0.5 * relay).toFixed(3)})`;
        ctx.lineWidth = 1;
        ctx.strokeRect(m.x - 14, m.y - 30, 28, 18);
        ctx.fillStyle = `rgba(255,255,255,${(0.55 * relay).toFixed(3)})`;
        ctx.font = "9px ui-monospace, SFMono-Regular, Menlo, monospace";
        ctx.fillText("CODE", m.x - 11, m.y - 18);
      }

      // Control: a pointer travelling across, from one screen to the other.
      const pointer = mix(from.pointer ? 1 : 0, to.pointer ? 1 : 0, k);
      if (pointer > 0.01) {
        const s = (Math.sin(t * 0.9) + 1) / 2;
        const p = curve(s);
        ctx.save();
        ctx.globalAlpha = pointer;
        ctx.translate(p.x, p.y - 14);
        ctx.fillStyle = "#fff";
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(11, 6);
        ctx.lineTo(6, 7.5);
        ctx.lineTo(3.5, 12);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }

      // Frames and tags, as in the reference: thin boxes with a mono label on a solid tab.
      const tagFade = into < HOLD_MS ? 1 : 1 - Math.sin(Math.PI * k);
      const frame = (r: Rect, label: string) => {
        const x = r.x * w - 6, y = r.y * h - 6, rw = r.w * w + 12, rh = r.h * h + 12;
        ctx.strokeStyle = `rgba(255,255,255,${(0.28 * tagFade).toFixed(3)})`;
        ctx.lineWidth = 1;
        ctx.strokeRect(Math.round(x) + 0.5, Math.round(y) + 0.5, Math.round(rw), Math.round(rh));
        ctx.font = "10px ui-monospace, SFMono-Regular, Menlo, monospace";
        const tw = ctx.measureText(label).width + 12;
        ctx.fillStyle = `rgba(255,255,255,${(0.92 * tagFade).toFixed(3)})`;
        ctx.fillRect(Math.round(x), Math.round(y) - 16, tw, 16);
        ctx.fillStyle = `rgba(0,0,0,${tagFade.toFixed(3)})`;
        ctx.fillText(label, Math.round(x) + 6, Math.round(y) - 5);
      };
      const label = (into < HOLD_MS ? from : to);
      frame(a, label.tagA);
      frame(b, label.tagB);

      // The link's own tag, in green: something live.
      const mid = curve(0.5);
      ctx.font = "10px ui-monospace, SFMono-Regular, Menlo, monospace";
      const lw = ctx.measureText(label.link).width + 12;
      ctx.fillStyle = `rgba(${GREEN},${(0.95 * tagFade).toFixed(3)})`;
      ctx.fillRect(mid.x - lw / 2, mid.y + 10, lw, 16);
      ctx.fillStyle = `rgba(0,0,0,${tagFade.toFixed(3)})`;
      ctx.fillText(label.link, mid.x - lw / 2 + 6, mid.y + 21);

      if (!reduce && visible) raf = requestAnimationFrame(draw);
    };

    resize();
    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) draw(performance.now());
    });
    ro.observe(el);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible || reduce) raf = requestAnimationFrame(draw);
    });
    io.observe(el);
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return <canvas ref={canvas} className={`block h-full w-full ${className}`} aria-hidden="true" />;
}
