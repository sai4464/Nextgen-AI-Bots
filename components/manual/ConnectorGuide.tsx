"use client";

import { useEffect, useState } from 'react';
import { RotateCcw } from 'lucide-react';

const ORANGE = '#F26722';
const ORANGE_DEEP = '#C44E12';
const RED = '#D7262E';
const CLEAR = '#E3EDF3';
const METAL = '#B7C0C8';
const COPPER = '#C8823C';

export type ConnectorVariant = 'v1' | 'v2';

/**
 * The four beats of using a 1-to-1 connector. Both variants share them; only
 * the way the orange part moves differs, which is the whole reason the V1/V2
 * switch exists.
 */
const PHASES = [
  { label: 'Start closed', hint: 'Every orange lever is lying flat. Nothing is gripped yet.' },
  { label: 'Open it', hint: 'Lift every orange lever all the way up until it stops.' },
  { label: 'Push the wire in', hint: 'Bare copper all the way in, until the coloured jacket touches the hole.' },
  { label: 'Close it', hint: 'Levers back down. Then tug each wire. If one slides out, do it again.' },
] as const;

const VARIANT_COPY: Record<ConnectorVariant, { name: string; open: string }> = {
  v1: {
    name: 'Two ends, facing opposite ways',
    open: 'Each end has its own lever and takes its own wire. The two wires come in from opposite sides and meet at the barrier in the middle.',
  },
  v2: {
    name: 'Two levers, both wires the same side',
    open: 'Both wires go into the same face, one per hole, and each hole has its own lever. Never put two wires in one hole.',
  },
};

/* ------------------------------------------------------------------ *
 * V1: the straight-through connector                                   *
 * ------------------------------------------------------------------ *
 * Two ends that face OPPOSITE ways, each with its own lever and its own
 * wire, meeting in the middle of the clip. Drawn from the side and fully
 * symmetric about the centre line, so it reads as a two-ended part
 * rather than one working end with a wire already stuck in the back.
 *
 * The left half is the right half under `translate(480,0) scale(-1,1)`.
 * Mirroring the whole port rather than writing a second set of numbers
 * is what guarantees the two ends stay exact opposites: the lever swings
 * the other way and the wire drives in from the other side for free.
 */

/** Centre line of the V1 figure; the mirror doubles it. */
const V1_MID = 240;
/** How far outboard a wire is parked before it is pushed home. */
const V1_PARK = 112;

function V1Port({
  mirror,
  open,
  clamped,
  seated,
  colour,
  phase,
}: {
  mirror: boolean;
  open: boolean;
  clamped: boolean;
  seated: boolean;
  colour: string;
  phase: number;
}) {
  const offset = seated ? 0 : V1_PARK;
  return (
    <g transform={mirror ? `translate(${V1_MID * 2},0) scale(-1,1)` : undefined}>
      {/* ---- the wire for this end ---- */}
      <g style={{ transform: `translateX(${offset}px)`, transition: 'transform 700ms ease-in-out' }}>
        <rect x="248" y="156" width="70" height="12" rx="5" fill={COPPER} />
        <rect x="318" y="152" width="155" height="20" rx="9" fill={colour} />
        <rect x="318" y="155" width="155" height="5" rx="2.5" fill="#FFFFFF" opacity="0.3" />
      </g>

      {/* ---- the metal cage this end clamps into ---- */}
      <rect x="252" y="146" width="72" height="36" rx="5" fill="none"
            stroke={METAL} strokeWidth="5" />
      <rect x="262" y={clamped ? 152 : 146} width="52" height="9" rx="4" fill={METAL}
            style={{ transition: 'y 450ms ease-out' }} />

      {/* ---- this end's orange lever, hinged at the outer corner ---- */}
      <g
        style={{
          transform: `rotate(${open ? 105 : 5}deg)`,
          transformOrigin: '336px 112px',
          transition: 'transform 650ms cubic-bezier(.4,1.3,.5,1)',
        }}
      >
        <rect x="252" y="78" width="88" height="32" rx="9"
              fill="url(#cg-orange)" stroke={ORANGE_DEEP} strokeWidth="2.5" />
        <line x1="272" y1="86" x2="272" y2="102" stroke={ORANGE_DEEP} strokeWidth="3" />
        <line x1="292" y1="86" x2="292" y2="102" stroke={ORANGE_DEEP} strokeWidth="3" />
        <line x1="312" y1="86" x2="312" y2="102" stroke={ORANGE_DEEP} strokeWidth="3" />
        <circle cx="336" cy="112" r="7" fill={ORANGE_DEEP} />
      </g>

      {/* ---- what to do at this end, right now ---- */}
      {phase === 1 && (
        <path d="M370,118 L370,66" stroke={RED} strokeWidth="7" strokeLinecap="round"
              markerEnd="url(#cg-arrow)" />
      )}
      {phase === 2 && (
        <path d="M452,200 L362,200" stroke={RED} strokeWidth="7" strokeLinecap="round"
              markerEnd="url(#cg-arrow)" />
      )}
      {phase === 3 && (
        <path d="M370,66 L370,118" stroke={RED} strokeWidth="7" strokeLinecap="round"
              markerEnd="url(#cg-arrow)" />
      )}
    </g>
  );
}

