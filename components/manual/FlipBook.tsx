"use client";

import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react';

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

/** True once the viewport is wide enough for a real two-page spread. */
function useIsDesktop() {
  // Starts true so the server and the first client paint agree; a phone
  // corrects itself in the effect below, before anything is interactive.
  const [isDesktop, setIsDesktop] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);
  return isDesktop;
}

/**
 * Fullscreen for the book.
 *
 * Uses the real Fullscreen API where it exists, which is every desktop browser
 * and Android. iOS Safari does not implement it on ordinary elements, so there
 * is a CSS fallback that pins the book over the viewport instead. Both end up
 * setting the same `immersive` flag, so the layout only has one case to handle.
 */
function useFullscreen() {
  const ref = useRef<HTMLDivElement>(null);
  const [native, setNative] = useState(false);
  const [css, setCss] = useState(false);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    setSupported(typeof document !== 'undefined' && !!document.fullscreenEnabled);
    const sync = () => setNative(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', sync);
    return () => document.removeEventListener('fullscreenchange', sync);
  }, []);

  // Esc already exits native fullscreen; this is for the CSS fallback only.
  useEffect(() => {
    if (!css) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setCss(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [css]);

  const toggle = useCallback(async () => {
    const el = ref.current;
    if (!el) return;
    if (document.fullscreenElement) {
      await document.exitFullscreen().catch(() => undefined);
      return;
    }
    if (css) {
      setCss(false);
      return;
    }
    if (supported && el.requestFullscreen) {
      try {
        await el.requestFullscreen();
        return;
      } catch {
        // Fall through to the CSS version rather than doing nothing.
      }
    }
    setCss(true);
  }, [css, supported]);

  return { ref, immersive: native || css, toggle };
}

const hasBack = (l: BookLeaf) => !l.spread && l.back !== undefined;

/**
 * The manual, as a book.
 *
 * Desktop gets the two-page spread with a 3D page turn. A phone gets one page
 * at a time, sliding sideways, because half a spread on a 390 px screen is
 * unreadable and stacking both halves makes every leaf a long scroll. The leaf
 * index stays the single source of truth either way; `half` only says which
 * side of the current leaf a phone is looking at.
 */
export function FlipBook({ leaves }: { leaves: BookLeaf[] }) {
  const [index, setIndex] = useState(0);
  const [half, setHalf] = useState<0 | 1>(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const isDesktop = useIsDesktop();
  const { ref: fsRef, immersive, toggle: toggleFullscreen } = useFullscreen();
  const last = leaves.length - 1;
  const leaf = leaves[index];

  const go = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(last, next));
      if (clamped === index) return;
      setDir(clamped > index ? 1 : -1);
      setIndex(clamped);
      setHalf(0);
    },
    [index, last]
  );

  const goNext = useCallback(() => {
    if (isDesktop) return go(index + 1);
    if (half === 0 && hasBack(leaf)) {
      setDir(1);
      setHalf(1);
      return;
    }
    if (index < last) {
      setDir(1);
      setIndex(index + 1);
      setHalf(0);
    }
  }, [isDesktop, go, index, half, leaf, last]);

  const goPrev = useCallback(() => {
    if (isDesktop) return go(index - 1);
    if (half === 1) {
      setDir(-1);
      setHalf(0);
      return;
    }
    if (index > 0) {
      const prev = leaves[index - 1];
      setDir(-1);
      setIndex(index - 1);
      setHalf(hasBack(prev) ? 1 : 0);
    }
  }, [isDesktop, go, index, half, leaves]);

  // On desktop a leaf is one spread, so the ends are just the ends. On mobile
  // the last leaf is not finished until its right-hand page has been seen.
  const atStart = index === 0 && (isDesktop || half === 0);
  const atEnd =
    index === last && (isDesktop || half === 1 || !hasBack(leaf));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault();
      if (e.key === 'ArrowRight') goNext();
      else goPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goNext, goPrev]);

  /* ---- swipe, phones only ----
   * Written by hand rather than with a drag wrapper: the instruction panels
   * are live WebGL canvases with their own pointer handling, and a drag layer
   * over the top swallows the spin gesture. A touch that starts on a canvas is
   * simply not treated as a page swipe. */
  const touch = useRef<{ x: number; y: number; ok: boolean } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    const onCanvas = !!(e.target as HTMLElement).closest?.('canvas');
    touch.current = { x: t.clientX, y: t.clientY, ok: !onCanvas };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touch.current;
    touch.current = null;
    if (!start || !start.ok || isDesktop) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    // Horizontal, decisive, and not really a scroll.
    if (Math.abs(dx) < 55 || Math.abs(dx) < Math.abs(dy) * 1.4) return;
    if (dx < 0) goNext();
    else goPrev();
  };

  const mobileNode = leaf.spread ?? (half === 0 ? leaf.front : leaf.back);
  const mobileSide: 'left' | 'right' | 'full' = leaf.spread
    ? 'full'
    : half === 0
    ? 'left'
    : 'right';

  return (
    <div
      ref={fsRef}
      className={
        immersive
          ? 'fixed inset-0 z-[60] flex w-full flex-col justify-center overflow-y-auto bg-royal-dark px-3 py-4'
          : 'w-full'
      }
    >
      <div className="mx-auto mb-2 flex w-full max-w-[1400px] justify-end">
        <button
          type="button"
          onClick={toggleFullscreen}
          aria-pressed={immersive}
          className="inline-flex items-center gap-1.5 rounded-lg border border-royal-cream/25 px-3 py-1.5 text-[13px] font-bold text-royal-cream/70 transition hover:border-royal-cream/50 hover:text-royal-cream"
        >
          {immersive ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          {immersive ? 'Exit full screen' : 'Full screen'}
        </button>
      </div>

      <div className="mx-auto flex w-full max-w-[1400px] items-center gap-3 md:gap-5">
        {/* Flanking arrows would eat a third of a phone's width, so they are
            desktop-only; the bar underneath drives the book on mobile. */}
        <div className="hidden md:block">
          <FlipButton dir="prev" onClick={goPrev} disabled={atStart} />
        </div>

        <div
          className={`relative w-full max-w-[1180px] flex-1 ${
            immersive
              ? 'h-[calc(100svh-160px)] md:h-[calc(100svh-150px)]'
              : 'h-[min(78svh,660px)] md:h-[770px]'
          }`}
          style={{ perspective: '2400px' }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <AnimatePresence initial={false} custom={dir}>
            {isDesktop ? (
              <motion.div
                key={leaf.id}
                custom={dir}
                initial={{ rotateY: dir * 38, opacity: 0, scale: 0.97 }}
                animate={{ rotateY: 0, opacity: 1, scale: 1 }}
                exit={{ rotateY: dir * -38, opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
                style={{ transformStyle: 'preserve-3d' }}
                className="absolute inset-0 grid grid-cols-2"
              >
                {leaf.spread ? (
                  <Sheet side="full">{leaf.spread}</Sheet>
                ) : (
                  <>
                    <Sheet side="left" page={index + 1}>{leaf.front}</Sheet>
                    <Sheet side="right" page={index + 1}>{leaf.back}</Sheet>
                  </>
                )}

                {/* spine. A full-width spread has no gutter. */}
                {!leaf.spread && (
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 left-1/2 z-20 w-14 -translate-x-1/2"
                    style={{
                      background:
                        'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.14) 40%, rgba(0,0,0,.24) 50%, rgba(0,0,0,.14) 60%, rgba(0,0,0,0) 100%)',
                    }}
                  />
                )}
              </motion.div>
            ) : (
              <motion.div
                key={`${leaf.id}-${half}`}
                custom={dir}
                initial={{ x: dir * 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: dir * -300, opacity: 0 }}
                transition={{ duration: 0.32, ease: [0.22, 0.61, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Sheet side={mobileSide} page={leaf.spread ? undefined : index + 1} scroll>
                  {mobileNode}
                </Sheet>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="hidden md:block">
          <FlipButton dir="next" onClick={goNext} disabled={atEnd} />
        </div>
      </div>

      {/* ---- mobile control bar ---- */}
      <div className="mx-auto mt-4 flex max-w-[1180px] items-center justify-between gap-3 md:hidden">
        <FlipButton dir="prev" onClick={goPrev} disabled={atStart} compact />
        <p className="min-w-0 flex-1 truncate text-center text-[13px] font-semibold text-royal-cream/70">
          {leaf.tab}
          {!leaf.spread && (
            <span className="text-royal-cream/40"> · {half === 0 ? 'left' : 'right'} page</span>
          )}
        </p>
        <FlipButton dir="next" onClick={goNext} disabled={atEnd} compact />
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
        Page {index + 1} of {leaves.length} · {leaf.tab}
        <span className="hidden sm:inline"> · you can also use the ← → keys</span>
        <span className="sm:hidden"> · swipe to turn</span>
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

/** Big page-turn control, sized for young hands. */
function FlipButton({
  dir,
  onClick,
  disabled,
  compact = false,
}: {
  dir: 'prev' | 'next';
  onClick: () => void;
  disabled: boolean;
  compact?: boolean;
}) {
  const Icon = dir === 'prev' ? ChevronLeft : ChevronRight;
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === 'prev' ? 'Previous page' : 'Next page'}
      className={`grid shrink-0 place-items-center rounded-full bg-royal-red text-white shadow-[0_6px_0_#8f1a26] transition hover:bg-[#e83346] active:translate-y-[3px] active:shadow-[0_3px_0_#8f1a26] disabled:pointer-events-none disabled:bg-royal-cream/15 disabled:shadow-none ${
        compact ? 'h-14 w-14' : 'h-16 w-16 md:h-20 md:w-20'
      }`}
    >
      <Icon className={compact ? 'h-7 w-7' : 'h-8 w-8 md:h-10 md:w-10'} strokeWidth={3} />
    </button>
  );
}

function Sheet({
  side,
  page,
  children,
  scroll = false,
}: {
  side: 'left' | 'right' | 'full';
  page?: number;
  children: ReactNode;
  /** Let a page scroll inside its sheet. Phones only, where a page that was
      laid out for a 770 px sheet has to live in rather less. */
  scroll?: boolean;
}) {
  const shape =
    side === 'full'
      ? 'rounded-xl'
      : side === 'left'
      ? 'rounded-xl md:rounded-l-xl md:rounded-r-none md:pr-10'
      : 'rounded-xl md:rounded-r-xl md:rounded-l-none md:pl-10';
  return (
    <div
      className={`relative h-full bg-[#FBF9F4] px-5 py-6 text-neutral-800 shadow-[0_18px_50px_rgba(0,0,0,.45)] ring-1 ring-black/10 sm:px-9 sm:py-7 ${
        scroll ? 'overflow-y-auto overscroll-contain' : 'overflow-hidden'
      } ${shape}`}
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
