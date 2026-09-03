import * as RD from './robo-dog';

export type Side = 'right' | 'left';

export interface Anim {
  /** Offset (mm, body frame) the part starts at before sliding home. */
  from: [number, number, number];
  /** Radians spun about the part's own X axis while it travels. */
  spin?: number;
  delaySec: number;
  durationSec: number;
}

export interface Instance {
  key: string;
  /** STL path, or omitted when `builder` supplies the geometry. */
  stl?: string;
  /** Procedural electronic part, built in code rather than loaded from a mesh. */
  builder?: 'motor' | 'battery' | 'switch' | 'connector';
  /** Uniform scale applied to a procedural part, in mm per model unit. */
  scaleMm?: number;
  /** Euler rotation applied in the part's own model frame. */
  euler?: [number, number, number];
  /**
   * Euler rotation applied in the BODY frame, on top of `euler`.
   * Model-frame angles compose from the inside out, so there is no value of
   * `euler` that simply spins an already-oriented part about a body axis.
   * This is the outer turn.
   */
  bodyEuler?: [number, number, number];
  color: string;
  /** Position of the part's reference point, in body-frame mm. */
  position: [number, number, number];
  /** Rotation about body X, radians (legs only). */
  rotX?: number;
  /** Local pre-rotation that stands a flat leg plate up across the body. */
  legPlate?: boolean;
  /** Which STL-local point `position` refers to. */
  anchor: [number, number, number];
  /** Mirror the mesh so left-side legs read correctly. */
  mirrored?: boolean;
  /**
   * Turn the part end-for-end about the body's Z axis, so its local +X points
   * inboard. Threaded parts are modelled pointing one way only; this is what
   * puts a screw head outboard with its thread running into the kit, and what
   * presents a nut's lead-in face to the thread it is about to climb.
   */
  flipAxis?: boolean;
  /** Which side of the dog this part belongs to, for aiming the step camera. */
  side?: Side;
  /**
   * Extra destinations to draw a placement arrow at, in body-frame mm, on top
   * of the one pointing at `position`. A long leg lands in two places at once,
   * its middle hole on the spacer and its top hole on the spindle pin, and one
   * arrow cannot say that.
   */
  arrowTo?: [number, number, number][];
  /** 1-based step that adds this part. */
  step: number;
  /**
   * Step at which this part comes back off, if it does. The spindle cap ships
   * pushed into the end of the motor shaft, so it is on the dog from step 1,
   * pulled out in step 2, and refitted into the spindle centre in that same
   * step. Without this the build could only ever gain parts.
   */
  removedAt?: number;
  anim: Anim;
}

const C = {
  // Two materials only: muted antique gold for the top cap, the short legs
  // and every nut, and the screw's dark charcoal for everything else.
  gold: '#C4A76A',
  goldDeep: '#A98F4F',
  dark: '#3F454E',
};

const PART_COLOR = {
  body: C.dark,
  cap: C.gold,
  leg: C.gold,
  legAlt: C.dark,
  spindle: C.dark,
  spindleCap: C.dark,
  spacer: C.dark,
  nut: C.goldDeep,
  screw: C.dark,
};

const STL = {
  body: '/kit/stl/LowerBody-1X.stl',
  cap: '/kit/stl/topCAP-1X.stl',
  longLeg: '/kit/stl/longLeg-4X.stl',
  shortLeg: '/kit/stl/shortLeg-4X.stl',
  spindle: '/kit/stl/Spindle-2X.stl',
  spindleCap: '/kit/stl/SpindleCap-2X.stl',
  spacer: '/kit/stl/specialSpacer-4X.stl',
  nut: '/kit/stl/Nut-10X.stl',
  screw: '/kit/stl/Screws-4X.stl',
};

/** Outward direction for a side: +1 to the right, -1 to the left. */
const dir = (s: Side) => (s === 'right' ? 1 : -1);
/** Map a right-hand X onto the requested side. */
const sx = (s: Side, x: number) => (s === 'right' ? x : RD.mirrorX(x));

