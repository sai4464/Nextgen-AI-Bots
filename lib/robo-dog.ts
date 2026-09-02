/**
 * Robo-Dog assembly model.
 *
 * Everything here is expressed in the STL's own millimetre frame:
 *   X = across the body (every round part threads along X)
 *   Y = nose-to-tail (187 mm)
 *   Z = up
 * The viewer applies one presentation rotation so the dog stands on its belly.
 *
 * The in-plane (Y/Z) linkage numbers below were measured off the STL meshes and
 * are accurate. The sideways (X) stacking order is a reconstruction, because the STLs
 * arrive in four unrelated CAD contexts, so the order parts sit along a stud
 * cannot be recovered from geometry alone. Those values are grouped in X_LAYOUT
 * so they can be corrected in one place.
 */

/* ------------------------------------------------------------------ *
 * Measured anchors                                                     *
 * ------------------------------------------------------------------ */

/** Body side walls. Everything mounts outboard of these. */
export const WALL_LEFT_X = -5.05;
export const WALL_RIGHT_X = 23.25;
/** Mirror plane between the two sides. */
export const MID_X = (WALL_LEFT_X + WALL_RIGHT_X) / 2;

/** The four Ø6 studs, as (Y, Z) in the body frame. Two per side. */
export const STUD_FRONT = { y: -51.6, z: -10.7 };
export const STUD_REAR = { y: 74.2, z: -10.8 };

/** Right-hand stud spans this X range; the left mirrors it. */
export const STUD_X_INNER = WALL_RIGHT_X;
export const STUD_X_OUTER = 41.31;

/** Motor shaft / spindle rotation axis. */
export const SPINDLE_AXIS = { y: 11.18, z: -11.15 };
/** Crank pin, offset from the axis. This is what makes the legs walk. */
export const CRANK_PIN = { y: 11.18, z: -20.97 };
export const CRANK_RADIUS = Math.hypot(
  CRANK_PIN.y - SPINDLE_AXIS.y,
  CRANK_PIN.z - SPINDLE_AXIS.z
); // 9.82 mm

/** Spindle disc occupies X 24.4–29; Ø9 pin 29–41.5; threaded stub 41.5–47.8. */
export const SPINDLE_DISC_X = 24.39;
export const PIN_X_START = 29.5;
export const PIN_X_END = 41.5;
export const PIN_STUB_END = 47.8;

/* --- part-local hole positions (STL coordinates) --- */

// All four leg holes are Ø11.4, found by scanning for enclosed voids rather
// than sampling rings (which kept picking up the raised bosses instead).
export const SHORT_LEG = {
  holeStud: { x: 6.35, y: 8.33 },   // swings on a body stud
  holeJoint: { x: 60.75, y: 8.31 }, // screwed to a long leg through the spacer
  thickness: 5,
};
export const SHORT_LEG_LEN = Math.hypot(
  SHORT_LEG.holeJoint.x - SHORT_LEG.holeStud.x,
  SHORT_LEG.holeJoint.y - SHORT_LEG.holeStud.y
); // 54.40 mm

/**
 * Hole roles here are set by the CAD reference views, not guessed: the crank
 * hole is the one 10 mm from the leg's end (both legs meet there on the
 * spindle), the joint hole is 63.5 mm along, and the foot continues past it.
 */
export const LONG_LEG = {
  holeCrank: { x: 4.77, y: 5.54 },  // top end, sits on the spindle crank pin
  holeJoint: { x: 68.24, y: 6.89 }, // mid, spacer + screw to the short leg
  thickness: 5,
};
export const LONG_LEG_LEN = Math.hypot(
  LONG_LEG.holeCrank.x - LONG_LEG.holeJoint.x,
  LONG_LEG.holeCrank.y - LONG_LEG.holeJoint.y
); // 63.48 mm

/** Axis point of each round part inside its own STL. */
export const AXIS_POINT = {
  nut: { x: 2221.5, y: -451.32, z: 128.875 },
  screw: { x: 1516.68, y: -429.725, z: -47.375 },
  spacer: { x: 1557.21, y: -429.66, z: -47.39 },
  spindleCap: { x: 4.0, y: -69.575, z: -62.56 },
};

/* ------------------------------------------------------------------ *
 * Sideways stacking, measured off the STLs. Tune here.                  *
 * ------------------------------------------------------------------ */

