"use client";

import { useState } from 'react';

const RED = '#D7262E';
const BLACK = '#1B1B1D';
const ORANGE = '#F26722';

/**
 * The kit is one series loop:
 *   BATTERY red -> MOTOR red, MOTOR black -> SWITCH red, SWITCH black -> BATTERY black.
 *
 * Every part has exactly two leads, and which of its two leads goes where is
 * the thing a child gets wrong, so each run is drawn from a named lead stub on
 * one part to a named lead stub on the other, with the orange connector that
 * joins them sitting on the join.
 */
interface Run {
  n: number;
  from: string;
  to: string;
  colourFrom: string;
  colourTo: string;
  /** Path from the source lead tip to the connector. */
  inPath: string;
  /** Path from the connector on to the destination lead tip. */
  outPath: string;
  join: { x: number; y: number };
}

const RUNS: Run[] = [
  {
    n: 1,
    from: 'BATTERY red',
    to: 'MOTOR red',
    colourFrom: RED,
    colourTo: RED,
    inPath: 'M168,150 L232,150 L232,80',
    outPath: 'M232,56 L232,44 L338,44',
    join: { x: 232, y: 68 },
  },
  {
    n: 2,
    from: 'MOTOR black',
    to: 'SWITCH red',
    colourFrom: BLACK,
    colourTo: RED,
    inPath: 'M498,96 L546,96 L546,178',
    outPath: 'M546,202 L546,258 L498,258',
    join: { x: 546, y: 190 },
  },
  {
    n: 3,
    from: 'SWITCH black',
    to: 'BATTERY black',
    colourFrom: BLACK,
    colourTo: BLACK,
    inPath: 'M338,300 L232,300 L232,266',
    outPath: 'M232,242 L232,186 L168,186',
    join: { x: 232, y: 254 },
  },
];

/**
 * A named lead sprouting from a part: a coloured stub on the part's edge plus
 * the colour word beside it. The label is placed by hand per lead, because the
 * only thing that matters here is that "red" sits unambiguously next to the
 * red wire and never on top of another run.
 */
function Lead({
  x,
  y,
  colour,
  label,
  dx,
  dy,
  anchor = 'start',
}: {
  x: number;
  y: number;
  colour: string;
  label: string;
  dx: number;
  dy: number;
  anchor?: 'start' | 'end';
}) {
  return (
    <g>
      <circle cx={x} cy={y} r="7.5" fill={colour} stroke="#fff" strokeWidth="2.5" />
      <text x={x + dx} y={y + dy} textAnchor={anchor} fontSize="12.5" fontWeight="800"
            fill={colour === RED ? '#A3151C' : '#2A2A2E'}>
        {label}
      </text>
    </g>
  );
}

/**
 * Power-flow diagram with a live switch and a motor whose shaft actually turns.
 * Flipping the switch breaks the loop, exactly as it does on the real dog.
 */