const A = RD.AXIS_POINT;
const L = RD.X_LAYOUT;

/** Half the nut's thickness, so a face position can be turned into a centre. */
const NUT_HALF = 3.05;

/**
 * Poses for the four legs. The right and left cranks are half a turn apart,
 * so a leg's geometry depends on which side it is on, not just front or rear.
 */
const POSE = {
  right: {
    front: RD.solveLeg(RD.STUD_FRONT, RD.crankAngle('right')),
    rear: RD.solveLeg(RD.STUD_REAR, RD.crankAngle('right')),
  },
  left: {
    front: RD.solveLeg(RD.STUD_FRONT, RD.crankAngle('left')),
    rear: RD.solveLeg(RD.STUD_REAR, RD.crankAngle('left')),
  },
};

interface LegSpec {
  side: Side;
  at: 'front' | 'rear';
}

const LEGS: LegSpec[] = [
  { side: 'right', at: 'front' },
  { side: 'right', at: 'rear' },
  { side: 'left', at: 'front' },
  { side: 'left', at: 'rear' },
];

/* ------------------------------------------------------------------ *
 * Step plan                                                            *
 * ------------------------------------------------------------------ *
 * The spindle presses onto the motor shaft and the long legs hang off the
 * spindle's crank pin, so the order has to be motor, then spindle, then long
 * legs. The short legs only touch the body, so they go on first.
 */
export const STEP = {
  motor: 1,
  spindles: 2,
  shortLegs: 3,
  longLegsOnPin: 4,
  legJoints: 5,
  spindleNuts: 6,
  battery: 7,
  switch: 8,
  wiring: 9,
  topCap: 10,
} as const;

/* ------------------------------------------------------------------ *
 * Build the instance list                                              *
 * ------------------------------------------------------------------ */

/** The short leg and the nut that traps it on the body stud. */
function shortLegInstances(spec: LegSpec): Instance[] {
  const { side, at } = spec;
  const front = at === 'front';
  const stud = front ? RD.STUD_FRONT : RD.STUD_REAR;
  const pose = POSE[side][at];
  const out = dir(side);
  const tag = `${side}-${at}`;
  const step = STEP.shortLegs;

  const shortLegX = front ? L.shortLegFrontStart : L.shortLegRearStart;
  const studNutX = front ? L.studNutFrontStart : L.studNutRearStart;
  const lead = (front ? 0 : 0.9) + (side === 'right' ? 0 : 1.8);

  return [
    {
      key: `shortleg-${tag}`,
      stl: STL.shortLeg,
      color: PART_COLOR.leg,
      legPlate: true,
      mirrored: side === 'left',
      side,
      anchor: [RD.SHORT_LEG.holeStud.x, RD.SHORT_LEG.holeStud.y, L.plate / 2],
      position: [sx(side, shortLegX + L.plate / 2), stud.y, stud.z],
      rotX: pose.shortAngle,
      step,
      anim: { from: [out * 60, 0, 16], delaySec: 0.2 + lead, durationSec: 2.3 },
    },
    {
      key: `studnut-${tag}`,
      stl: STL.nut,
      color: PART_COLOR.nut,
      side,
      // Threading inboard onto the stud, so its lead-in face looks that way.
      flipAxis: side === 'right',
      anchor: [A.nut.x, A.nut.y, A.nut.z],
      position: [sx(side, studNutX + NUT_HALF), stud.y, stud.z],
      step,
      anim: { from: [out * 36, 0, 0], spin: Math.PI * 5, delaySec: 2.9 + lead, durationSec: 3.4 },
    },
  ];
}

