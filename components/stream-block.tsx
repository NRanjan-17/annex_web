"use client";

import { useEffect, useRef } from "react";
import { Reveal } from "./reveal";

/**
 * After the first of shaders' "Shader Blocks" (lookap 1u0ife): point-cloud ribbons drift behind a
 * dot-matrix word whose dots are pulled into a sweeping stream and reform, with corner-bracket
 * boxes and tiny tags jumping around. Here the word is "annex" and the stream is a frame being sent
 * across. Canvas 2D; paused off screen; one still frame with Reduce motion.
 */

const WORD = "annex";
const DOT = 7; // px between dots of the word
const TAGS = ["1920×1080", "8 ms", "60 fps", "encrypted", "144 Hz", "cable"];
const GREEN = "61, 209, 133";

type Dot = { x: number; y: number; seed: number };

export function StreamBlock() {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvas.current;
    const ctx = el?.getContext("2d");
    if (!el || !ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0, visible = true;
    let dots: Dot[] = [];
    const start = performance.now();

    // The word's dots: draw it once off screen and keep the pixels that are lit, on a grid.
    const sample = () => {
      const off = document.createElement("canvas");
      off.width = Math.max(1, Math.floor(w));
      off.height = Math.max(1, Math.floor(h));
      const o = off.getContext("2d")!;
      const size = Math.min(w * 0.3, h * 0.42);
      o.fillStyle = "#fff";
      o.font = `700 ${size}px ui-sans-serif, system-ui, -apple-system, sans-serif`;
      o.textAlign = "center";
      o.textBaseline = "middle";
      o.fillText(WORD, w * 0.56, h * 0.44);
      const data = o.getImageData(0, 0, off.width, off.height).data;
      dots = [];
      for (let y = 0; y < off.height; y += DOT)
        for (let x = 0; x < off.width; x += DOT)
          if (data[(y * off.width + x) * 4 + 3] > 128) dots.push({ x, y, seed: Math.random() });
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = el.clientWidth;
      h = el.clientHeight;
      el.width = Math.round(w * dpr);
      el.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sample();
    };

    // A point-cloud ribbon: a wavy band of points, seen at an angle, drifting slowly.
    const ribbon = (t: number, y0: number, tilt: number, amp: number, phase: number, alpha: number) => {
      for (let i = 0; i < 70; i++) {
        const u = i / 69;
        for (let j = 0; j < 9; j++) {
          const v = j / 8 - 0.5;
          const x = u * w * 1.2 - w * 0.1;
          const wave = Math.sin(u * 5 + t * 0.35 + phase) * amp + Math.sin(u * 11 - t * 0.2 + phase) * amp * 0.3;
          const y = y0 * h + wave + v * 46 + (u - 0.5) * tilt * h;
          const depth = 0.5 + 0.5 * Math.sin(u * 7 + v * 3 + t * 0.4 + phase);
          ctx.fillStyle = `rgba(255,255,255,${(alpha * (0.25 + 0.75 * depth)).toFixed(3)})`;
          ctx.fillRect(x, y, 1.2 + depth, 1.2 + depth);
        }
      }
    };

    const draw = (now: number) => {
      const t = reduce ? 4 : (now - start) / 1000;
      ctx.clearRect(0, 0, w, h);

      ribbon(t, 0.2, 0.25, 26, 0, 0.22);
      ribbon(t, 0.78, -0.3, 32, 2.1, 0.18);
      ribbon(t, 0.55, 0.12, 18, 4.2, 0.1);

      // The cycle: formed, pulled into a stream that sweeps right (sent), back, reformed.
      const cycle = 7;
      const c = (t % cycle) / cycle;
      const pull = c < 0.45 ? 0 : c < 0.7 ? (c - 0.45) / 0.25 : c < 0.95 ? 1 - (c - 0.7) / 0.25 : 0;
      const k = pull * pull * (3 - 2 * pull); // smoothstep

      for (const d of dots) {
        // Each dot leaves at its own moment along an arc to the right and up, then comes home.
        const lag = Math.min(1, Math.max(0, k * 1.6 - d.seed * 0.6));
        const ang = -0.9 + lag * 1.8 + d.seed * 0.4;
        const r = lag * (w * 0.35 + d.seed * w * 0.15);
        const x = d.x + Math.cos(ang) * r * lag;
        const y = d.y + Math.sin(ang) * r * 0.45 * lag - lag * 30;
        const live = lag > 0.05 && d.seed > 0.82;
        ctx.fillStyle = live ? `rgba(${GREEN},${(0.9 - lag * 0.4).toFixed(3)})` : `rgba(255,255,255,${(0.95 - lag * 0.55).toFixed(3)})`;
        const s = 2.6 - lag * 1.4;
        ctx.fillRect(x - s / 2, y - s / 2, s, s);
      }

      // Corner brackets with tags, jumping between spots on the word.
      ctx.font = "10px ui-monospace, SFMono-Regular, Menlo, monospace";
      for (let b = 0; b < 2; b++) {
        const step = Math.floor(t / 1.6 + b * 7);
        const pick = dots.length ? dots[(step * 7919 + b * 104729) % dots.length] : { x: w / 2, y: h / 2 };
        const bw = 70 + ((step * 37) % 50), bh = 50 + ((step * 23) % 30);
        const x = pick.x - bw / 2, y = pick.y - bh / 2, l = 9;
        ctx.strokeStyle = "rgba(255,255,255,0.75)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (const [cx, cy, dx, dy] of [[x, y, 1, 1], [x + bw, y, -1, 1], [x, y + bh, 1, -1], [x + bw, y + bh, -1, -1]] as const) {
          ctx.moveTo(cx + dx * l, cy);
          ctx.lineTo(cx, cy);
          ctx.lineTo(cx, cy + dy * l);
        }
        ctx.stroke();
        const tag = TAGS[(step + b * 3) % TAGS.length];
        const tw = ctx.measureText(tag).width + 10;
        ctx.fillStyle = b === 0 ? `rgba(${GREEN},0.95)` : "rgba(255,255,255,0.92)";
        ctx.fillRect(x, y - 15, tw, 13);
        ctx.fillStyle = "#000";
        ctx.fillText(tag, x + 5, y - 5);
      }

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

  return (
    <section aria-labelledby="stream-title" className="mx-auto max-w-6xl px-5 py-10">
      <Reveal>
        <div className="relative h-[min(80vh,640px)] min-h-[440px] overflow-hidden rounded-[22px] bg-black shadow-[inset_0_0_0_1px_rgb(255_255_255/0.08),0_40px_100px_-40px_rgb(0_0_0)]">
          <canvas ref={canvas} className="absolute inset-0 h-full w-full" aria-hidden="true" />
          <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black via-black/70 to-transparent px-6 pb-8 pt-24 sm:px-[76px] sm:pb-12">
            <h2 id="stream-title" className="max-w-md text-[clamp(1.5rem,3vw,2.1rem)] font-semibold leading-[1.1] tracking-[-0.03em]">
              Every frame, sent straight to the other screen.
            </h2>
            <p className="mt-3 max-w-md text-[15px] leading-6 text-dim">
              Hardware-encoded, end-to-end encrypted, and in front of you in milliseconds, over your network, a cable or the
              internet.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a href="#download" className="btn btn-primary btn-small">
                Download Annex
              </a>
              <a href="/docs" className="text-sm text-dim transition-colors duration-150 hover:text-fg">
                Read the docs →
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
