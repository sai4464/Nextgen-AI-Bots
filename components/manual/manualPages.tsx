"use client";

import { useCallback, useState } from 'react';
import { PRINTED_PARTS, ELECTRONIC_PARTS, partById } from '@/lib/kit-parts';
import { BookLeaf } from './FlipBook';
import { Viewer3D } from './Viewer3D';
import { AssemblyView, ViewAxis } from './AssemblyView';
import { Confetti } from './Confetti';
import { builtThrough, builtBefore, addedAt, stepSide, STEP } from '@/lib/robo-dog-steps';
import type { Instance } from '@/lib/robo-dog-steps';
import { WiringDiagram, WiringList } from './WiringDiagram';
import { PageHeader, PartsCallout, Caution, Steps, SafetyGrid } from './PageParts';

const p = partById;

/** Which procedural model stands in for each electronic part. */
const ELECTRONIC_VIEW: Record<string, 'motor' | 'battery' | 'switch' | 'connector'> = {
  motor: 'motor',
  battery: 'battery',
  switch: 'switch',
  connector: 'connector',
};

/* ------------------------------------------------------------------ *
 * Shared page furniture                                                *
 * ------------------------------------------------------------------ */

/**
 * Groups the parts a step adds into one panel per kind, so "short leg x2, nut
 * x2" becomes two figures rather than four. Identical parts going into
 * identical holes teach nothing extra by being drawn twice.
 *
 * Order matters: the panels are read as a sequence, and each one shows the
 * previous panels' parts already fitted, so the grouping has to follow the
 * order the parts actually go on. `addedAt` is already in that order.
 */
function groupForPlacement(step: number) {
  const groups = new Map<string, Instance[]>();
  for (const inst of addedAt(step)) {
    // The lower body is the thing everything else goes onto, not a part being
    // placed, so it gets no figure of its own and no arrow.
    if (inst.key === 'body') continue;
    const kind = inst.stl ?? inst.builder ?? inst.key;
    const list = groups.get(kind);
    if (list) list.push(inst);
    else groups.set(kind, [inst]);
  }
  return Array.from(groups.values());
}

const STL_PATH = {
  screw: '/kit/stl/Screws-4X.stl',
  nut: '/kit/stl/Nut-10X.stl',
  longLeg: '/kit/stl/longLeg-4X.stl',
};

/**
 * Picks the camera station, and how close to sit, for one panel.
 *
 * The nuts do up underneath the joint, so they get the view from below and the
 * badge telling a child to turn the dog over first. A long leg lands in two
 * places at once, so it gets a high three-quarter view where the spacer holes
 * and the spindle pin are all visible at the same time, and sits closer in.
 * Everything else uses the three-quarter view people already know how to read
 * from LEGO instructions, or a side view when the part drops straight in.
 */
function stationFor(group: Instance[]): {
  axis: ViewAxis;
  flip: boolean;
  zoom: number;
} {
  const stl = group[0].stl;
  if (stl === STL_PATH.nut) return { axis: 'bottom', flip: true, zoom: 1 };
  if (stl === STL_PATH.longLeg) return { axis: 'topSide', flip: false, zoom: 0.82 };
  if (stl === STL_PATH.screw) return { axis: 'iso', flip: false, zoom: 1 };

  const [ax, ay, az] = group[0].anim.from.map(Math.abs);
  if (az > ax && az > ay) return { axis: 'side', flip: false, zoom: 1 };
  if (ay > ax && ay > az) return { axis: 'side', flip: false, zoom: 1 };
  return { axis: 'iso', flip: false, zoom: 1 };
}

/**
 * Left page: the step broken into its own little sequence, one still figure
 * per part, each zoomed onto its own hole with a red arrow pointing it home.
 *
 * The figures build on each other. Panel 1 shows only the spacers going in;
 * panel 2 shows those spacers already fitted and the long legs arriving. A
 * part from a later panel is not drawn at all, so a child is never looking at
 * a picture containing something they have not been told to fit yet.
 */