/** Spacer, long leg, screw and nut: the joint that closes one leg pair. */
function longLegInstances(spec: LegSpec): Instance[] {
  const { side, at } = spec;
  const front = at === 'front';
  const pose = POSE[side][at];
  const out = dir(side);
  const tag = `${side}-${at}`;
  const lead2 = side === 'right' ? 0 : 1.8;

  const spacerX = front ? L.spacerFrontStart : L.spacerRearStart;
  const longLegX = front ? L.longLegFrontStart : L.longLegRearStart;
  const jointNutX = front ? L.jointNutFrontStart : L.jointNutRearStart;
  // The screw is anchored on the outer face of its head, which sits proud of
  // the long leg; the thread then runs inboard through the whole stack.
  const screwHeadX = longLegX + L.plate + L.screwHeadLen;
  const lead = (front ? 0 : 0.9) + lead2;

  return [
    {
      key: `spacer-${tag}`,
      stl: STL.spacer,
      color: PART_COLOR.spacer,
      side,
      anchor: [A.spacer.x, A.spacer.y, A.spacer.z],
      position: [sx(side, spacerX + L.spacerLen / 2), pose.joint.y, pose.joint.z],
      step: STEP.legJoints,
      anim: { from: [out * 50, 0, 0], delaySec: 0.2 + lead, durationSec: 2.0 },
    },
    {
      key: `longleg-${tag}`,
      stl: STL.longLeg,
      color: PART_COLOR.legAlt,
      legPlate: true,
      mirrored: side === 'left',
      side,
      anchor: [RD.LONG_LEG.holeJoint.x, RD.LONG_LEG.holeJoint.y, L.plate / 2],
      position: [sx(side, longLegX + L.plate / 2), pose.joint.y, pose.joint.z],
      // Only the front leg carries the spindle arrow. Both legs share the one
      // pin, so drawing it twice would just clutter the panel; this way the
      // figure reads as three arrows, two onto spacers and one onto the pin.
      arrowTo: front
        ? [[sx(side, longLegX + L.plate / 2), pose.pin.y, pose.pin.z]]
        : undefined,
      rotX: pose.longAngle,
      // Hung on the spindle pin first; the spacer joint closes a step later.
      step: STEP.longLegsOnPin,
      anim: { from: [out * 62, -14, -26], delaySec: 0.2 + lead, durationSec: 2.6 },
    },
    {
      key: `jointscrew-${tag}`,
      stl: STL.screw,
      color: PART_COLOR.screw,
      side,
      // Head outboard, thread pointing into the kit.
      flipAxis: side === 'right',
      anchor: [A.screw.x, A.screw.y, A.screw.z],
      position: [sx(side, screwHeadX), pose.joint.y, pose.joint.z],
      step: STEP.legJoints,
      anim: { from: [out * 42, 0, 0], spin: Math.PI * 7, delaySec: 5.3 + lead, durationSec: 3.6 },
    },
    {
      key: `jointnut-${tag}`,
      stl: STL.nut,
      color: PART_COLOR.nut,
      side,
      // Climbing the thread outboard, so it is flipped the other way.
      flipAxis: side === 'left',
      anchor: [A.nut.x, A.nut.y, A.nut.z],
      position: [sx(side, jointNutX + NUT_HALF), pose.joint.y, pose.joint.z],
      step: STEP.legJoints,
      anim: { from: [-out * 34, 0, 0], spin: -Math.PI * 6, delaySec: 7.4 + lead, durationSec: 3.4 },
    },
  ];
}