export const X_LAYOUT = {
  /**
   * Layer order out from the body.
   *
   * The binding constraint is the crank pin: it runs X 29.5 to 41.5, twelve
   * millimetres, and BOTH long legs on a side have to sit on it. Two 5 mm
   * plates plus clearance is the whole budget, so the long legs are placed
   * first and everything else is hung off them.
   *
   * The two studs are not the same. The head-end stud is stepped, a 12.0 dia
   * collar from x 26 to 30 then 9.7 dia from 30 to 36; the leg hole is 11.4 so
   * it cannot pass the collar and stands off the body. The tail-end stud is
   * plain 9.4 dia straight off the wall, so its leg seats flush. That
   * asymmetry is deliberate in the print.
   */
  /** Long legs, both on the crank pin, not overlapping each other. */
  longLegRearStart: 30.0,
  longLegFrontStart: 35.2,
  /** Short legs sit directly inboard of their long leg. */
  shortLegRearStart: 25.0,
  shortLegFrontStart: 30.2,
  /** Nut on the stud, just outboard of its short leg. */
  studNutRearStart: 31.6,
  studNutFrontStart: 36.8,
  /**
   * The spacer is an 8.8 dia tube with a 12.0 dia collar 3 mm wide at its
   * middle. It threads through both leg holes as a bushing, so the two plates
   * end up touching and the joint stack is just 10 mm.
   */
  spacerRearStart: 24.0,
  spacerFrontStart: 29.2,
  spacerLen: 14,
  /** Screw head stands proud outboard; its thread runs inboard into the kit. */
  screwHeadLen: 7.3,
  /** Nut closes the joint on the inboard face of the short leg. */
  jointNutRearStart: 18.9,
  jointNutFrontStart: 24.1,
  /** One nut holds both long legs on the pin, landing on the threaded stub. */
  crankNutStart: 40.4,
  /** Spindle cap plugging the motor-shaft hole in the spindle centre. */
  capStart: 22.0,
  /** Plate thickness shared by both leg types. */
  plate: 5,
};

/* ------------------------------------------------------------------ *
 * Linkage solver                                                       *
 * ------------------------------------------------------------------ */

export interface Vec2 {
  y: number;
  z: number;
}

/** Circle/circle intersection. `branch` picks which of the two answers. */
function intersect(c0: Vec2, r0: number, c1: Vec2, r1: number, branch: 1 | -1): Vec2 {
  const dy = c1.y - c0.y;
  const dz = c1.z - c0.z;
  const d = Math.hypot(dy, dz);
  // Clamp keeps the solve stable if the crank is driven slightly out of range.
  const dd = Math.min(Math.max(d, Math.abs(r0 - r1) + 1e-6), r0 + r1 - 1e-6);
  const a = (r0 * r0 - r1 * r1 + dd * dd) / (2 * dd);
  const h = Math.sqrt(Math.max(r0 * r0 - a * a, 0));
  const my = c0.y + (a * dy) / d;
  const mz = c0.z + (a * dz) / d;
  return { y: my + (branch * h * dz) / d, z: mz - (branch * h * dy) / d };
}

export interface LegPose {
  /** Where the short leg meets the long leg. */
  joint: Vec2;
  /** Crank pin position for this crank angle. */
  pin: Vec2;
  /** Tip of the foot, used to stand the dog on the ground. */
  foot: Vec2;
  /** Rotation of each leg about the body's X axis, radians. */
  shortAngle: number;
  longAngle: number;
}

/** How far the foot continues past the joint, along the leg. */
export const FOOT_OVERHANG = 50.6;

/**
 * Solves one leg for a given crank angle.
 *
 * Both long legs on a side ride the SAME crank pin, which is what makes the
 * finished dog's legs cross in an X. The short leg swings on its stud; the long
 * leg hangs from the crank and is tied back to the short leg's free end, so the
 * joint is a circle/circle intersection.
 *
 * Link lengths put the joint ~49 mm off the stud-to-crank line, giving two
 * genuinely different assemblies. The real dog uses the one where the joint
 * drops BELOW the body and the foot continues on past it to the ground.
 */