function PlacementStrip({ step }: { step: number }) {
  const groups = groupForPlacement(step);
  if (groups.length === 0) return null;

  const before = builtBefore(step);
  const one = groups.length === 1;
  const rows = groups.length <= 2 ? 'grid-rows-1' : 'grid-rows-2';

  return (
    <div
      className={`mt-2 grid min-h-0 flex-1 gap-2 ${rows} ${
        one ? 'grid-cols-1' : 'grid-cols-2'
      }`}
    >
      {groups.map((group, i) => {
        const { axis, flip, zoom } = stationFor(group);
        // Everything from the earlier panels is already on the dog.
        const fitted = before.concat(...groups.slice(0, i));
        return (
          <div
            key={group[0].key}
            className="relative min-h-0 overflow-hidden rounded-xl border-[3px] border-neutral-900/85 bg-white/50"
          >
            <AssemblyView
              settled={fitted}
              animating={group}
              focus={group}
              staticPose
              interactive={false}
              explode={0.95}
              viewAxis={axis}
              zoom={zoom}
              viewSide={group[0].side ?? stepSide(step)}
            />
            <span className="absolute bottom-1.5 left-2 grid h-[22px] w-[22px] place-items-center rounded-full bg-neutral-900 text-[13px] font-black text-white">
              {i + 1}
            </span>
            {flip && (
              <span className="absolute right-2 top-1.5 rounded-md bg-[#D72638] px-1.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-white">
                Flip it over
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

/** Right page: the move itself, played slowly, replayable, and draggable. */
function InstructionPanel({
  step,
  caption,
  tall = false,
}: {
  step: number;
  caption: string;
  tall?: boolean;
}) {
  const [token, setToken] = useState(0);
  const replay = useCallback(() => setToken((t) => t + 1), []);
  return (
    <div className="flex h-full flex-col">
      <p className="mb-2 text-[13px] font-extrabold uppercase tracking-[0.14em] text-[#D72638]">
        Watch how to do it
      </p>
      <div
        className={`${tall ? 'h-[600px]' : 'h-[560px]'} rounded-2xl border-[3px] border-neutral-900/85 bg-white/50`}
      >
        <AssemblyView
          settled={builtBefore(step)}
          animating={addedAt(step)}
          playToken={token}
          showReplay
          onReplay={replay}
          viewSide={stepSide(step)}
        />
      </div>
      <p className="mt-2.5 text-[15px] font-semibold leading-snug text-neutral-700">{caption}</p>
    </div>
  );
}

const TIGHTEN = (
  <>
    Turn it until it <strong>stops turning</strong>. Tighten it all the way.
  </>
);

/* ------------------------------------------------------------------ *
 * Front matter                                                         *
 * ------------------------------------------------------------------ */

/** The cover runs across both pages, so the book opens onto the whole dog. */
function CoverSpread() {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <p className="text-[13px] font-extrabold uppercase tracking-[0.24em] text-neutral-500">
        NextGen AI Bots
      </p>
      <h1 className="mt-2 text-[64px] font-black leading-[0.95] tracking-tight text-neutral-900 md:text-[84px]">
        ROBO-DOG
      </h1>
      <p className="mt-2 text-[19px] font-extrabold uppercase tracking-[0.18em] text-[#D72638]">
        Build Manual
      </p>
      <div className="my-2 h-[340px] w-full max-w-[820px] md:h-[400px]">
        <AssemblyView settled={builtThrough(STEP.topCap)} autoRotate />
      </div>
      <div className="flex items-center gap-3 text-[15px] font-bold text-neutral-600">
        <span className="rounded-full bg-neutral-900 px-4 py-1.5 text-white">Ages 8+</span>
        <span>No tools needed</span>
        <span>No soldering</span>
      </div>
    </div>
  );
}

function WelcomePage() {
  return (
    <div>
      <PageHeader title="Before you start" kicker="Read this page first" />
      <div className="space-y-4">
        <p className="text-[18px] font-semibold leading-relaxed text-neutral-800">
          Build a robot dog that <strong>walks on four legs</strong>. No tools. No soldering.
        </p>
        <div className="rounded-2xl border-[3px] border-neutral-900/85 bg-white/60 p-4">
          <p className="mb-2 text-[13px] font-extrabold uppercase tracking-[0.14em] text-neutral-600">
            How this manual works
          </p>
          <ul className="space-y-2.5 text-[16px] leading-snug text-neutral-700">
            <li><strong>Left page</strong> shows where the new part goes. Follow the red arrow.</li>
            <li><strong>Right page</strong> plays the move. Press REPEAT VISUAL to see it again.</li>
            <li><strong>Drag the right picture</strong> to spin it and look around.</li>
            <li><strong>Read the red box</strong> on the next page before you begin.</li>
          </ul>
        </div>
        <Caution tone="tip">
          Hard table, lots of room. Keep the small parts in a bowl so they cannot roll away.
        </Caution>
      </div>
    </div>
  );
}

function SafetyPage() {
  return (
    <div>
      <PageHeader title="Safety first" kicker="Read this with a grown-up" />
      <SafetyGrid />
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Parts list                                                           *
 * ------------------------------------------------------------------ */

/**
 * The parts list, deliberately not to scale.
 *
 * Each part carries its own `listFrameMm`, so the spindle cap can be zoomed
 * right in and the screw pulled back without either of them swamping the row.
 * Every part gets its own bordered cell so two neighbouring models can never
 * look like one object.
 */
function PartsGrid({ ids }: { ids: string[] }) {
  return (
    <div className="grid grid-cols-4 gap-2.5">
      {PRINTED_PARTS.filter((x) => ids.includes(x.id)).map((part) => (
        <div
          key={part.id}
          className={`rounded-xl border-2 border-neutral-300 bg-white/45 px-1 pb-1.5 pt-1 text-center ${
            part.wide ? 'col-span-2' : ''
          }`}
        >
          <div className={part.wide ? 'h-[132px]' : 'h-[118px]'}>
            <Viewer3D
              autoRotate={false}
              interactive={false}
              frameMm={part.listFrameMm ?? part.mm ?? 100}
              items={[
                {
                  kind: 'stl',
                  url: part.stl!,
                  color: part.color,
                  rotation: part.display,
                  standUp: part.standUp,
                },
              ]}
            />
          </div>
          <p className="text-[13px] font-bold leading-tight text-neutral-800">{part.name}</p>
          <p className="text-[17px] font-black leading-none text-[#D72638]">×{part.qty}</p>
        </div>
      ))}
    </div>
  );
}

function PartsListPage() {
  return (
    <div>
      <PageHeader title="Parts List" kicker="Count these before you begin" />
      <PartsGrid ids={['lowerBody', 'topCap', 'longLeg', 'shortLeg', 'spindle']} />
      <div className="mt-2.5">
        <PartsGrid ids={['specialSpacer', 'nut', 'screw', 'spindleCap']} />
      </div>
      <p className="mt-2.5 text-[14px] font-semibold leading-snug text-neutral-600">
        These pictures are not to scale. Each part is zoomed so you can see its shape.
        Never force a part that does not fit.
      </p>
    </div>
  );
}

function ElectronicPartsPage() {
  return (
    <div>
      <PageHeader title="Electronic parts" kicker="The parts that make it go" />
      <div className="grid grid-cols-2 gap-3">
        {ELECTRONIC_PARTS.map((part) => (
          <div key={part.id} className="rounded-xl border-2 border-neutral-300 p-2.5">
            <div className="h-[110px] w-full">
              <Viewer3D
                autoRotate
                interactive={false}
                padding={1.5}
                items={[{ kind: ELECTRONIC_VIEW[part.id] }]}
              />
            </div>
            <div className="mt-1.5 flex items-baseline justify-between">
              <p className="text-[14px] font-extrabold text-neutral-800">{part.name}</p>
              <p className="text-[17px] font-black text-[#D72638]">×{part.qty}</p>
            </div>
            <p className="mt-0.5 text-[13px] leading-snug text-neutral-600">{part.blurb}</p>
          </div>
        ))}
      </div>
      <div className="mt-3">
        <Caution tone="danger">
          Battery stays in its bag until the Electronics chapter. Keep its wire ends apart.
        </Caution>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Build steps                                                          *
 * ------------------------------------------------------------------ */

/**
 * The two studs on each side are not the same, and the difference matters.
 * The head-end stud has a fat collar the leg cannot pass, so that leg stands
 * off the body. The tail-end stud is plain, so that leg goes all the way down.
 */
function Step1() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex min-h-0 flex-1 flex-col space-y-3">
        <PartsCallout
          items={[
            { part: p('lowerBody'), qty: 1 },
            { part: p('motor'), qty: 1 },
          ]}
        />
        <Steps
          items={[
            <>Body on its belly. The <strong>head</strong> is at one end.</>,
            <>The <strong>Spindle Caps</strong> come pushed into the motor shafts.
              <strong> Pull both off</strong> and put them aside for now.</>,
            <>Turn the motor so the <strong>grey part with the wires</strong> points at the
              <strong> back</strong>, the end without the head.</>,
            <>A <strong>shaft</strong> sticks out of each side. Line them up with the two
              <strong> gaps</strong> in the side walls.</>,
            <>Lower it straight down so each shaft <strong>slides into its gap</strong>.</>,

          ]}
        />
        <PlacementStrip step={STEP.motor} />
      </div>
    </div>
  );
}

function Step2() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex min-h-0 flex-1 flex-col space-y-3">
        <PartsCallout
          items={[
            { part: p('spindle'), qty: 2 },
            { part: p('spindleCap'), qty: 2 },
          ]}
        />
        <Steps
          items={[
            <>Push a <strong>Spindle</strong> onto each shaft, straight on and
              <strong> centred</strong>.</>,
            <>The two spindles point <strong>opposite ways</strong>. One pin up, one pin down.
              That is what makes it walk.</>,
            <>Press the <strong>Spindle Cap</strong> into the middle of each spindle.</>,
          ]}
        />
        <PlacementStrip step={STEP.spindles} />
      </div>
    </div>
  );
}

function Step3() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex min-h-0 flex-1 flex-col space-y-3">
        <PartsCallout
          items={[
            { part: p('shortLeg'), qty: 4 },
            { part: p('nut'), qty: 4 },
          ]}
        />
        <Steps
          items={[
            <>Four <strong>studs</strong> stick out of the body, two per side.</>,
            <>At the <strong>tail</strong>, push a <strong>Short Leg</strong> all the way down
              until it touches the body.</>,
            <>At the <strong>head</strong>, the stud has a fat step. The leg stops on the thin
              part, leaving a small gap.</>,
            <>Spin a <strong>Nut</strong> onto each stud. {TIGHTEN}</>,
          ]}
        />
        <PlacementStrip step={STEP.shortLegs} />
      </div>
    </div>
  );
}

function Step4() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex min-h-0 flex-1 flex-col space-y-3">
        <PartsCallout items={[{ part: p('longLeg'), qty: 4 }]} />
        <Steps
          items={[
            <>Find the <strong>pin</strong> sticking out of each spindle.</>,
            <>Slide the <strong>top hole</strong> of a <strong>Long Leg</strong> onto that pin.</>,
            <>Then a second Long Leg onto the <strong>same pin</strong>, next to the first.</>,
            <>Two long legs per side, four in total. They just hang there for now.</>,
          ]}
        />
        <PlacementStrip step={STEP.longLegsOnPin} />
      </div>
    </div>
  );
}

function Step5() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex min-h-0 flex-1 flex-col space-y-3">
        <PartsCallout
          items={[
            { part: p('specialSpacer'), qty: 4 },
            { part: p('screw'), qty: 4 },
            { part: p('nut'), qty: 4 },
          ]}
        />
        <Steps
          items={[
            <>Push a <strong>Spacer</strong> right through the hole in each
              <strong> Short Leg</strong>, all the way in.</>,
            <>The long leg <strong>closest to the body</strong> goes to the
              <strong> back</strong> short leg. The outer one goes to the front.</>,
            <>Drop that long leg&rsquo;s middle hole onto the end of the Spacer.</>,
            <><strong>Screw</strong> in from the outside, head facing you.
              <strong> Nut</strong> on the inside end. {TIGHTEN}</>,
            <>Do all <strong>four</strong> joints the same way.</>,
          ]}
        />
        <PlacementStrip step={STEP.legJoints} />
      </div>
    </div>
  );
}

function Step6() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex min-h-0 flex-1 flex-col space-y-3">
        <PartsCallout items={[{ part: p('nut'), qty: 2 }]} />
        <Steps
          items={[
            <>One <strong>Nut</strong> onto the spindle pin, past both long legs.</>,
            <>{TIGHTEN} The legs must still swing freely.</>,
            <>Other side too.</>,
            <>Turn a spindle <strong>slowly</strong> by hand and watch it walk.</>,
          ]}
        />
        <div className="rounded-2xl border-[3px] border-[#5FCF7F] bg-green-50/70 p-3.5">
          <p className="text-[17px] font-extrabold text-green-900">The body is finished!</p>
          <p className="mt-1 text-[14.5px] text-green-800">
            Next comes the Electronics chapter, where you give your Robo-Dog its power.
          </p>
        </div>
        <PlacementStrip step={STEP.spindleNuts} />
      </div>
    </div>
  );
}

