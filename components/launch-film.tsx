"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { Reveal } from "./reveal";

const SRC = "/media/annex-launch.mp4";
const POSTER = "/media/annex-launch-poster.jpg";

/** The 30-second launch film. Plays silently on a loop while it's on screen (paused off screen,
 *  so it costs nothing while scrolled away); "Sound on" restarts it with sound. With Reduce
 *  motion it waits for a click. */
export function LaunchFilm() {
  const video = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const v = video.current;
    if (!v || reduce) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.35 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [reduce]);

  function soundOn() {
    const v = video.current;
    if (!v) return;
    v.muted = false;
    v.currentTime = 0;
    setMuted(false);
    v.play().catch(() => {});
  }

  function toggle() {
    const v = video.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  }

  return (
    <section aria-label="Launch film" className="mx-auto max-w-6xl px-5 pb-10">
      <Reveal>
        <div className="relative overflow-hidden rounded-[22px] bg-black p-1.5 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.1),0_40px_120px_-40px_rgb(255_255_255/0.12)]">
          <video
            ref={video}
            src={SRC}
            poster={POSTER}
            muted={muted}
            loop
            playsInline
            preload="metadata"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onClick={toggle}
            className="block aspect-video w-full cursor-pointer rounded-[16px] bg-black"
            aria-label="Annex launch film, 30 seconds"
          />
          <div className="pointer-events-none absolute inset-x-1.5 bottom-1.5 flex items-end justify-between rounded-b-[16px] bg-linear-to-t from-black/60 to-transparent p-4">
            <span className="text-[13px] text-dim">The 30-second film</span>
            <span className="pointer-events-auto flex gap-2">
              {!playing && (
                <button type="button" onClick={toggle} className="btn btn-small btn-primary">
                  Play
                </button>
              )}
              {muted && (
                <button type="button" onClick={soundOn} className="btn btn-small btn-ghost backdrop-blur-md">
                  Sound on
                </button>
              )}
            </span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
