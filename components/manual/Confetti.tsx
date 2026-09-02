"use client";

import { useEffect, useRef } from 'react';

const COLOURS = ['#D72638', '#F2C230', '#4FA3E3', '#5FCF7F', '#F26722', '#F5F2EB'];

interface Piece {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
  w: number;
  h: number;
  colour: string;
}

/**
 * Celebration for the final page: an opening fall, settling into a light,
 * constant drift that stays in the background rather than competing with the
 * instructions. Canvas rather than DOM nodes so the pieces stay cheap.
 */
export function Confetti({ fire }: { fire: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio, 2);
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      canvas.width = r.width * dpr;
      canvas.height = r.height * dpr;
    };
    resize();

    const W = canvas.width / dpr;
    const H = canvas.height / dpr;
    const make = (startAbove: boolean): Piece => ({
      x: Math.random() * W,
      y: startAbove ? -20 - Math.random() * H : Math.random() * H * 0.4,
      vx: (Math.random() - 0.5) * 0.7,
      vy: 0.5 + Math.random() * 0.9,   // slow, drifting fall
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.06,
      w: 5 + Math.random() * 6,
      h: 4 + Math.random() * 5,
      colour: COLOURS[(Math.random() * COLOURS.length) | 0],
    });

    // An opening shower that thins out to a steady sprinkle.
    const OPENING = 90;
    const STEADY = 22;
    const pieces: Piece[] = Array.from({ length: OPENING }, () => make(false));

    const started = performance.now();
    let raf = 0;
    const tick = () => {
      const age = (performance.now() - started) / 1000;
      // Over the first ~6 s the population eases down to the quiet level.
      const want = age > 6 ? STEADY : Math.round(OPENING + (STEADY - OPENING) * (age / 6));

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      for (let i = pieces.length - 1; i >= 0; i--) {
        const p = pieces[i];
        p.x += p.vx + Math.sin((p.y + p.rot * 40) / 90) * 0.35; // gentle sway
        p.y += p.vy;
        p.rot += p.vr;
        if (p.y > H + 20) {
          if (pieces.length > want) {
            pieces.splice(i, 1);
            continue;
          }
          Object.assign(p, make(true));
        }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = 0.85;
        ctx.fillStyle = p.colour;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
      while (pieces.length < want) pieces.push(make(true));

      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => cancelAnimationFrame(raf);
  }, [fire]);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none absolute inset-0 z-30 h-full w-full"
      aria-hidden
    />
  );
}