/* ---------------- electronics chapter ---------------- */

function ChapterPage() {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <p className="text-[15px] font-extrabold uppercase tracking-[0.2em] text-neutral-500">
        Chapter Two
      </p>
      <h2 className="mt-2 text-[46px] font-black leading-[1] text-neutral-900">ELECTRONICS</h2>
      <p className="mt-3 max-w-sm text-[17px] font-semibold leading-relaxed text-neutral-700">
        Time to give your Robo-Dog its power.
      </p>
      <div className="mt-5 w-full max-w-md">
        <Caution tone="danger">Switch stays at <strong>O</strong> until the last page.</Caution>
      </div>
    </div>
  );
}

function Step8() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex min-h-0 flex-1 flex-col space-y-3">
        <PartsCallout items={[{ part: p('battery'), qty: 1 }]} />
        <Steps
          items={[
            <>Stand the <strong>Battery</strong> up on its <strong>thin edge</strong>, not flat.</>,
            <>Wires point to the <strong>back</strong>.</>,
            <>Lower it into the channel between the <strong>head</strong> and the motor.</>,
            <>Push it against the <strong>left wall</strong> so it sits fully inside the body.</>,
          ]}
        />
        <Caution tone="danger">
          Never squash, bend or fold the battery. A pinched battery can start a fire.
        </Caution>
        <PlacementStrip step={STEP.battery} />
      </div>
    </div>
  );
}