function FigureV1({ phase }: { phase: number }) {
  const open = phase === 1 || phase === 2;
  const clamped = phase === 3;
  const seated = phase >= 2;

  return (
    <svg viewBox="0 0 480 265" className="h-auto w-full" role="img"
         aria-label={`Straight-through connector, both ends, ${PHASES[phase].label}`}>
      <defs>
        <linearGradient id="cg-clear" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F4FAFD" />
          <stop offset="100%" stopColor={CLEAR} />
        </linearGradient>
        <linearGradient id="cg-orange" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FF8C3F" />
          <stop offset="100%" stopColor={ORANGE} />
        </linearGradient>
        <marker id="cg-arrow" markerUnits="userSpaceOnUse" markerWidth="18" markerHeight="18"
                refX="13" refY="9" orient="auto">
          <path d="M0,1 L17,9 L0,17 z" fill={RED} />
        </marker>
      </defs>

      {/* ---------- one clear housing spanning both ends ---------- */}
      <rect x="140" y="108" width="200" height="104" rx="14"
            fill="url(#cg-clear)" stroke="#7E8B95" strokeWidth="3" />
      {/* the barrier down the middle: this is where the two wires meet */}
      <line x1={V1_MID} y1="114" x2={V1_MID} y2="206" stroke="#A9B6BF" strokeWidth="2.5"
            strokeDasharray="6 5" />
      <rect x="150" y="118" width="46" height="22" rx="6" fill="#FFFFFF" opacity="0.5" />

      {/* ---------- the two ends, facing opposite ways ---------- */}
      <V1Port mirror={false} open={open} clamped={clamped} seated={seated}
              colour={RED} phase={phase} />
      <V1Port mirror open={open} clamped={clamped} seated={seated}
              colour="#1B1B1D" phase={phase} />

      {/* ---------- say plainly that the ends face opposite ways ---------- */}
      <text x={V1_MID} y="240" textAnchor="middle" fontSize="13.5" fontWeight="800"
            fill="#5c6670">
        one wire in each end, facing opposite ways
      </text>
      <path d="M196,252 L150,252" stroke="#8d979f" strokeWidth="3.5" strokeLinecap="round"
            markerEnd="url(#cg-arrow-grey)" />
      <path d="M284,252 L330,252" stroke="#8d979f" strokeWidth="3.5" strokeLinecap="round"
            markerEnd="url(#cg-arrow-grey)" />
      <defs>
        <marker id="cg-arrow-grey" markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="12"
                refX="9" refY="6" orient="auto">
          <path d="M0,1 L11,6 L0,11 z" fill="#8d979f" />
        </marker>
      </defs>
    </svg>
  );
}

/* ------------------------------------------------------------------ *
 * V2: the two-port connector                                           *
 * ------------------------------------------------------------------ *
 * Two levers instead of one, and both wires go into the SAME face, one
 * per hole, rather than meeting head-on from opposite ends. Drawn
 * isometric, because the levers lift out of the top face and a flat top
 * view would show that movement as nothing at all.
 */

/** Body of the connector, in its own millimetre-ish model space. */
const V2 = { W: 130, D: 150, H: 64 };
/** Where the two ports sit across the body, and how deep a wire goes. */
const PORTS = [
  { cx: 32, colour: RED, label: 'red' },
  { cx: 98, colour: '#1B1B1D', label: 'black' },
];
const SEATED_TIP = 54;
const PARKED_OFFSET = 180;
const COPPER_LEN = V2.D - SEATED_TIP;
const JACKET_LEN = 110;
/** Lever hinge line and arm length, on the top face. */
const HINGE_Y = 108;
const ARM = 74;

const ISO = { ox: 300, oy: 90, c: 0.866, s: 0.5 };
const ix = (x: number, y: number) => ISO.ox + (x - y) * ISO.c;
const iy = (x: number, y: number, z: number) => ISO.oy + (x + y) * ISO.s - z;
/** One 3D point as an SVG polygon vertex. */
const pt = (x: number, y: number, z: number) => `${ix(x, y).toFixed(1)},${iy(x, y, z).toFixed(1)}`;
const poly = (ps: [number, number, number][]) => ps.map((p) => pt(...p)).join(' ');

