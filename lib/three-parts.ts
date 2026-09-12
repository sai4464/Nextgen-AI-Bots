import * as THREE from 'three';

export const WIRE_RED = '#D7262E';
export const WIRE_BLACK = '#1B1B1D';

/** A drooping wire, drawn as a tube along a sagging curve. */
function wire(
  from: THREE.Vector3,
  dir: THREE.Vector3,
  color: string,
  length = 1.1,
  radius = 0.035
): THREE.Mesh {
  const d = dir.clone().normalize();
  const end = from.clone().addScaledVector(d, length);
  const mid = from
    .clone()
    .addScaledVector(d, length * 0.55)
    .add(new THREE.Vector3(0, -length * 0.3, 0));
  const curve = new THREE.CatmullRomCurve3([from, mid, end]);
  const geo = new THREE.TubeGeometry(curve, 24, radius, 8, false);
  const mesh = new THREE.Mesh(
    geo,
    new THREE.MeshStandardMaterial({ color, roughness: 0.55 })
  );
  mesh.castShadow = true;
  return mesh;
}

const std = (color: string, roughness = 0.6, metalness = 0.05) =>
  new THREE.MeshStandardMaterial({ color, roughness, metalness });

function box(
  w: number,
  h: number,
  d: number,
  mat: THREE.Material,
  pos: [number, number, number] = [0, 0, 0]
) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.position.set(...pos);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

function cyl(
  rt: number,
  rb: number,
  h: number,
  mat: THREE.Material,
  pos: [number, number, number] = [0, 0, 0],
  rot: [number, number, number] = [0, 0, 0],
  seg = 24
) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), mat);
  m.position.set(...pos);
  m.rotation.set(...rot);
  m.castShadow = true;
  return m;
}

/** Yellow TT gear motor: gearbox, motor can, two output shafts, red + black leads. */
export function buildMotor(showWires = true): THREE.Group {
  const g = new THREE.Group();
  const yellow = std('#F2C230', 0.5);
  const yellowDark = std('#E0AE1E', 0.5);
  const steel = std('#9BA0A8', 0.35, 0.65);

  g.add(box(2.3, 1.2, 0.75, yellow));
  g.add(box(1.2, 0.8, 0.14, yellowDark, [0.45, 0.15, 0.44]));
  g.add(cyl(0.42, 0.42, 0.95, steel, [-1.5, 0.05, 0], [0, 0, Math.PI / 2], 28));
  g.add(cyl(0.32, 0.32, 0.12, std('#3A3D42'), [-1.98, 0.05, 0], [0, 0, Math.PI / 2]));

  // Output shafts. Length matters here: at the manual's 15.5 mm-per-unit scale
  // these have to clear the body wall at x 23.25 and reach x 28, which is the
  // middle of the spindle disc (24.39 to 29) where its 3.9 mm bore grips. The
  // original 0.42-long stubs stopped short of the spindle face entirely,
  // leaving each spindle hanging in mid-air; running them past x 29 instead
  // pokes the shaft out the far side of the crank.
  for (const z of [0.815, -0.815]) {
    g.add(
      cyl(0.13, 0.13, 0.81, std('#D8DBE0', 0.3, 0.5), [0.75, -0.1, z], [Math.PI / 2, 0, 0], 20)
    );
  }
  for (const z of [0.42, -0.42]) {
    g.add(cyl(0.22, 0.22, 0.2, yellowDark, [0.75, -0.1, z], [Math.PI / 2, 0, 0], 20));
  }

  if (showWires) {
    g.add(wire(new THREE.Vector3(-2.02, 0.22, 0.12), new THREE.Vector3(-1, 0.15, 0.25), WIRE_RED));
    g.add(wire(new THREE.Vector3(-2.02, -0.12, 0.12), new THREE.Vector3(-1, -0.1, 0.35), WIRE_BLACK));
  }
  return g;
}

/** KCD1-style black rocker switch with I / O face and red + black leads. */
export function buildSwitch(showWires = true): THREE.Group {
  const g = new THREE.Group();
  const marking = new THREE.MeshStandardMaterial({
    color: '#EDEDED',
    emissive: new THREE.Color('#4a4a4a'),
    roughness: 0.4,
  });

  // Bezel, then the recessed well, then the rocker proud of it. Without the
  // depth the part just reads as a black rectangle from most angles.
  g.add(box(1.55, 2.15, 0.18, std('#141416', 0.45)));
  g.add(box(1.18, 1.78, 0.12, std('#0C0C0E', 0.7), [0, 0, 0.1]));
  g.add(box(1.2, 1.75, 0.65, std('#1C1C1E', 0.6), [0, 0, -0.42]));

  const rocker = box(1.02, 1.6, 0.3, std('#2E2E33', 0.3), [0, 0, 0.26]);
  rocker.rotation.x = 0.22;
  g.add(rocker);

  // "I" bar
  const bar = box(0.08, 0.36, 0.03, marking, [0, 0.46, 0.44]);
  bar.rotation.x = 0.18;
  g.add(bar);

  // "O" ring
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.15, 0.035, 10, 24), marking);
  ring.position.set(0, -0.5, 0.36);
  ring.rotation.x = 0.18;
  g.add(ring);

  for (const y of [0.42, -0.42]) {
    g.add(box(0.5, 0.16, 0.28, std('#B9BCC2', 0.3, 0.8), [0, y, -0.82]));
  }

  if (showWires) {
    // The switch is drawn at 9.5 mm per unit against the motor and battery's
    // 15.5, so leads authored at the shared default came out visibly thinner
    // than theirs on the same page. These are scaled up to match in real
    // millimetres and run longer, because they are the pair a child has to
    // find and push into a connector.
    const R = 0.09;
    const LEN = 2.4;
    g.add(wire(new THREE.Vector3(0, 0.42, -0.95), new THREE.Vector3(0.1, 0.42, -1), WIRE_RED, LEN, R));
    g.add(wire(new THREE.Vector3(0, -0.42, -0.95), new THREE.Vector3(0.1, -0.42, -1), WIRE_BLACK, LEN, R));
  }
  return g;
}

