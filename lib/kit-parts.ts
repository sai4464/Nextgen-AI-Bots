/**
 * Canonical part registry for the NextGen Robo-Dog kit.
 * Every manual page, the parts list, and (later) the interactive 3D model
 * read from this file so quantities can never drift out of sync.
 */

export type PartKind = 'printed' | 'electronic';

export interface KitPart {
  id: string;
  name: string;
  kind: PartKind;
  qty: number;
  /** STL path under /public for printed parts. */
  stl?: string;
  /** Photo path under /public for electronic parts. */
  photo?: string;
  /** Colour used for this part everywhere it is rendered. */
  color: string;
  /** Rough footprint, mm, measured from the STL bounding boxes. */
  size?: string;
  blurb: string;
  /**
   * Euler rotation that shows the part the way it sits on the finished dog.
   * The STLs are exported flat for printing, which is rarely how a part reads.
   */
  display?: [number, number, number];
  /** Longest real dimension, mm. Used as a fallback list scale. */
  mm?: number;
  /** Give this part a double-width cell in the parts grid. */
  wide?: boolean;
  /**
   * Millimetres framed across this part's cell in the parts list.
   * The list is deliberately NOT to scale: at one honest scale the spindle cap
   * is a speck and the screw swamps its neighbours. Smaller number = more
   * zoomed in. Tuned per part so every one reads at a useful size.
   */
  listFrameMm?: number;
  /** Draw it in its assembled orientation rather than as exported for printing. */
  standUp?: boolean;
}

/** Widest part in the kit, kept as a reference scale. */
export const PARTS_FRAME_MM = 200;

export const PRINTED_PARTS: KitPart[] = [
  {
    id: 'lowerBody',
    name: 'Lower Body',
    kind: 'printed',
    qty: 1,
    stl: '/kit/stl/LowerBody-1X.stl',
    color: '#3F454E',
    size: '64 × 187 × 55 mm',
    blurb:
      'The chassis. Holds the motor, battery and switch, and carries the pivot points for all four legs.',
    standUp: true,
    mm: 187,
    listFrameMm: 200,
    wide: true,
  },
  {
    id: 'topCap',
    name: 'Top Cap',
    kind: 'printed',
    qty: 1,
    stl: '/kit/stl/topCAP-1X.stl',
    color: '#BCA063',
    size: '33 × 150 × 30 mm',
    blurb:
      'Clicks into the divot on the Lower Body and hides the battery, motor and all wiring inside.',
    standUp: true,
    mm: 150,
    listFrameMm: 200,
    wide: true,
  },
  {
    id: 'longLeg',
    name: 'Long Leg',
    kind: 'printed',
    qty: 4,
    stl: '/kit/stl/longLeg-4X.stl',
    color: '#3F454E',
    size: '124 × 20 × 5 mm',
    blurb: 'The outer leg with the wide foot. Two per side, mirrored front and back.',
    display: [0, 0, 0],
    mm: 124,
    listFrameMm: 150,
    wide: true,
  },
  {
    id: 'shortLeg',
    name: 'Short Leg',
    kind: 'printed',
    qty: 4,
    stl: '/kit/stl/shortLeg-4X.stl',
    color: '#C4A76A',
    size: '69 × 15 × 5 mm',
    blurb:
      'The driver link. One end pivots on the Spindle, the other bolts to a Long Leg.',
    display: [0, 0, 0],
    mm: 69,
    listFrameMm: 78,
  },
  {
    id: 'spindle',
    name: 'Spindle',
    kind: 'printed',
    qty: 2,
    stl: '/kit/stl/Spindle-2X.stl',
    color: '#3F454E',
    size: '23 × 30 × 30 mm',
    blurb:
      'The crank. Presses onto a motor shaft and turns the motor’s spin into the walking motion.',
    display: [0, -Math.PI / 2, 0],
    mm: 30,
    listFrameMm: 42,
  },
  {
    id: 'spindleCap',
    name: 'Spindle Cap',
    kind: 'printed',
    qty: 2,
    stl: '/kit/stl/SpindleCap-2X.stl',
    color: '#3F454E',
    size: '8 × 9 × 9 mm',
    blurb: 'Small plug that caps the end of each Spindle so it cannot slide off the shaft.',
    display: [0, Math.PI / 2, 0],
    mm: 9,
    listFrameMm: 16,
  },
  {
    id: 'specialSpacer',
    name: 'Special Spacer',
    kind: 'printed',
    qty: 4,
    stl: '/kit/stl/specialSpacer-4X.stl',
    color: '#3F454E',
    size: '14 × 12 × 12 mm',
    blurb:
      'Holds a gap between the legs and the body so the linkage can swing without rubbing.',
    display: [0, Math.PI / 2, 0],
    mm: 14,
    listFrameMm: 20,
  },
  {
    id: 'nut',
    name: 'Nut',
    kind: 'printed',
    qty: 10,
    stl: '/kit/stl/Nut-10X.stl',
    color: '#A98F4F',
    size: '16 mm across flats',
    blurb:
      'Printed hex nut. Forms every pivot: the Spindle joints and the inner leg joints.',
    display: [0, Math.PI / 2, 0],
    mm: 16.4,
    listFrameMm: 24,
  },
  {
    id: 'screw',
    name: 'Screw',
    kind: 'printed',
    qty: 4,
    stl: '/kit/stl/Screws-4X.stl',
    color: '#3F454E',
    size: '24 mm long',
    blurb: 'Printed screw. Used only to join a Long Leg to its Short Leg.',
    display: [0, Math.PI / 2, 0],
    mm: 23.5,
    listFrameMm: 38,
  },
];

export const ELECTRONIC_PARTS: KitPart[] = [
  {
    id: 'motor',
    name: 'TT Gear Motor',
    kind: 'electronic',
    qty: 1,
    photo: '/kit/img/motor.png',
    color: '#F2C230',
    size: 'dual shaft, 3–6 V',
    blurb:
      'The muscle. A shaft comes out of each side, and a Spindle goes on each shaft. Has one RED and one BLACK wire.',
  },
  {
    id: 'battery',
    name: '3.7 V Li-Po Battery',
    kind: 'electronic',
    qty: 1,
    photo: '/kit/img/battery.png',
    color: '#D9B44A',
    size: '3.7 V · 1100 mAh',
    blurb:
      'The power source. Lies flat in the body channel. Has one RED and one BLACK wire.',
  },
  {
    id: 'switch',
    name: 'Rocker Switch',
    kind: 'electronic',
    qty: 1,
    photo: '/kit/img/switch.png',
    color: '#1C1C1E',
    size: 'I = on, O = off',
    blurb:
      'Turns the robot on and off. Sits in the square window at the end of the body. Has one RED and one BLACK wire.',
  },
  {
    id: 'connector',
    name: 'Lever Connector',
    kind: 'electronic',
    qty: 3,
    photo: '/kit/img/connector.png',
    color: '#F26722',
    size: 'no tools needed',
    blurb:
      'Orange-lever wire connector. Lift the lever, push a wire in, close the lever. That is the whole job, and no soldering, ever.',
  },
];

export const ALL_PARTS = [...PRINTED_PARTS, ...ELECTRONIC_PARTS];

export const partById = (id: string) => ALL_PARTS.find((p) => p.id === id)!;
