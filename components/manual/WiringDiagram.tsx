"use client";

import { useState } from 'react';

const RED = '#D7262E';
const BLACK = '#1B1B1D';

/** The three wire runs, in the order the manual asks kids to make them. */
const WIRES = [
  { d: 'M144,132 L232,132 L232,58 L330,58', colour: RED, badge: { x: 232, y: 95, n: 1 } },
  { d: 'M480,88 L506,88 L506,212 L480,212', colour: BLACK, badge: { x: 506, y: 150, n: 2 } },
  { d: 'M330,250 L232,250 L232,166 L144,166', colour: BLACK, badge: { x: 232, y: 208, n: 3 } },
];

/**
 * The kit is one series loop:
 *   BATTERY red -> MOTOR red, MOTOR black -> SWITCH red, SWITCH black -> BATTERY black.
 * Each join is one orange lever connector. The switch here is live: flipping it
 * breaks the loop, exactly as it does on the real dog.
 */
export function WiringDiagram({ interactive = true }: { interactive?: boolean }) {
  const [on, setOn] = useState(true);

  return (
    <div className="w-full">
      <svg viewBox="0 0 560 300" className="w-full h-auto" role="img"
           aria-label="Power flow: battery to motor to switch and back to the battery.">
        <defs>
          <marker id="wa-red" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14"
                  refX="11" refY="7" orient="auto">
            <path d="M0,1 L13,7 L0,13 z" fill={RED} />
          </marker>
          <marker id="wa-black" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14"
                  refX="11" refY="7" orient="auto">
            <path d="M0,1 L13,7 L0,13 z" fill={BLACK} />
          </marker>
          {/* One bolt, reused along every wire. */}
          <symbol id="bolt" viewBox="0 0 24 24">
            <path d="M13 2 L5 13 h5 l-1 9 8-11 h-5 z" fill="#FFD429"
                  stroke="#8a6b00" strokeWidth="1.2" strokeLinejoin="round" />
          </symbol>
        </defs>

        {/* ---- battery ---- */}
        <rect x="26" y="112" width="118" height="72" rx="9" fill="#D9B44A" stroke="#8a7328" strokeWidth="2.5" />
        <text x="85" y="140" textAnchor="middle" fontSize="16" fontWeight="800" fill="#3a3007">3.7 V</text>
        <text x="85" y="162" textAnchor="middle" fontSize="13" fill="#3a3007">BATTERY</text>

        {/* ---- motor ---- */}
        <rect x="330" y="26" width="150" height="76" rx="9"
              fill={on ? '#F2C230' : '#E4DCC0'} stroke="#9c7c10" strokeWidth="2.5" />
        <text x="405" y="56" textAnchor="middle" fontSize="16" fontWeight="800" fill="#3a2f04">MOTOR</text>
        <text x="405" y="78" textAnchor="middle" fontSize="13" fill="#3a2f04">
          {on ? 'spinning!' : 'stopped'}
        </text>
        {on && (
          <g>
            <circle cx="405" cy="64" r="46" fill="none" stroke="#FFD429" strokeWidth="3" opacity="0.55">
              <animate attributeName="r" values="40;56;40" dur="1.6s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.55;0;0.55" dur="1.6s" repeatCount="indefinite" />
            </circle>
          </g>
        )}

        {/* ---- switch (clickable) ---- */}
        <g
          onClick={() => interactive && setOn((v) => !v)}
          style={{ cursor: interactive ? 'pointer' : 'default' }}
          role={interactive ? 'button' : undefined}
          aria-label={interactive ? `Switch is ${on ? 'on' : 'off'}, click to flip` : undefined}
        >
          <rect x="330" y="196" width="150" height="76" rx="9" fill="#1C1C1E" stroke="#000" strokeWidth="2.5" />
          <rect x={on ? 344 : 412} y="208" width="54" height="52" rx="6" fill={on ? '#3FA34D' : '#5A5A60'} />
          <text x={on ? 371 : 439} y="241" textAnchor="middle" fontSize="20" fontWeight="800" fill="#fff">
            {on ? 'I' : 'O'}
          </text>
          <text x="405" y="288" textAnchor="middle" fontSize="12" fontWeight="700" fill="#7d7d85">
            click the switch
          </text>
        </g>

        {/* ---- wires ---- */}
        {WIRES.map((w, i) => (
          <path key={i} d={w.d} fill="none" stroke={w.colour} strokeWidth="6"
                strokeLinecap="round" strokeLinejoin="round"
                markerEnd={`url(#wa-${w.colour === RED ? 'red' : 'black'})`}
                opacity={on ? 1 : 0.45} />
        ))}

        {/* ---- lightning bolts running the loop ---- */}
        {on &&
          WIRES.map((w, i) =>
            [0, 0.5].map((offset) => (
              <use key={`${i}-${offset}`} href="#bolt" width="20" height="20" x="-10" y="-10">
                <animateMotion
                  dur="2.4s"
                  begin={`${(i * 0.8 + offset * 2.4).toFixed(2)}s`}
                  repeatCount="indefinite"
                  path={w.d}
                  rotate="auto"
                />
              </use>
            ))
          )}

        {/* ---- connector badges ---- */}
        {WIRES.map((w) => (
          <g key={w.badge.n}>
            <rect x={w.badge.x - 17} y={w.badge.y - 13} width="34" height="26" rx="6"
                  fill="#F26722" stroke="#fff" strokeWidth="2.5" />
            <text x={w.badge.x} y={w.badge.y + 6} textAnchor="middle" fontSize="15"
                  fontWeight="800" fill="#fff">
              {w.badge.n}
            </text>
          </g>
        ))}
      </svg>

      <p className="mt-1 text-center text-[14px] font-bold text-neutral-600">
        {on
          ? 'Loop closed. Power reaches the motor.'
          : 'Loop broken. The power cannot get round.'}
      </p>
    </div>
  );
}

/** Compact legend listing the three connections in words. */
export function WiringList() {
  const rows = [
    { n: 1, a: 'BATTERY red', b: 'MOTOR red', ca: RED, cb: RED },
    { n: 2, a: 'MOTOR black', b: 'SWITCH red', ca: BLACK, cb: RED },
    { n: 3, a: 'SWITCH black', b: 'BATTERY black', ca: BLACK, cb: BLACK },
  ];
  return (
    <ul className="space-y-2">
      {rows.map((r) => (
        <li key={r.n} className="flex items-center gap-2.5 text-[15px]">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-[#F26722] text-[14px] font-black text-white">
            {r.n}
          </span>
          <span className="inline-flex items-center gap-1.5 font-bold">
            <i className="h-3 w-3 rounded-full" style={{ background: r.ca }} />
            {r.a}
          </span>
          <span className="text-neutral-400">→</span>
          <span className="inline-flex items-center gap-1.5 font-bold">
            <i className="h-3 w-3 rounded-full" style={{ background: r.cb }} />
            {r.b}
          </span>
        </li>
      ))}
    </ul>
  );
}