/** 3.7 V Li-Po pouch cell: thin gold-foil body, crimped seams, red + black leads. */
export function buildBattery(showWires = true): THREE.Group {
  const g = new THREE.Group();
  const foil = std('#C9A93F', 0.38, 0.45);

  // Main pouch, noticeably thin, because a real LP102540 is only 10 mm deep.
  const body = box(2.6, 1.55, 0.62, foil);
  g.add(body);

  // Crimped foil seam running right round the pouch.
  for (const [w, h, d, pos] of [
    [2.72, 0.16, 0.3, [0, 0.79, 0]],
    [2.72, 0.16, 0.3, [0, -0.79, 0]],
  ] as [number, number, number, [number, number, number]][]) {
    g.add(box(w, h, d, std('#B99631', 0.45, 0.4), pos));
  }

  // Printed label, inset so the gold reads as a border rather than a frame.
  g.add(box(1.85, 0.95, 0.02, std('#F6F5F1', 0.9), [0, 0, 0.32]));
  g.add(box(1.1, 0.2, 0.01, std('#2C2C30', 0.8), [-0.25, 0.2, 0.34]));
  g.add(box(0.7, 0.13, 0.01, std('#B03038', 0.8), [-0.45, -0.05, 0.34]));

  // Tab end where the leads exit.
  g.add(box(0.22, 1.2, 0.2, std('#D8BC5A', 0.35, 0.55), [-1.4, 0, 0]));

  if (showWires) {
    g.add(wire(new THREE.Vector3(-1.5, 0.26, 0), new THREE.Vector3(-1, 0.18, 0.1), WIRE_RED));
    g.add(wire(new THREE.Vector3(-1.5, -0.06, 0), new THREE.Vector3(-1, -0.14, 0.1), WIRE_BLACK));
  }
  return g;
}

/** Clear-body lever wire connector with an orange lever. */
export function buildConnector(open = false): THREE.Group {
  const g = new THREE.Group();
  const clear = new THREE.MeshStandardMaterial({
    color: '#DCE8EF',
    roughness: 0.12,
    metalness: 0.0,
    transparent: true,
    opacity: 0.45,
  });
  const orange = std('#F26722', 0.42);

  g.add(box(1.7, 0.85, 0.9, clear));

  const lever = box(0.85, 0.2, 0.5, orange, [0.15, 0.52, 0]);
  lever.rotation.z = open ? -0.95 : -0.12;
  g.add(lever);

  g.add(cyl(0.12, 0.12, 0.52, orange, [-0.3, 0.45, 0], [Math.PI / 2, 0, 0], 16));

  for (const x of [-0.9, 0.9]) {
    g.add(cyl(0.16, 0.16, 0.2, std('#CBD4DA', 0.3), [x, -0.15, 0], [0, 0, Math.PI / 2], 16));
  }
  return g;
}

export const ELECTRONIC_BUILDERS = {
  motor: buildMotor,
  switch: buildSwitch,
  battery: buildBattery,
  connector: buildConnector,
} as const;

export type ElectronicKind = keyof typeof ELECTRONIC_BUILDERS;

/**
 * Normalises any object so its longest edge is `fitTo` world units and it is
 * centred on its own bounding box. The kit's STLs come from several different
 * CAD contexts (the nuts sit ~2200 mm from the origin), so this is required,
 * not cosmetic.
 */
export function normalise(obj: THREE.Object3D, fitTo: number) {
  const bbox = new THREE.Box3().setFromObject(obj);
  const size = new THREE.Vector3();
  const centre = new THREE.Vector3();
  bbox.getSize(size);
  bbox.getCenter(centre);
  const longest = Math.max(size.x, size.y, size.z) || 1;
  const s = fitTo / longest;
  obj.position.sub(centre);
  const wrapper = new THREE.Group();
  wrapper.add(obj);
  wrapper.scale.setScalar(s);
  return wrapper;
}

/**
 * Centres an object on its bounding box without rescaling it.
 *
 * Used by the parts list, where every thumbnail must share one scale so the
 * chassis reads as large and the spindle cap as tiny. Normalising each part to
 * fill its own frame, the usual trick, destroys exactly that information.
 */
export function recentreOnly(obj: THREE.Object3D) {
  const bbox = new THREE.Box3().setFromObject(obj);
  const centre = new THREE.Vector3();
  bbox.getCenter(centre);
  obj.position.sub(centre);
  const wrapper = new THREE.Group();
  wrapper.add(obj);
  return wrapper;
}