export function WiringDiagram({ interactive = true }: { interactive?: boolean }) {
  const [on, setOn] = useState(true);

  return (
    <div className="w-full">
      <svg viewBox="0 0 620 350" className="h-auto w-full" role="img"
           aria-label="Power flow: battery red to motor red, motor black to switch red, switch black back to the battery.">
        <defs>
          <marker id="wa-red" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14"
                  refX="11" refY="7" orient="auto">
            <path d="M0,1 L13,7 L0,13 z" fill={RED} />
          </marker>
          <marker id="wa-black" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14"
                  refX="11" refY="7" orient="auto">
            <path d="M0,1 L13,7 L0,13 z" fill={BLACK} />
          </marker>
          <symbol id="bolt" viewBox="0 0 24 24">
            <path d="M13 2 L5 13 h5 l-1 9 8-11 h-5 z" fill="#FFD429"
                  stroke="#8a6b00" strokeWidth="1.2" strokeLinejoin="round" />
          </symbol>
        </defs>

        {/* ================= wires ================= */}
        {RUNS.map((r) => (
          <g key={r.n} opacity={on ? 1 : 0.4}>
            <path d={r.inPath} fill="none" stroke={r.colourFrom} strokeWidth="6.5"
                  strokeLinecap="round" strokeLinejoin="round" />
            <path d={r.outPath} fill="none" stroke={r.colourTo} strokeWidth="6.5"
                  strokeLinecap="round" strokeLinejoin="round"
                  markerEnd={`url(#wa-${r.colourTo === RED ? 'red' : 'black'})`} />
          </g>
        ))}

        {/* charge running the loop, only while it is closed */}
        {on &&
          RUNS.map((r) =>
            [0, 0.5].map((offset) => (
              <use key={`${r.n}-${offset}`} href="#bolt" width="19" height="19" x="-9.5" y="-9.5">
                <animateMotion dur="2.4s" begin={`${(r.n * 0.75 + offset * 2.4).toFixed(2)}s`}
                               repeatCount="indefinite" path={`${r.inPath} ${r.outPath}`}
                               rotate="auto" />
              </use>
            ))
          )}

        {/* ================= battery ================= */}
        <rect x="34" y="120" width="134" height="96" rx="10"
              fill="#D9B44A" stroke="#8a7328" strokeWidth="2.5" />
        <rect x="46" y="134" width="110" height="34" rx="5" fill="#F6F5F1" />
        <text x="101" y="158" textAnchor="middle" fontSize="17" fontWeight="900" fill="#3a3007">3.7 V</text>
        <text x="101" y="196" textAnchor="middle" fontSize="13" fontWeight="800" fill="#3a3007">BATTERY</text>
        <Lead x={168} y={150} colour={RED} label="red" dx={8} dy={-12} />
        <Lead x={168} y={186} colour={BLACK} label="black" dx={8} dy={-12} />

        {/* ================= motor ================= */}
        <g>
          <rect x="338" y="18" width="160" height="100" rx="10"
                fill={on ? '#F2C230' : '#E6DFC6'} stroke="#9c7c10" strokeWidth="2.5" />
          <text x="418" y="46" textAnchor="middle" fontSize="16" fontWeight="900" fill="#3a2f04">MOTOR</text>
          <text x="418" y="108" textAnchor="middle" fontSize="12.5" fontWeight="800" fill="#3a2f04">
            {on ? 'shaft spinning' : 'shaft stopped'}
          </text>

          {/* the output shaft, drawn as a hub with spokes so its turn is visible */}
          <circle cx="418" cy="72" r="25" fill="#8F949B" stroke="#5d6168" strokeWidth="2.5" />
          <g>
            <g>
              <line x1="418" y1="52" x2="418" y2="92" stroke="#E4E7EB" strokeWidth="4" strokeLinecap="round" />
              <line x1="398" y1="72" x2="438" y2="72" stroke="#E4E7EB" strokeWidth="4" strokeLinecap="round" />
              <circle cx="418" cy="58" r="4.5" fill="#D72638" />
              {on && (
                <animateTransform attributeName="transform" type="rotate"
                                  from="0 418 72" to="360 418 72" dur="0.9s"
                                  repeatCount="indefinite" />
              )}
            </g>
          </g>
          <circle cx="418" cy="72" r="7" fill="#5d6168" />
        </g>
        <Lead x={338} y={44} colour={RED} label="red" dx={10} dy={-11} />
        <Lead x={498} y={96} colour={BLACK} label="black" dx={10} dy={-11} />

        {/* ================= switch (clickable) ================= */}
        <g
          onClick={() => interactive && setOn((v) => !v)}
          style={{ cursor: interactive ? 'pointer' : 'default' }}
          role={interactive ? 'button' : undefined}
          aria-label={interactive ? `Switch is ${on ? 'on' : 'off'}, click to flip` : undefined}
        >
          <rect x="338" y="232" width="160" height="90" rx="10"
                fill="#1C1C1E" stroke="#000" strokeWidth="2.5" />
          <rect x={on ? 352 : 420} y="246" width="62" height="62" rx="7"
                fill={on ? '#3FA34D' : '#5A5A60'} />
          <text x={on ? 383 : 451} y="288" textAnchor="middle" fontSize="24" fontWeight="900" fill="#fff">
            {on ? 'I' : 'O'}
          </text>
          <text x="418" y="340" textAnchor="middle" fontSize="12.5" fontWeight="800" fill="#8a8a92">
            click the switch
          </text>
        </g>
        <Lead x={498} y={258} colour={RED} label="red" dx={10} dy={-11} />
        <Lead x={338} y={300} colour={BLACK} label="black" dx={-10} dy={-11} anchor="end" />

        {/* ================= connectors ================= */}
        {RUNS.map((r) => (
          <g key={`c${r.n}`}>
            <rect x={r.join.x - 19} y={r.join.y - 14} width="38" height="28" rx="7"
                  fill={ORANGE} stroke="#fff" strokeWidth="2.5" />
            <text x={r.join.x} y={r.join.y + 7} textAnchor="middle" fontSize="16"
                  fontWeight="900" fill="#fff">
              {r.n}
            </text>
          </g>
        ))}
      </svg>

      <div className="mt-1 flex items-center justify-center gap-2 rounded-xl border-2 border-[#F26722]/50 bg-[#F26722]/10 px-3 py-1.5">
        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-[#F26722] text-[13px] font-black text-white">
          1
        </span>
        <p className="text-[13.5px] font-bold leading-snug text-neutral-700">
          Each orange square is one <strong>lever connector</strong>. Squares
          <strong> 1</strong>, <strong>2</strong> and <strong>3</strong> are the same three
          joins as the list on the page opposite.
        </p>
      </div>

      <p className="mt-1 text-center text-[14px] font-bold text-neutral-600">
        {on
          ? 'Loop closed. Power reaches the motor and the shaft turns.'
          : 'Loop broken at the switch. The shaft stops.'}
      </p>
    </div>
  );
}

/**
 * The fix for a dog that walks the wrong way: the battery's two leads change
 * places, so the current runs through the motor the other way. Nothing else in
 * the loop moves, which is why only the two battery ends are called out.
 */
export function ReversedWiringList() {
  const rows = [
    { n: 1, a: 'BATTERY black', b: 'MOTOR red', ca: BLACK, cb: RED, changed: true },
    { n: 2, a: 'MOTOR black', b: 'SWITCH red', ca: BLACK, cb: RED, changed: false },
    { n: 3, a: 'SWITCH black', b: 'BATTERY red', ca: BLACK, cb: RED, changed: true },
  ];
  return (
    <ul className="space-y-1.5">
      {rows.map((r) => (
        <li
          key={r.n}
          className={`flex items-center gap-2 rounded-lg px-1.5 py-1 text-[14px] ${
            r.changed ? 'bg-[#FFF3C4]' : ''
          }`}
        >
          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-[#F26722] text-[13px] font-black text-white">
            {r.n}
          </span>
          <span className="inline-flex items-center gap-1.5 font-bold">
            <i className="h-2.5 w-2.5 rounded-full" style={{ background: r.ca }} />
            {r.a}
          </span>
          <span className="text-neutral-400">&rarr;</span>
          <span className="inline-flex items-center gap-1.5 font-bold">
            <i className="h-2.5 w-2.5 rounded-full" style={{ background: r.cb }} />
            {r.b}
          </span>
          {r.changed && (
            <span className="ml-auto shrink-0 text-[11px] font-black uppercase tracking-wide text-[#9c6a00]">
              swapped
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

/** Compact legend listing the three connections in words. */
export function WiringList() {
  return (
    <ul className="space-y-2">
      {RUNS.map((r) => (
        <li key={r.n} className="flex items-center gap-2.5 text-[15px]">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-[#F26722] text-[14px] font-black text-white">
            {r.n}
          </span>
          <span className="inline-flex items-center gap-1.5 font-bold">
            <i className="h-3 w-3 rounded-full" style={{ background: r.colourFrom }} />
            {r.from}
          </span>
          <span className="text-neutral-400">→</span>
          <span className="inline-flex items-center gap-1.5 font-bold">
            <i className="h-3 w-3 rounded-full" style={{ background: r.colourTo }} />
            {r.to}
          </span>
        </li>
      ))}
    </ul>
  );
}