function Step9() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex min-h-0 flex-1 flex-col space-y-3">
        <PartsCallout items={[{ part: p('switch'), qty: 1 }]} />
        <Steps
          items={[
            <>Find the rectangular <strong>slot</strong> in the back wall.</>,
            <>Hold the <strong>Switch</strong> so it is <strong>wide side across</strong>, then
              push it in until it <strong>clicks</strong>.</>,
            <>Leave it set to <strong>O</strong>.</>,
          ]}
        />
        <PlacementStrip step={STEP.switch} />
      </div>
    </div>
  );
}

function Step10Wiring() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex min-h-0 flex-1 flex-col space-y-3">
        <PartsCallout items={[{ part: p('connector'), qty: 3 }]} />
        <div className="rounded-2xl border-[3px] border-neutral-900/85 bg-white/60 p-3.5">
          <p className="mb-2 text-[13px] font-extrabold uppercase tracking-[0.14em] text-neutral-600">
            Join exactly these three pairs
          </p>
          <WiringList />
        </div>
        <Steps
          items={[
            <>Lever <strong>up</strong>.</>,
            <>Wire all the way in, lever <strong>down</strong>.</>,
            <>Tug it. If it slides out, do it again.</>,
          ]}
        />
        <Caution tone="danger">
          Never join the battery&rsquo;s red wire to its own black wire. That is a short circuit.
        </Caution>
      </div>
    </div>
  );
}