export function solveLeg(stud: Vec2, crankAngle: number): LegPose {
  const pin: Vec2 = {
    y: SPINDLE_AXIS.y + CRANK_RADIUS * Math.cos(crankAngle),
    z: SPINDLE_AXIS.z + CRANK_RADIUS * Math.sin(crankAngle),
  };

  const shortBase = Math.atan2(
    -(SHORT_LEG.holeJoint.x - SHORT_LEG.holeStud.x),
    SHORT_LEG.holeJoint.y - SHORT_LEG.holeStud.y
  );
  const longBase = Math.atan2(
    -(LONG_LEG.holeJoint.x - LONG_LEG.holeCrank.x),
    LONG_LEG.holeJoint.y - LONG_LEG.holeCrank.y
  );

  const build = (branch: 1 | -1) => {
    const joint = intersect(stud, SHORT_LEG_LEN, pin, LONG_LEG_LEN, branch);
    // The foot is past the joint, carrying on away from the crank.
    const uy = (joint.y - pin.y) / LONG_LEG_LEN;
    const uz = (joint.z - pin.z) / LONG_LEG_LEN;
    const foot: Vec2 = {
      y: joint.y + FOOT_OVERHANG * uy,
      z: joint.z + FOOT_OVERHANG * uz,
    };
    return {
      joint,
      pin,
      foot,
      shortAngle: Math.atan2(joint.z - stud.z, joint.y - stud.y) - shortBase,
      longAngle: Math.atan2(joint.z - pin.z, joint.y - pin.y) - longBase,
    };
  };

  const a = build(1);
  const b = build(-1);
  return a.foot.z <= b.foot.z ? a : b;
}

/** Mirror an X coordinate to the other side of the dog. */
export const mirrorX = (x: number) => 2 * MID_X - x;

/** The crank angle the manual poses the finished dog at. */
export const POSE_ANGLE = -0.55;

/**
 * The two spindles are pressed on half a turn apart, which is what stops the
 * dog from hopping: while one side's crank is down and its legs are planted,
 * the other side's is up and swinging through. Right side takes the base
 * angle, left side the same angle plus half a turn.
 */
export const crankAngle = (side: 'right' | 'left') =>
  side === 'right' ? POSE_ANGLE : POSE_ANGLE + Math.PI;

/**
 * The spindle STL is modelled with its pin pointing straight down, i.e. at
 * -PI/2, so this is how far the mesh has to be turned about the body X axis
 * for its pin to land where solveLeg() puts it.
 */
export const spindleSpin = (side: 'right' | 'left') =>
  crankAngle(side) + Math.PI / 2;

/** Mid-point of the body along its length, for centring the view. */
export const BODY_MID_Y = -7.2;

/**
 * Height of the lowest foot at the display pose. Everything is shifted by this
 * so the finished dog stands on the ground plane instead of floating.
 */
export const GROUND_Z = (() => {
  const feet = (['right', 'left'] as const).flatMap((side) => [
    solveLeg(STUD_FRONT, crankAngle(side)).foot.z,
    solveLeg(STUD_REAR, crankAngle(side)).foot.z,
  ]);
  return Math.min(...feet);
})();

/**
 * Bounding box of the finished dog in body-frame mm, measured from the STL
 * extents plus the solved linkage. The viewer frames this fixed box rather than
 * whatever is on screen, so the model does not jump about as steps add parts.
 */
export const ASSEMBLY_BOUNDS = (() => {
  const poses = (['right', 'left'] as const).flatMap((side) => [
    solveLeg(STUD_FRONT, crankAngle(side)),
    solveLeg(STUD_REAR, crankAngle(side)),
  ]);
  const zs = poses.flatMap((p) => [p.joint.z, p.foot.z]).concat([-28.65, 26.42]);
  const ys = poses.flatMap((p) => [p.joint.y, p.foot.y]).concat([-100.64, 86.18]);
  // Legs run on past their joints, and the nuts and screw heads stand proud of
  // them, so the raw joint positions under-report the real silhouette.
  const PAD = 20;
  return {
    x: { min: mirrorX(PIN_STUB_END) - PAD, max: PIN_STUB_END + PAD },
    y: { min: Math.min(...ys) - PAD, max: Math.max(...ys) + PAD },
    z: { min: Math.min(...zs) - PAD * 0.4, max: Math.max(...zs) + PAD },
  };
})();
