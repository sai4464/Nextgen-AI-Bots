"use client";

import { ReactNode, useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface BookLeaf {
  id: string;
  /** Short label for the page-jump strip. */
  tab: string;
  front?: ReactNode;
  back?: ReactNode;
  /**
   * Render as one sheet across both pages instead of a left/right pair.
   * The cover uses this so the dog opens onto the full width of the book.
   */
  spread?: ReactNode;
}

/**
 * Two-page spread with a page-turn animation.
 *
 * The whole spread is one animated element inside a single AnimatePresence.
 * An earlier version animated the two pages in separate presences with
 * mode="wait", which could deadlock: one page's exit never resolved and the
 * incoming spread was never allowed to mount, leaving the book blank.
 */
export function FlipBook({ leaves }: { leaves: BookLeaf[] }) {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const last = leaves.length - 1;

  const go = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(last, next));
      if (clamped === index) return;
      setDir(clamped > index ? 1 : -1);
      setIndex(clamped);
    },
    [index, last]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault();
      go(e.key === 'ArrowRight' ? index + 1 : index - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, index]);

  const leaf = leaves[index];

  return (
    <div className="w-full">
      <div className="mx-auto flex w-full max-w-[1400px] items-center gap-3 md:gap-5">
        <FlipButton
          dir="prev"
          onClick={() => go(index - 1)}
          disabled={index === 0}
        />
        <div
          className="relative h-[1360px] w-full max-w-[1180px] flex-1 md:h-[770px]"
          style={{ perspective: '2400px' }}
        >
        <AnimatePresence initial={false} custom={dir}>
          <motion.div
            key={leaf.id}
            custom={dir}
            initial={{ rotateY: dir * 38, opacity: 0, scale: 0.97 }}
            animate={{ rotateY: 0, opacity: 1, scale: 1 }}
            exit={{ rotateY: dir * -38, opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
            style={{ transformStyle: 'preserve-3d' }}
            className="absolute inset-0 grid grid-cols-1 md:grid-cols-2"
          >
            {leaf.spread ? (
              <Sheet side="full">{leaf.spread}</Sheet>
            ) : (
              <>
                <Sheet side="left" page={index + 1}>{leaf.front}</Sheet>
                <Sheet side="right" page={index + 1}>{leaf.back}</Sheet>
              </>
            )}

            {/* spine, desktop only. A full-width spread has no gutter. */}
            {!leaf.spread && (
              <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-1/2 z-20 hidden w-14 -translate-x-1/2 md:block"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.14) 40%, rgba(0,0,0,.24) 50%, rgba(0,0,0,.14) 60%, rgba(0,0,0,0) 100%)',
                }}
              />
            )}
          </motion.div>
        </AnimatePresence>
        </div>
        <FlipButton
          dir="next"
          onClick={() => go(index + 1)}
          disabled={index === last}
        />
      </div>

      {/* ---- page strip ---- */}
      <div className="mx-auto mt-5 flex max-w-[1180px] items-center justify-center gap-4">
        <div className="hidden flex-wrap items-center justify-center gap-1.5 sm:flex">
          {leaves.map((l, i) => (
            <button
              key={l.id}
              onClick={() => go(i)}
              title={l.tab}
              aria-label={`Go to ${l.tab}`}
              className={`h-2.5 rounded-full transition-all ${
                i === index
                  ? 'w-8 bg-royal-red'
                  : 'w-2.5 bg-royal-cream/25 hover:bg-royal-cream/50'
              }`}
            />
          ))}
        </div>
      </div>

      <p className="mt-3 text-center text-[13px] text-royal-cream/50">
        Page {index + 1} of {leaves.length} · {leaf.tab} · you can also use the ← → keys
      </p>
      <p className="mt-1.5 text-center text-[13px] text-royal-cream/40">
        Something wrong or missing? Email{' '}
        <a
          href="mailto:ashwin@nextgenaibots.org"
          className="font-semibold text-royal-red hover:underline"
        >
          ashwin@nextgenaibots.org
        </a>
      </p>
    </div>
  );
}

/** Big page-turn control, sized for young hands, flanking the book. */
function FlipButton({
  dir,
  onClick,
  disabled,
}: {
  dir: 'prev' | 'next';
  onClick: () => void;
  disabled: boolean;
}) {
  const Icon = dir === 'prev' ? ChevronLeft : ChevronRight;
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === 'prev' ? 'Previous page' : 'Next page'}
      className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-royal-red text-white shadow-[0_6px_0_#8f1a26] transition hover:bg-[#e83346] active:translate-y-[3px] active:shadow-[0_3px_0_#8f1a26] disabled:pointer-events-none disabled:bg-royal-cream/15 disabled:shadow-none md:h-20 md:w-20"
    >
      <Icon className="h-8 w-8 md:h-10 md:w-10" strokeWidth={3} />
    </button>
  );
}

function Sheet({
  side,
  page,
  children,
}: {
  side: 'left' | 'right' | 'full';
  page?: number;
  children: ReactNode;
}) {
  const shape =
    side === 'full'
      ? 'col-span-1 rounded-xl md:col-span-2'
      : side === 'left'
      ? 'rounded-t-xl md:rounded-l-xl md:rounded-tr-none md:pr-10'
      : 'rounded-b-xl md:rounded-r-xl md:rounded-bl-none md:pl-10';
  return (
    <div
      className={`relative h-full overflow-hidden bg-[#FBF9F4] px-7 py-7 text-neutral-800 shadow-[0_18px_50px_rgba(0,0,0,.45)] ring-1 ring-black/10 sm:px-9 ${shape}`}
    >
      {/* Page number, outer corner of each sheet, the way a printed book runs
          them. Deliberately not the step number: several steps share a page
          and the two counts drifting apart is worse than having neither. */}
      {page !== undefined && (
        <span
          className={`pointer-events-none absolute top-3 z-10 text-[13px] font-bold tabular-nums text-neutral-400 ${
            side === 'left' ? 'left-4' : 'right-4'
          }`}
        >
          {page}
        </span>
      )}
      {children}
    </div>
  );
}