function PowerFlowPage() {
  return (
    <div className="flex h-full flex-col">
      <p className="mb-2 text-[13px] font-extrabold uppercase tracking-[0.14em] text-[#D72638]">
        How the power flows
      </p>
      <div className="rounded-2xl border-[3px] border-neutral-900/85 bg-white/60 p-3">
        <WiringDiagram />
      </div>
      <p className="mt-3 text-[16px] font-semibold leading-snug text-neutral-700">
        Power goes round in a circle: battery, then motor, then switch, then back to the battery.
      </p>
      <p className="mt-2 text-[16px] leading-snug text-neutral-700">
        <strong>Click the switch</strong> in the picture. At <strong>O</strong> the circle breaks,
        the bolts stop, and so does the motor.
      </p>
    </div>
  );
}

function FinalPage() {
  const [fire] = useState(1);
  return (
    <div className="relative flex h-full flex-col">
      <Confetti fire={fire} />
      <div className="flex min-h-0 flex-1 flex-col space-y-3">
        <PartsCallout items={[{ part: p('topCap'), qty: 1 }]} />
        <Steps
          items={[
            <>Tuck every wire inside.</>,
            <><strong>Top Cap</strong> onto the <strong>divot</strong>, press until it clicks.</>,
            <>On the floor, fingers clear, press <strong>I</strong>.</>,
          ]}
        />
        <div className="rounded-2xl border-[3px] border-[#5FCF7F] bg-green-50/70 p-4 text-center">
          <p className="text-[24px] font-black text-green-900">YOU DID IT!</p>
          <p className="mt-1 text-[15px] text-green-800">Your Robo-Dog is alive. Watch it walk!</p>
        </div>
        <Caution tone="danger">
          Warm, smells burnt, or straining? Press <strong>O</strong> and get a grown-up.
        </Caution>
      </div>
    </div>
  );
}

