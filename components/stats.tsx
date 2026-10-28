"use client";

import { useEffect, useRef } from "react";
import { Reveal } from "./reveal";

/** After James McDonald's AccessGrid stats (lookap lazv1l) with Vercel's big numbers (lookap ti5i8b):
 *  a dotted globe between a staggered headline and a line of copy, then a row of figures. */

const STATS = [
  { value: "~8", unit: "ms", label: "From one screen\nto the other" },
  { value: "144", unit: "Hz", label: "Or whatever rate\nthe screen runs" },
  { value: "3", unit: "", label: "Systems, in any\ncombination" },
  { value: "0", unit: "", label: "Accounts, servers in\nthe way or trackers" },
];

export function Stats() {
  return (
    <section aria-labelledby="stats-title" className="mx-auto max-w-6xl px-5 py-20 md:py-28">
      <div className="grid items-center gap-8 md:grid-cols-[1fr_1.2fr_1fr]">
        <Reveal>
          <h2 id="stats-title" className="text-[clamp(1.9rem,3.6vw,2.6rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
            Feels plugged in,
            <span className="block pl-[1.2em] text-faint">from any distance.</span>
          </h2>
        </Reveal>
        <div className="relative aspect-square w-full max-w-[420px] justify-self-center">
          <Globe />
        </div>
        <Reveal delay={0.1} as="p" className="max-w-xs text-[15px] leading-6 text-dim md:justify-self-end">
          Across the desk on a cable, across the house on Wi-Fi, or across the world with a code. The picture goes
          straight between your two computers.
        </Reveal>
      </div>

      <div className="mt-14 grid grid-cols-2 gap-y-10 border-t border-white/[0.07] pt-10 md:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.06}>
            <p className="text-[clamp(2.4rem,5vw,3.6rem)] font-light leading-none tracking-[-0.04em] tabular-nums">
              {s.value}
              {s.unit && <span className="ml-1 text-[0.45em] text-faint">{s.unit}</span>}
            </p>
            <p className="mt-3 whitespace-pre-line text-[14px] leading-5 text-dim">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/** A sphere of dots, front half bright, turning slowly and leaning towards the pointer. */
function Globe() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = ref.current;
    const ctx = el?.getContext("2d");
    if (!el || !ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Points spread evenly over the sphere (Fibonacci lattice).
    const N = 1400;
    const pts = Array.from({ length: N }, (_, i) => {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const th = i * Math.PI * (3 - Math.sqrt(5));
      return [Math.cos(th) * r, y, Math.sin(th) * r] as const;
    });
    let size = 0, raf = 0, visible = true;
    const tilt = { x: 0, y: 0, tx: 0, ty: 0 };
    const start = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = el.clientWidth;
      el.width = el.height = Math.round(size * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (now: number) => {
      const t = reduce ? 0.6 : (now - start) / 1000;
      tilt.x += (tilt.tx - tilt.x) * 0.06;
      tilt.y += (tilt.ty - tilt.y) * 0.06;
      const a = t * 0.18 + tilt.x, b = -0.35 + tilt.y;
      const ca = Math.cos(a), sa = Math.sin(a), cb = Math.cos(b), sb = Math.sin(b);
      const R = size * 0.42, c = size / 2;
      ctx.clearRect(0, 0, size, size);
      for (const [px, py, pz] of pts) {
        const x1 = px * ca + pz * sa, z1 = -px * sa + pz * ca;
        const y2 = py * cb - z1 * sb, z2 = py * sb + z1 * cb;
        if (z2 < -0.15) continue; // the back half mostly hides
        const light = Math.max(0, z2);
        ctx.fillStyle = `rgba(255,255,255,${(0.08 + light * 0.75).toFixed(3)})`;
        const s = 0.6 + light * 1.4;
        ctx.fillRect(c + x1 * R, c + y2 * R, s, s);
      }
      if (!reduce && visible) raf = requestAnimationFrame(draw);
    };

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      tilt.tx = ((e.clientX - r.left) / r.width - 0.5) * 0.8;
      tilt.ty = ((e.clientY - r.top) / r.height - 0.5) * 0.6;
    };
    const leave = () => (tilt.tx = tilt.ty = 0);
    el.addEventListener("pointermove", move);
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
      el.removeEventListener("pointerleave", leave);
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}