function FigureV2({ phase }: { phase: number }) {
  const open = phase === 1 || phase === 2;
  // Levers swing up and slightly back past vertical, the way a real one does.
  const theta = ((open ? 100 : 4) * Math.PI) / 180;
  const tipY = HINGE_Y - ARM * Math.cos(theta);
  const tipZ = V2.H + ARM * Math.sin(theta);

  // Wires are parked outside the face until phase 2, then driven home.
  const tip = phase >= 2 ? SEATED_TIP : SEATED_TIP + PARKED_OFFSET;
  const seam = tip + COPPER_LEN;

  const { W, D, H } = V2;

  return (
    <svg viewBox="0 0 470 300" className="h-auto w-full" role="img"
         aria-label={`Two-port connector, ${PHASES[phase].label}`}>
      <defs>
        <linearGradient id="cg2-orange" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FF9A52" />
          <stop offset="100%" stopColor={ORANGE} />
        </linearGradient>
      </defs>

      {/* ---- the two wires, drawn before the shell so the plastic covers them ---- */}
      {PORTS.map((p) => (
        <g key={`w${p.cx}`}
           style={{ transition: 'opacity 300ms' }}>
          <line
            x1={ix(p.cx, tip)} y1={iy(p.cx, tip, 32)}
            x2={ix(p.cx, seam)} y2={iy(p.cx, seam, 32)}
            stroke={COPPER} strokeWidth="11" strokeLinecap="round"
            style={{ transition: 'all 700ms ease-in-out' }}
          />
          <line
            x1={ix(p.cx, seam)} y1={iy(p.cx, seam, 32)}
            x2={ix(p.cx, seam + JACKET_LEN)} y2={iy(p.cx, seam + JACKET_LEN, 32)}
            stroke={p.colour} strokeWidth="17" strokeLinecap="round"
            style={{ transition: 'all 700ms ease-in-out' }}
          />
        </g>
      ))}

      {/* ---- shell: top face, right face, then the face the wires go into ---- */}
      <polygon points={poly([[0, 0, H], [W, 0, H], [W, D, H], [0, D, H]])}
               fill="#EAF3F8" fillOpacity="0.78" stroke="#7E8B95" strokeWidth="2.5" />
      <polygon points={poly([[W, 0, 0], [W, 0, H], [W, D, H], [W, D, 0]])}
               fill="#D3E2EB" fillOpacity="0.72" stroke="#7E8B95" strokeWidth="2.5" />
      <polygon points={poly([[0, D, 0], [0, D, H], [W, D, H], [W, D, 0]])}
               fill="#DCE9F0" fillOpacity="0.66" stroke="#7E8B95" strokeWidth="2.5" />

      {/* ---- the two entry holes, on the one face ---- */}
      {PORTS.map((p) => (
        <ellipse key={`h${p.cx}`}
                 cx={ix(p.cx, D)} cy={iy(p.cx, D, 32)} rx="12" ry="9"
                 transform={`rotate(-30 ${ix(p.cx, D)} ${iy(p.cx, D, 32)})`}
                 fill="#2C3A44" fillOpacity="0.55" stroke="#61707B" strokeWidth="2" />
      ))}

      {/* ---- the two orange levers ---- */}
      {PORTS.map((p) => {
        const x0 = p.cx - 26;
        const x1 = p.cx + 26;
        return (
          <g key={`l${p.cx}`} style={{ transition: 'all 650ms cubic-bezier(.4,1.3,.5,1)' }}>
            <polygon
              points={poly([
                [x0, HINGE_Y, H], [x1, HINGE_Y, H],
                [x1, tipY, tipZ], [x0, tipY, tipZ],
              ])}
              fill="url(#cg2-orange)" stroke={ORANGE_DEEP} strokeWidth="2.5"
              strokeLinejoin="round"
              style={{ transition: 'all 650ms cubic-bezier(.4,1.3,.5,1)' }}
            />
            {/* hinge knuckle */}
            <ellipse cx={ix(p.cx, HINGE_Y)} cy={iy(p.cx, HINGE_Y, H)} rx="9" ry="6"
                     transform={`rotate(-30 ${ix(p.cx, HINGE_Y)} ${iy(p.cx, HINGE_Y, H)})`}
                     fill={ORANGE_DEEP} />
          </g>
        );
      })}

      {/* ---- labels, so it is obvious the two holes take different wires ---- */}
      {PORTS.map((p) => (
        <text key={`t${p.cx}`}
              x={ix(p.cx, D + PARKED_OFFSET + 40)}
              y={iy(p.cx, D + PARKED_OFFSET + 40, 32)}
              textAnchor="middle" fontSize="13" fontWeight="800" fill={p.colour}>
          {p.label}
        </text>
      ))}

      {/* ---- the prompt arrow for this phase ---- */}
      {phase === 1 && (
        <path d={`M${ix(65, HINGE_Y - 90)},${iy(65, HINGE_Y - 90, H + 20)} L${ix(65, HINGE_Y - 90)},${iy(65, HINGE_Y - 90, H + 96)}`}
              stroke={RED} strokeWidth="7" strokeLinecap="round" markerEnd="url(#cg-arrow2)" />
      )}
      {phase === 2 && (
        <path d={`M${ix(65, D + 150)},${iy(65, D + 150, 74)} L${ix(65, D + 44)},${iy(65, D + 44, 74)}`}
              stroke={RED} strokeWidth="7" strokeLinecap="round" markerEnd="url(#cg-arrow2)" />
      )}
      {phase === 3 && (
        <path d={`M${ix(65, HINGE_Y - 90)},${iy(65, HINGE_Y - 90, H + 96)} L${ix(65, HINGE_Y - 90)},${iy(65, HINGE_Y - 90, H + 20)}`}
              stroke={RED} strokeWidth="7" strokeLinecap="round" markerEnd="url(#cg-arrow2)" />
      )}

      <defs>
        <marker id="cg-arrow2" markerUnits="userSpaceOnUse" markerWidth="18" markerHeight="18"
                refX="13" refY="9" orient="auto">
          <path d="M0,1 L17,9 L0,17 z" fill={RED} />
        </marker>
      </defs>
    </svg>
  );
}

