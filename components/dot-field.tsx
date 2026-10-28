"use client";

import { useEffect, useRef } from "react";

/**
 * The hero's field, after the first of shaders' "Shader Blocks" (lookap 1u0ife): point-cloud
 * ribbons fold and drift behind a dot-matrix "annex". The pointer is a vortex: dots near it are
 * pulled into a swirling loop around it and spring home when it leaves. With no pointer, a ghost one
 * wanders along the word. Corner brackets mark the pointer and hop around the word with live tags.
 * Canvas 2D; paused off screen; one still frame with Reduce motion.
 */

const WORD = "annex";
const TAGS = ["8 ms", "1920×1080", "encrypted", "60 fps", "144 Hz", "cable", "direct"];
const GREEN = "61, 209, 133";

type Dot = { hx: number; hy: number; x: number; y: number; vx: number; vy: number; seed: number };

export function DotField() {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvas.current;
    const ctx = el?.getContext("2d");
    if (!el || !ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0, visible = true, gap = 9;
    let dots: Dot[] = [];
    const pointer = { x: 0, y: 0, active: false, last: 0 };
    const start = performance.now();

    // The word's dots: draw it off screen once and keep the lit pixels on a grid.
    const sample = () => {
      const off = document.createElement("canvas");
      off.width = Math.max(1, Math.floor(w));
      off.height = Math.max(1, Math.floor(h));
      const o = off.getContext("2d")!;
      const size = Math.min(w * 0.27, h * 0.36);
      gap = Math.max(6, Math.round(size / 17));
      o.fillStyle = "#fff";
      o.font = `800 ${size}px ui-sans-serif, system-ui, -apple-system, sans-serif`;
      o.textAlign = "center";
      o.textBaseline = "middle";
      o.fillText(WORD, w * 0.5, h * 0.44);
      const data = o.getImageData(0, 0, off.width, off.height).data;
      dots = [];
      for (let y = 0; y < off.height; y += gap)
        for (let x = 0; x < off.width; x += gap)
          if (data[(y * off.width + x) * 4 + 3] > 128) dots.push({ hx: x, hy: y, x, y, vx: 0, vy: 0, seed: Math.random() });
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

    // A ribbon: a twisted band of points seen in perspective, nearer points bigger and brighter.
    const ribbon = (t: number, cx: number, cy: number, len: number, angle: number, twist: number, phase: number, alpha: number) => {
      const cos = Math.cos(angle), sin = Math.sin(angle);
      for (let i = 0; i < 64; i++) {
        const u = i / 63 - 0.5;
        for (let j = 0; j < 10; j++) {
          const v = j / 9 - 0.5;
          const fold = Math.sin(u * 6 + t * 0.3 + phase) * 0.18 + Math.sin(u * 13 - t * 0.17 + phase) * 0.05;
          const turn = u * twist + t * 0.12 + phase;
          const px = u * len;
          const py = fold * len * 0.4 + v * 60 * Math.cos(turn);
          const depth = 0.5 + 0.5 * Math.sin(turn) * (v * 2);
          const x = cx * w + px * cos - py * sin;
          const y = cy * h + px * sin + py * cos;
          const s = 0.8 + depth * 1.6;
          ctx.fillStyle = `rgba(${215 + depth * 40},${225 + depth * 30},255,${(alpha * (0.2 + 0.8 * depth)).toFixed(3)})`;
          ctx.fillRect(x, y, s, s);
        }
      }
    };

    const brackets = (x: number, y: number, bw: number, bh: number, tag: string, live: boolean) => {
      const l = 10;
      ctx.strokeStyle = "rgba(255,255,255,0.8)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (const [cx, cy, dx, dy] of [[x, y, 1, 1], [x + bw, y, -1, 1], [x, y + bh, 1, -1], [x + bw, y + bh, -1, -1]] as const) {
        ctx.moveTo(cx + dx * l, cy);
        ctx.lineTo(cx, cy);
        ctx.lineTo(cx, cy + dy * l);
      }
      ctx.stroke();
      ctx.fillStyle = "rgba(255,255,255,0.05)";
      ctx.fillRect(x, y, bw, bh);
      ctx.font = "10px ui-monospace, SFMono-Regular, Menlo, monospace";
      const tw = ctx.measureText(tag).width + 10;
      ctx.fillStyle = live ? `rgba(${GREEN},0.95)` : "rgba(255,255,255,0.92)";
      ctx.fillRect(x + 6, y + bh - 20, tw, 13);
      ctx.fillStyle = "#000";
      ctx.fillText(tag, x + 11, y + bh - 10);
    };

    const draw = (now: number) => {
      const t = reduce ? 6 : (now - start) / 1000;
      ctx.clearRect(0, 0, w, h);

      ribbon(t, 0.2, 0.22, w * 0.55, -0.5, 4, 0, 0.5);
      ribbon(t, 0.78, 0.3, w * 0.5, 0.6, -5, 1.7, 0.45);
      ribbon(t, 0.3, 0.8, w * 0.6, 0.25, 3, 3.1, 0.4);
      ribbon(t, 0.82, 0.78, w * 0.45, -0.4, -4, 4.4, 0.38);
      ribbon(t, 0.55, 0.12, w * 0.35, 0.1, 6, 5.6, 0.25);

      // The vortex: the real pointer, or a ghost one wandering along the word when it's idle.
      const idle = !pointer.active || now - pointer.last > 2500;
      const vx = idle ? w * (0.5 + 0.3 * Math.sin(t * 0.45)) : pointer.x;
      const vy = idle ? h * (0.44 + 0.06 * Math.sin(t * 0.9)) : pointer.y;
      const strength = idle ? 0.55 + 0.45 * Math.sin(t * 0.6) : 1;
      const radius = Math.min(w, h) * 0.2;
      const ring = radius * 0.45;

      for (const d of dots) {
        if (!reduce) {
          const dx = d.x - vx, dy = d.y - vy;
          const dist = Math.hypot(dx, dy) || 1;
          if (dist < radius && strength > 0) {
            const f = (1 - dist / radius) * strength;
            // Swirl around the pointer, and settle onto a ring.
            d.vx += (-dy / dist) * f * 2.2 + (dx / dist) * (ring - dist) * 0.012 * f;
            d.vy += (dx / dist) * f * 2.2 + (dy / dist) * (ring - dist) * 0.012 * f;
          }
          // Spring home.
          d.vx += (d.hx - d.x) * 0.045;
          d.vy += (d.hy - d.y) * 0.045;
          d.vx *= 0.86;
          d.vy *= 0.86;
          d.x += d.vx;
          d.y += d.vy;
        }
        const away = Math.min(1, Math.hypot(d.x - d.hx, d.y - d.hy) / 60);
        const live = away > 0.3 && d.seed > 0.86;
        ctx.fillStyle = live ? `rgba(${GREEN},0.95)` : `rgba(255,255,255,${(0.96 - away * 0.25).toFixed(3)})`;
        const s = gap * 0.42 - away * gap * 0.12;
        ctx.beginPath();
        ctx.arc(d.x, d.y, s, 0, Math.PI * 2);
        ctx.fill();
      }

      // A bracket on the pointer, and one hopping around the word on its own.
      if (!idle) brackets(vx - 70, vy - 50, 140, 100, TAGS[Math.floor(t / 1.2) % TAGS.length], true);
      const step = Math.floor(t / 1.6);
      const pick = dots.length ? dots[(step * 7919) % dots.length] : { hx: w / 2, hy: h / 2 };
      brackets(pick.hx - 60, pick.hy - 44, 120 + ((step * 37) % 60), 88, TAGS[(step + 3) % TAGS.length], false);

      if (!reduce && visible) raf = requestAnimationFrame(draw);
    };

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
      pointer.active = true;
      pointer.last = performance.now();
    };
    const leave = () => (pointer.active = false);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerdown", move);
    el.addEventListener("pointerleave", leave);

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
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerdown", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);

  return <canvas ref={canvas} className="absolute inset-0 h-full w-full touch-pan-y" aria-hidden="true" />;
}