function TroublePage() {
  const rows = [
    ['Nothing happens', 'Check the switch is on I. Then tug each of the three connectors, because a wire that looks in can still be loose. Then check the battery is charged.'],
    ['It buzzes but does not walk', 'A joint is too tight or a leg is hitting the body. Switch off, then turn a spindle by hand to find where it catches.'],
    ['It walks in circles', 'One side has more friction than the other. Check every nut is tightened all the way and no leg is rubbing.'],
    ['A leg flops loose', 'A nut has come undone. Tighten it all the way.'],
    ['It walks backwards', 'Swap the two wires in connector 1. The motor spins the other way. Nothing gets damaged.'],
    ['It stops after a while', 'The battery is flat. Ask a grown-up to charge it, and never charge it alone or overnight.'],
  ];
  return (
    <div className="flex h-full flex-col">
      <PageHeader title="If it does not work" kicker="Troubleshooting" />
      <div className="space-y-2">
        {rows.map(([q, a]) => (
          <div key={q} className="rounded-xl border-2 border-neutral-300 p-2.5">
            <p className="text-[15.5px] font-extrabold text-neutral-900">{q}</p>
            <p className="mt-0.5 text-[14px] leading-snug text-neutral-600">{a}</p>
          </div>
        ))}
      </div>
      <div className="mt-3">
        <Caution tone="danger">
          Always press <strong>O</strong> before you touch the legs or open the Top Cap.
        </Caution>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Spreads                                                              *
 * ------------------------------------------------------------------ */

const stepLeaf = (
  id: string,
  tab: string,
  left: React.ReactNode,
  step: number,
  caption: string,
  tall = false
): BookLeaf => ({
  id,
  tab,
  front: left,
  back: <InstructionPanel step={step} caption={caption} tall={tall} />,
});

export const MANUAL_LEAVES: BookLeaf[] = [
  { id: 'cover', tab: 'Cover', spread: <CoverSpread /> },
  { id: 'start', tab: 'Before you start', front: <WelcomePage />, back: <SafetyPage /> },
  { id: 'parts', tab: 'Parts list', front: <PartsListPage />, back: <ElectronicPartsPage /> },

  stepLeaf('s1', 'Step 1 \u00b7 Motor', <Step1 />, STEP.motor,
    'The motor lowers in, a shaft sliding into the gap on each side.'),
  stepLeaf('s2', 'Step 2 \u00b7 Spindles', <Step2 />, STEP.spindles,
    'Cap off the shaft, spindle on, then the cap into the spindle centre.'),
  stepLeaf('s3', 'Step 3 \u00b7 Short legs', <Step3 />, STEP.shortLegs,
    'Each short leg presses onto its stud, then the nut spins on and tightens down.'),
  stepLeaf('s4', 'Step 4 \u00b7 Long legs', <Step4 />, STEP.longLegsOnPin,
    'Both long legs on a side slide onto the same spindle pin.'),
  stepLeaf('s5', 'Step 5 \u00b7 Leg joints', <Step5 />, STEP.legJoints,
    'Spacer through the short leg, long leg onto it, then the screw and nut close it up.'),
  stepLeaf('s6', 'Step 6 \u00b7 Spindle nuts', <Step6 />, STEP.spindleNuts,
    'One nut holds both long legs on the pin.'),

  { id: 'chapter2', tab: 'Electronics', front: <ChapterPage />, back: <PowerFlowPage /> },

  stepLeaf('s7', 'Step 7 \u00b7 Battery', <Step8 />, STEP.battery,
    'The battery drops into the channel beside the head.'),
  stepLeaf('s8', 'Step 8 \u00b7 Switch', <Step9 />, STEP.switch,
    'The switch pushes into the slot at the back.'),
  { id: 's9', tab: 'Step 9 \u00b7 Wiring', front: <Step10Wiring />, back: <PowerFlowPage /> },
  stepLeaf('s10', 'Step 10 \u00b7 Top cap', <FinalPage />, STEP.topCap,
    'The top cap lowers down and clicks into place.', true),

  { id: 'trouble', tab: 'Help', front: <TroublePage />, back: <ChapterPage /> },
];