function spindleInstances(side: Side): Instance[] {
  const out = dir(side);
  return [
    {
      key: `spindle-${side}`,
      stl: STL.spindle,
      color: PART_COLOR.spindle,
      side,
      anchor: [RD.SPINDLE_DISC_X, RD.SPINDLE_AXIS.y, RD.SPINDLE_AXIS.z],
      position: [sx(side, RD.SPINDLE_DISC_X), RD.SPINDLE_AXIS.y, RD.SPINDLE_AXIS.z],
      // Turned end-for-end rather than mirrored. A scale flip reverses the
      // mesh's handedness, which left one side's pin pointing the wrong way
      // out of the body; a half turn about Z keeps the part solid and still
      // sends the pin outboard on both sides.
      flipAxis: side === 'left',
      // Spin the mesh so its pin lands where the linkage solver expects it.
      rotX: RD.spindleSpin(side),
      step: STEP.spindles,
      anim: {
        from: [out * 70, 0, 0],
        spin: Math.PI * 2,
        delaySec: side === 'right' ? 0.2 : 2.2,
        durationSec: 1.7,
      },
    },
  ];
}

/**
 * The nut that traps both long legs on the crank pin.
 *
 * The spindle cap is no longer here: it ships pushed into the motor shaft, so
 * it is pulled out and refitted during the spindle step instead.
 */
function lockInstances(side: Side): Instance[] {
  const out = dir(side);
  const lead = side === 'right' ? 0 : 2.2;
  return [
    {
      key: `cranknut-${side}`,
      stl: STL.nut,
      color: PART_COLOR.nut,
      side,
      flipAxis: side === 'right',
      anchor: [A.nut.x, A.nut.y, A.nut.z],
      position: [sx(side, L.crankNutStart + NUT_HALF), POSE[side].front.pin.y, POSE[side].front.pin.z],
      step: STEP.spindleNuts,
      anim: { from: [out * 38, 0, 0], spin: Math.PI * 6, delaySec: 0.2 + lead, durationSec: 2.1 },
    },
  ];
}

/**
 * The spindle cap, twice over: once stowed in the motor shaft from step 1 and
 * withdrawn in step 2, and once seated in the spindle centre in step 2.
 */
function capInstances(side: Side): Instance[] {
  const out = dir(side);
  const lead = side === 'right' ? 0 : 1.6;
  return [
    {
      key: `capstowed-${side}`,
      stl: STL.spindleCap,
      color: PART_COLOR.spindleCap,
      side,
      flipAxis: side === 'left',
      anchor: [A.spindleCap.x, A.spindleCap.y, A.spindleCap.z],
      // Pushed into the bare shaft, inboard of where the spindle will sit.
      position: [sx(side, RD.SPINDLE_DISC_X - 3), RD.SPINDLE_AXIS.y, RD.SPINDLE_AXIS.z],
      step: STEP.motor,
      removedAt: STEP.spindles,
      anim: { from: [out * 30, 0, 0], delaySec: 3.9, durationSec: 1.4 },
    },
    {
      key: `spindlecap-${side}`,
      stl: STL.spindleCap,
      color: PART_COLOR.spindleCap,
      side,
      flipAxis: side === 'left',
      anchor: [A.spindleCap.x, A.spindleCap.y, A.spindleCap.z],
      position: [sx(side, L.capStart + 4), RD.SPINDLE_AXIS.y, RD.SPINDLE_AXIS.z],
      step: STEP.spindles,
      anim: { from: [out * 45, 0, 0], delaySec: 4.4 + lead, durationSec: 1.9 },
    },
  ];
}

/* --- electronics --- */

/** The motor's own model is ~4.6 units long and needs to end up ~70 mm. */
const MOTOR_MM = 15.5;

