"use client";

import { ReactNode } from 'react';
import { AlertTriangle, Flame, Baby, Wrench } from 'lucide-react';
import { KitPart } from '@/lib/kit-parts';
import { Viewer3D } from './Viewer3D';

/* ---------------- page furniture ---------------- */

export function PageHeader({
  step,
  title,
  kicker,
}: {
  step?: string;
  title: string;
  kicker?: string;
}) {
  return (
    <header className="mb-5 border-b-2 border-neutral-900/85 pb-3">
      <div className="flex items-center gap-3.5">
        {step && (
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[#D72638] text-[30px] font-black text-white shadow-[0_4px_0_#8f1a26]">
            {step}
          </span>
        )}
        <div>
          {kicker && (
            <p className="text-[12px] font-extrabold uppercase tracking-[0.16em] text-[#D72638]">
              {kicker}
            </p>
          )}
          <h2 className="text-[30px] font-extrabold leading-[1.1] text-neutral-900">
            {title}
          </h2>
        </div>
      </div>
    </header>
  );
}

/** LEGO-style "parts you need for this step" callout. */
export function PartsCallout({ items }: { items: { part: KitPart; qty: number }[] }) {
  return (
    <div className="rounded-2xl border-[3px] border-neutral-900/85 bg-white/60 p-3.5">
      <p className="mb-2.5 text-[13px] font-extrabold uppercase tracking-[0.14em] text-neutral-600">
        Grab these parts
      </p>
      <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4">
        {items.map(({ part, qty }) => (
          <div key={part.id} className="text-center">
            <div className="h-20 w-full">
              {part.stl ? (
                <Viewer3D
                  autoRotate={false}
                  interactive={false}
                  padding={1.15}
                  items={[{ kind: 'stl', url: part.stl, color: part.color }]}
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={part.photo}
                  alt={part.name}
                  className="h-full w-full object-contain"
                />
              )}
            </div>
            <p className="mt-0.5 text-[13px] font-bold leading-tight text-neutral-800">
              {part.name}
            </p>
            <p className="text-[16px] font-black text-[#D72638]">×{qty}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Inline caution strip, used where the risk actually lives, not just up front. */
export function Caution({
  tone = 'warn',
  children,
}: {
  tone?: 'warn' | 'danger' | 'tip';
  children: ReactNode;
}) {
  const styles = {
    warn: 'border-amber-500 bg-amber-50 text-amber-900',
    danger: 'border-[#D72638] bg-red-50 text-red-900',
    tip: 'border-sky-500 bg-sky-50 text-sky-900',
  }[tone];
  const Icon = tone === 'tip' ? Wrench : AlertTriangle;
  return (
    <div className={`flex gap-2.5 rounded-xl border-l-[6px] ${styles} px-3.5 py-3 text-[15px] font-medium leading-snug`}>
      <Icon className="mt-0.5 h-5 w-5 shrink-0" />
      <div>{children}</div>
    </div>
  );
}

export function Steps({ items }: { items: ReactNode[] }) {
  return (
    <ol className="space-y-3">
      {items.map((t, i) => (
        <li key={i} className="flex gap-3 text-[17px] leading-[1.45] text-neutral-800">
          <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-neutral-900 text-[14px] font-black text-white">
            {i + 1}
          </span>
          <span>{t}</span>
        </li>
      ))}
    </ol>
  );
}

/* ---------------- safety ---------------- */

/**
 * Two warnings, not six.
 *
 * An earlier draft ran to a six-item, two-page safety chapter. Kids skip long
 * front matter, so this is cut to the two hazards that can actually hurt
 * someone, and the rest are carried inline at the step where the risk lives:
 * the short-circuit warning sits on the wiring page, and the pinch warning on
 * the page where the legs first move.
 */
const SAFETY = [
  {
    icon: Flame,
    title: 'The battery can catch fire if you hurt it',
    body: 'Never bend, squash, poke, cut, or chew the silver-and-gold battery pouch. Never let the bare red and black wires touch each other. If it ever puffs up, gets hot, smells strange, or leaks, stop, tell an adult, and do not touch it.',
    tone: 'danger' as const,
  },
  {
    icon: Baby,
    title: 'Small parts are a choking hazard',
    body: 'The nuts, screws, spacers and spindle caps are small enough to swallow. Not for children under 3. Keep them off the floor and away from little brothers, sisters, and pets.',
    tone: 'warn' as const,
  },
];

export function SafetyGrid() {
  return (
    <div className="space-y-3">
      {SAFETY.map(({ icon: Icon, title, body, tone }) => (
        <div
          key={title}
          className={`rounded-lg border-2 p-3 ${
            tone === 'danger'
              ? 'border-[#D72638] bg-red-50/70'
              : 'border-amber-500 bg-amber-50/70'
          }`}
        >
          <div className="flex items-start gap-2.5">
            <div
              className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${
                tone === 'danger' ? 'bg-[#D72638]' : 'bg-amber-500'
              }`}
            >
              <Icon className="h-5 w-5 text-white" strokeWidth={2.6} />
            </div>
            <div>
              <h3 className="text-[17px] font-extrabold leading-snug text-neutral-900">{title}</h3>
              <p className="mt-1 text-[14.5px] leading-snug text-neutral-700">{body}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