/**
 * The full 1-to-1 connector walkthrough, with the V1 / V2 switch for the two
 * lever shapes that ship in the kit. Kids get whichever one is in the box, and
 * a diagram of the wrong one is worse than no diagram at all.
 */
export function ConnectorGuide() {
  const [variant, setVariant] = useState<ConnectorVariant>('v1');
  const [phase, setPhase] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => setPhase((p) => (p + 1) % PHASES.length), 2200);
    return () => clearTimeout(t);
  }, [phase, playing]);

  return (
    <div className="flex h-full min-h-0 flex-col">
      {/* ---- variant switch ---- */}
      <div className="flex items-center gap-2">
        {(['v1', 'v2'] as const).map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setVariant(v)}
            aria-pressed={variant === v}
            className={`rounded-xl border-[3px] px-5 py-1.5 text-[17px] font-black uppercase tracking-wide transition ${
              variant === v
                ? 'border-neutral-900 bg-[#F26722] text-white shadow-[0_3px_0_#8f3a0c]'
                : 'border-neutral-300 bg-white text-neutral-500 hover:border-neutral-500'
            }`}
          >
            {v}
          </button>
        ))}
        <span className="ml-1 text-[14px] font-bold text-neutral-500">
          {VARIANT_COPY[variant].name}
        </span>
      </div>

      <p className="mt-2 text-[15.5px] font-extrabold text-[#D72638]/70">
        Does your orange connector look different? Click V2!
      </p>

      {/* ---- the animation ---- */}
      <div className="mt-2 rounded-2xl border-[3px] border-neutral-900/85 bg-white/60 p-2.5">
        {variant === 'v1' ? <FigureV1 phase={phase} /> : <FigureV2 phase={phase} />}
      </div>

      {/* ---- phase scrubber ---- */}
      <div className="mt-2 flex items-center gap-1.5">
        {PHASES.map((ph, i) => (
          <button
            key={ph.label}
            type="button"
            onClick={() => {
              setPlaying(false);
              setPhase(i);
            }}
            className={`flex-1 rounded-lg border-2 px-1 py-1 text-[12.5px] font-extrabold transition ${
              phase === i
                ? 'border-neutral-900 bg-neutral-900 text-white'
                : 'border-neutral-300 bg-white text-neutral-500'
            }`}
          >
            {i + 1}. {ph.label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => {
            setPhase(0);
            setPlaying(true);
          }}
          aria-label="Play the whole thing again"
          className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border-2 border-neutral-300 bg-white text-neutral-600"
        >
          <RotateCcw size={15} />
        </button>
      </div>

      <p className="mt-2 text-[16px] font-semibold leading-snug text-neutral-700">
        {PHASES[phase].hint}
      </p>
      <p className="mt-1 text-[14.5px] leading-snug text-neutral-500">
        {VARIANT_COPY[variant].open}
      </p>
    </div>
  );
}