const ELECTRONICS: Instance[] = [
  {
    key: 'motor',
    builder: 'motor',
    scaleMm: MOTOR_MM,
    // Model Z runs along the shafts, model X along the can. This pair of
    // quarter turns maps model Z onto the body's X, so a shaft exits through
    // each side gap, and lays the can down flat instead of standing it up.
    euler: [Math.PI / 2, Math.PI / 2, 0],
    // Model -X is the can-and-wires end, which the pair above sends towards
    // the head. Half a turn about the body's Z swings it round to the tail,
    // where the wiring is meant to come out. The shafts are symmetric, so
    // reversing them costs nothing.
    bodyEuler: [0, 0, Math.PI],
    color: '#F2C230',
    anchor: [0, 0, 0],
    position: [RD.MID_X, RD.SPINDLE_AXIS.y, RD.SPINDLE_AXIS.z],
    step: STEP.motor,
    anim: { from: [0, 0, 62], delaySec: 0.51, durationSec: 3.24 },
  },
  {
    key: 'battery',
    builder: 'battery',
    scaleMm: 15.5,
    // The pouch is modelled 2.6 x 1.55 x 0.62 in its own units, so model Z is
    // the thin way through it. This maps model Z onto the body's X, which
    // stands the cell on its thin edge instead of laying it flat, and puts its
    // length along the body.
    euler: [Math.PI / 2, Math.PI / 2, 0],
    color: '#D9B44A',
    anchor: [0, 0, 0],
    // Pushed up against the inside of the left wall (x -5.05) with its 9.6 mm
    // thickness, leaving the rest of the bay clear on the right. Sits in the
    // gap between the head block and the motor, and drops in from above.
    // Dropped further into the channel so no part of the cell stands proud
    // of the shell once the top cap goes on.
    position: [RD.WALL_LEFT_X + 4.9, -44, -15],
    step: STEP.battery,
    anim: { from: [0, 0, 56], delaySec: 0.51, durationSec: 3.24 },
  },
  {
    key: 'switch',
    builder: 'switch',
    scaleMm: 9.5,
    // Laid on its side so the body runs across the dog rather than along it,
    // which is the way the rectangular slot in the tail wall is cut.
    euler: [Math.PI / 2, 0, Math.PI / 2],
    color: '#1C1C1E',
    anchor: [0, 0, 0],
    // The rectangular window is at the tail, so the switch goes in from behind.
    position: [RD.MID_X, 74, 2],
    step: STEP.switch,
    anim: { from: [0, 40, 0], delaySec: 0.51, durationSec: 2.88 },
  },
];

export const INSTANCES: Instance[] = [
  {
    key: 'body',
    stl: STL.body,
    color: PART_COLOR.body,
    anchor: [0, 0, 0],
    position: [0, 0, 0],
    step: STEP.motor,
    anim: { from: [0, 0, 0], delaySec: 0, durationSec: 0.01 },
  },
  ...LEGS.flatMap(shortLegInstances),
  ...LEGS.flatMap(longLegInstances),
  ...ELECTRONICS,
  ...spindleInstances('right'),
  ...spindleInstances('left'),
  ...capInstances('right'),
  ...capInstances('left'),
  ...lockInstances('right'),
  ...lockInstances('left'),
  {
    key: 'topcap',
    stl: STL.cap,
    color: PART_COLOR.cap,
    anchor: [0, 0, 0],
    position: [0, 0, 0],
    step: STEP.topCap,
    anim: { from: [0, 0, 70], delaySec: 0.68, durationSec: 3.6 },
  },
];

/** Present at the start of `step`: fitted earlier and not yet taken off. */
export const builtBefore = (step: number) =>
  INSTANCES.filter((i) => i.step < step && (i.removedAt ?? Infinity) > step - 1);
/** Instances this step adds (drawn animating). */
export const addedAt = (step: number) => INSTANCES.filter((i) => i.step === step);
/** Instances this step takes back off. */
export const removedAt = (step: number) => INSTANCES.filter((i) => i.removedAt === step);
/** Everything on the dog once `step` is complete. */
export const builtThrough = (step: number) =>
  INSTANCES.filter((i) => i.step <= step && (i.removedAt ?? Infinity) > step);

/**
 * Which side of the dog a step works on, so the camera can be put where the
 * action is. A kid should never have to spin the model to find the part.
 */
export function stepSide(step: number): Side {
  const parts = addedAt(step);
  const sides = parts.map((p) => p.side).filter(Boolean) as Side[];
  if (sides.includes('right')) return 'right';
  if (sides.includes('left')) return 'left';
  return 'right';
}
