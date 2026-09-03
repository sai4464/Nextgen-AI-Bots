"use client";

import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RotateCcw } from 'lucide-react';
import { Instance, Side } from '@/lib/robo-dog-steps';
import { ELECTRONIC_BUILDERS } from '@/lib/three-parts';
import * as RD from '@/lib/robo-dog';

const stlCache = new Map<string, Promise<THREE.BufferGeometry>>();
function loadStl(url: string) {
  if (!stlCache.has(url)) {
    stlCache.set(
      url,
      new Promise<THREE.BufferGeometry>((res, rej) =>
        new STLLoader().load(url, res, undefined, rej)
      )
    );
  }
  return stlCache.get(url)!;
}

/** Body-frame millimetres -> scene units, and stand the dog on its belly. */
const MM = 0.026;

/** How far along its approach a part is parked in the static exploded view. */
const DEFAULT_EXPLODE = 0.62;

/**
 * Builds the transform for one part.
 *
 * Flat leg plates live in their own XY plane, so they get a quarter turn about
 * Y to stand across the body, then a spin about body-X for their linkage angle.
 * Round parts (nuts, screws, spacers) already thread along X and need neither.
 */
function poseOf(inst: Instance, t: number) {
  const q = new THREE.Quaternion();
  if (inst.builder) {
    // Orientation already baked into the child group; only the fly-in moves.
    const target = new THREE.Vector3(...inst.position);
    const from = target.clone().add(new THREE.Vector3(...inst.anim.from));
    return { q, pos: from.lerp(target, t) };
  }
  if (inst.legPlate) {
    // A flat plate stood up across the body, then swung to its linkage angle.
    q.setFromEuler(new THREE.Euler(0, Math.PI / 2, 0));
  } else if (inst.flipAxis) {
    // Half turn about body Z, reversing the part's local +X. A rotation rather
    // than a mirror, so the mesh keeps its handedness and a printed thread
    // still winds the way it does in real life.
    q.setFromAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI);
  }
  if (inst.rotX) {
    // Linkage angle for a leg, crank phase for a spindle. Applied last so it
    // composes on top of whatever stood the part up.
    q.premultiply(
      new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), inst.rotX)
    );
  }
  if (inst.anim.spin) {
    const extra = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(1, 0, 0),
      inst.anim.spin * (1 - t)
    );
    q.premultiply(extra);
  }
  const target = new THREE.Vector3(...inst.position);
  const from = target.clone().add(new THREE.Vector3(...inst.anim.from));
  const pos = from.lerp(target, t);
  return { q, pos };
}

/**
 * A LEGO-manual placement arrow: a stubby shaft with a cone, drawn in the gap
 * between a parked part and the hole it drops into. Built in body-frame mm so
 * it can live in the same group as the parts.
 */
function buildArrow(from: THREE.Vector3, to: THREE.Vector3) {
  const g = new THREE.Group();
  const span = new THREE.Vector3().subVectors(to, from);
  const len = span.length();
  if (len < 1) return g;

  const headLen = Math.min(len * 0.44, 15);
  const shaftLen = len - headLen;
  const mat = new THREE.MeshBasicMaterial({ color: '#D72638' });

  if (shaftLen > 0.5) {
    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(2.6, 2.6, shaftLen, 12), mat);
    shaft.position.y = shaftLen / 2;
    g.add(shaft);
  }
  const head = new THREE.Mesh(new THREE.ConeGeometry(6.4, headLen, 16), mat);
  head.position.y = shaftLen + headLen / 2;
  g.add(head);

  // The arrow is authored pointing up its own +Y; aim it down the travel line.
  g.position.copy(from);
  g.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), span.clone().normalize());
  return g;
}

export interface AssemblyViewProps {
  /** Parts already standing, drawn solid and still. */
  settled: Instance[];
  /** Parts this step adds, drawn animating in. */
  animating?: Instance[];
  /** Bump to replay the animation. */
  playToken?: number;
  className?: string;
  /** Show the built-in replay button. */
  showReplay?: boolean;
  onReplay?: () => void;
  autoRotate?: boolean;
  /**
   * Hold a single still frame with the new parts parked off their holes and an
   * arrow pointing each one home, instead of playing the move.
   */
  staticPose?: boolean;
  /** Let the reader drag to spin. Off for the static reference figure. */
  interactive?: boolean;
  /**
   * Which side of the dog to look at. Body +X maps to scene -Z, so looking at
   * the right-hand side means putting the camera on -Z. Getting this wrong
   * shows the reader the blank side of the dog, with the action facing away.
   */
  viewSide?: Side;
  /**
   * Frame these parts and their approach instead of the whole dog. Used by the
   * placement strip, where each little panel zooms right in on one part going
   * into one hole.
   */
  focus?: Instance[];
  /** Camera station. `iso` is the default three-quarter view. */
  viewAxis?: ViewAxis;
  /** How far the parked part is pulled back off its hole, 0 to 1. */
  explode?: number;
  /** Multiplies the framed radius. Below 1 moves the camera closer in. */
  zoom?: number;
  /**
   * Fade everything outside `focus`. Only worth it when the target hole is
   * behind solid plastic, such as the underside views; on an ordinary panel a
   * see-through body makes the dog harder to recognise, not easier.
   */
  fadeContext?: boolean;
}

export type ViewAxis = 'iso' | 'side' | 'top' | 'bottom' | 'front' | 'topSide';

export function AssemblyView({
  settled,
  animating = [],
  playToken = 0,
  className = '',
  showReplay = false,
  onReplay,
  autoRotate = false,
  staticPose = false,
  interactive = true,
  viewSide = 'right',
  focus,
  viewAxis = 'iso',
  explode,
  zoom = 1,
  fadeContext = false,
}: AssemblyViewProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const startRef = useRef<number>(0);

  // Longest timeline in this step. The demo plays through once and then holds
  // on the finished assembly, and only runs again when Repeat Visual is pressed.
  const runSec =
    animating.length === 0
      ? 0
      : Math.max(...animating.map((i) => i.anim.delaySec + i.anim.durationSec));

  useEffect(() => {
    startRef.current = performance.now();
  }, [playToken]);

  const spread = explode ?? DEFAULT_EXPLODE;

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let disposed = false;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 200);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = !staticPose;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
    host.appendChild(renderer.domElement);

    scene.add(new THREE.HemisphereLight(0xffffff, 0xb0b5be, 0.95));
    scene.add(new THREE.AmbientLight(0xffffff, 0.32));
    const key = new THREE.DirectionalLight(0xffffff, 2.0);
    key.position.set(6, 10, 7);
    key.castShadow = !staticPose;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.left = -8;
    key.shadow.camera.right = 8;
    key.shadow.camera.top = 8;
    key.shadow.camera.bottom = -8;
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xdfe6f2, 0.75);
    fill.position.set(-7, 4, -5);
    scene.add(fill);
    scene.add(new THREE.AmbientLight(0xffe9c9, 0.12));

    // Presentation frame. The STL frame is X-across / Y-along / Z-up; the scene
    // is Y-up. Rotating -90 deg about X stands the dog on its belly, and the rig's
    // quarter turn swings its long axis across the view so it reads side-on.
    const world = new THREE.Group();
    world.scale.setScalar(MM);
    world.rotation.x = -Math.PI / 2;
    const rig = new THREE.Group();
    rig.rotation.y = Math.PI / 2;
    rig.add(world);
    scene.add(rig);

    // Recentre on the dog itself and drop it so the feet meet the ground plane.
    const BODY_CENTRE = new THREE.Vector3(RD.MID_X, RD.BODY_MID_Y, RD.GROUND_Z);

    if (!staticPose) {
      const ground = new THREE.Mesh(
        new THREE.PlaneGeometry(60, 60),
        new THREE.ShadowMaterial({ opacity: 0.2 })
      );
      ground.rotation.x = -Math.PI / 2;
      ground.position.y = 0;
      ground.receiveShadow = true;
      scene.add(ground);
    }

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enableRotate = interactive;
    controls.enableZoom = interactive;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 0.9;
    if (interactive) {
      controls.minPolarAngle = 0.25;
      controls.maxPolarAngle = Math.PI / 2 + 0.35;
    } else {
      // A still panel is allowed to look straight down or straight up; the
      // draggable one is not, because a reader can get lost under the floor.
      controls.minPolarAngle = 0;
      controls.maxPolarAngle = Math.PI;
      renderer.domElement.style.pointerEvents = 'none';
    }

    // --- fixed framing ---
    // Frame the whole finished dog, not just the parts present at this step, so
    // the view stays rock steady as the build grows.
    const B = RD.ASSEMBLY_BOUNDS;
    const sizeAlong = (B.y.max - B.y.min) * MM; // body length -> scene X
    const sizeUp = (B.z.max - B.z.min) * MM;    // body height -> scene Y
    const sizeAcross = (B.x.max - B.x.min) * MM;
    const centreY = ((B.z.min + B.z.max) / 2 - RD.GROUND_Z) * MM;

    // The presentation rig maps the body frame onto the scene like this:
    //   body +X (right side) -> scene -Z
    //   body +Y (tail)       -> scene -X
    //   body +Z (up)         -> scene +Y
    // Every camera station below is written in scene space off the back of it.
    const towards = viewSide === 'right' ? -1 : 1;
    const STATION: Record<ViewAxis, THREE.Vector3> = {
      iso: new THREE.Vector3(0.62, 0.42, 0.86 * towards),
      side: new THREE.Vector3(0.04, 0.16, 1 * towards),
      top: new THREE.Vector3(0.06, 1, 0.14 * towards),
      bottom: new THREE.Vector3(0.06, -1, 0.14 * towards),
      front: new THREE.Vector3(1, 0.22, 0.06 * towards),
      // High three-quarter: steep enough to look into the holes along the leg,
      // shallow enough that the leg still reads as a leg.
      topSide: new THREE.Vector3(0.3, 0.8, 0.62 * towards),
    };
    const VIEW_DIR = STATION[viewAxis].clone().normalize();

    /** Body-frame millimetres to a point in the scene. */
    const toScene = (p: THREE.Vector3) => {
      world.updateMatrixWorld(true);
      return world.localToWorld(p.clone().sub(BODY_CENTRE));
    };

    /**
     * When focusing, frame the parts themselves plus where they come from, so
     * the part, the arrow and the hole are all guaranteed to be in shot. The
     * whole-dog path keeps its fixed box so the view never jitters as the
     * build grows.
     */
    const focusFraming = () => {
      if (!focus || focus.length === 0) return null;
      const box = new THREE.Box3();
      // Frame the FIRST focused part only. A group holds the front and rear
      // copy of the same part, and they sit a body-length apart, so framing
      // both zooms out until each one is a speck. All of them still get parked
      // and arrowed; this is only about where the camera sits.
      for (const inst of focus.slice(0, 1)) {
        const target = new THREE.Vector3(...inst.position);
        const travel = new THREE.Vector3(...inst.anim.from);
        box.expandByPoint(toScene(target));
        box.expandByPoint(toScene(target.clone().add(travel.clone().multiplyScalar(spread))));
        for (const extra of inst.arrowTo ?? []) box.expandByPoint(toScene(new THREE.Vector3(...extra)));
        // Real extents where the mesh has arrived; the point above is only a
        // fallback for the frames before it loads.
        const l = live.find((x) => x.inst.key === inst.key);
        if (l) box.union(new THREE.Box3().setFromObject(l.obj));
      }
      const centre = new THREE.Vector3();
      box.getCenter(centre);
      const size = new THREE.Vector3();
      box.getSize(size);
      // Enough air that the focused part and the hole it is heading for are
      // never touching an edge. The surrounding dog is allowed to run past the
      // frame; this is a detail view, not a portrait.
      const radius = (Math.max(size.length() / 2, 0.2) * 1.45 + 0.35) * zoom;
      return { centre, radius };
    };

    const fitCamera = () => {
      const vFov = THREE.MathUtils.degToRad(camera.fov);
      const hFov = 2 * Math.atan(Math.tan(vFov / 2) * camera.aspect);

      const f = focusFraming();
      if (f) {
        const dist = (f.radius / Math.tan(Math.min(vFov, hFov) / 2)) * 1.15;
        camera.position.copy(VIEW_DIR).multiplyScalar(dist).add(f.centre);
        camera.near = Math.max(dist / 80, 0.001);
        camera.far = dist * 12 + 40;
        camera.updateProjectionMatrix();
        controls.target.copy(f.centre);
        controls.update();
        return;
      }

      const distV = sizeUp / 2 / Math.tan(vFov / 2);
      const distH = Math.max(sizeAlong, sizeAcross) / 2 / Math.tan(hFov / 2);
      const dist = Math.max(distV, distH) * (staticPose ? 1.34 : 1.28);
      camera.position.copy(VIEW_DIR).multiplyScalar(dist).add(new THREE.Vector3(0, centreY, 0));
      camera.near = dist / 80;
      camera.far = dist * 12;
      camera.updateProjectionMatrix();
      controls.target.set(0, centreY, 0);
      controls.update();
    };

    // --- build meshes ---
    interface Live {
      inst: Instance;
      obj: THREE.Group;
      moving: boolean;
    }
    const live: Live[] = [];
    // Framing from part positions alone treats each part as a point, so a long
    // leg parked off its hole runs straight out of the panel. Once the focused
    // meshes exist and have been posed, the camera is fitted again against
    // their real bounding boxes.
    const focusSet = focus && focus.length ? new Set(focus.map((i) => i.key)) : null;
    let pendingRefit = !!focusSet;

    // Anything outside the focus set is context, so it is faded down and the
    // eye goes to the part this panel is actually about. Decided here rather
    // than in a pass afterwards, because the STLs resolve asynchronously and
    // a later sweep would run against a half-empty list.
    const focusKeys =
      fadeContext && focus && focus.length ? new Set(focus.map((i) => i.key)) : null;

    const attach = (obj: THREE.Object3D, inst: Instance, moving: boolean) => {
      if (focusKeys && !focusKeys.has(inst.key)) {
        obj.traverse((o) => {
          const mat = (o as THREE.Mesh).material as THREE.MeshStandardMaterial | undefined;
          if (mat && 'opacity' in mat) {
            mat.transparent = true;
            mat.opacity = 0.3;
          }
        });
      }
      const holder = new THREE.Group();
      holder.add(obj);
      holder.position.sub(BODY_CENTRE);
      world.add(holder);
      live.push({ inst, obj: holder, moving });
    };

    const add = (inst: Instance, moving: boolean) => {
      if (inst.builder) {
        // Procedural electronics are authored in their own unit scale, so they
        // get scaled into millimetres and turned to sit in the body frame.
        const built = ELECTRONIC_BUILDERS[inst.builder]();
        built.scale.setScalar(inst.scaleMm ?? 1);
        if (inst.euler) built.rotation.set(...inst.euler);
        const wrap = new THREE.Group();
        if (inst.bodyEuler) wrap.rotation.set(...inst.bodyEuler);
        wrap.add(built);
        attach(wrap, inst, moving);
        return;
      }
      loadStl(inst.stl!).then((geo) => {
        if (disposed) return;
        const g = geo.clone();
        g.computeVertexNormals();
        // Re-origin the mesh onto the anchor this instance is positioned by.
        g.translate(-inst.anchor[0], -inst.anchor[1], -inst.anchor[2]);
        const mesh = new THREE.Mesh(
          g,
          new THREE.MeshStandardMaterial({
            color: inst.color,
            roughness: 0.68,
            metalness: 0.05,
          })
        );
        mesh.castShadow = !staticPose;
        mesh.receiveShadow = !staticPose;
        if (inst.mirrored) {
          // Mirror across the body, not along the part. A leg plate's local X
          // runs down its length, so flipping that would reverse the leg
          // end-for-end; its thickness is local Z. Round parts (the spindle)
          // thread along local X, so for those X is the correct axis.
          if (inst.legPlate) mesh.scale.z = -1;
          else mesh.scale.x = -1;
        }

        attach(mesh, inst, moving);
        if (focusSet?.has(inst.key)) pendingRefit = true;
      });
    };

    settled.forEach((i) => add(i, false));
    animating.forEach((i) => add(i, true));

    // Placement arrows for the still reference figure.
    if (staticPose) {
      for (const inst of focus && focus.length ? focus : animating) {
        const travel = new THREE.Vector3(...inst.anim.from);
        if (travel.length() < 4) continue;
        const target = new THREE.Vector3(...inst.position);
        const parked = target.clone().add(travel.clone().multiplyScalar(spread));
        // Stop short of the part and of its hole, so the arrow reads as a gap.
        const draw = (to: THREE.Vector3) => {
          const arrow = buildArrow(parked.clone().lerp(to, 0.18), parked.clone().lerp(to, 0.88));
          arrow.position.sub(BODY_CENTRE);
          world.add(arrow);
        };
        if (inst.reverseArrow) {
          // Coming off, so the arrow runs from the hole out to the parked part.
          const arrow = buildArrow(target.clone().lerp(parked, 0.18), target.clone().lerp(parked, 0.88));
          arrow.position.sub(BODY_CENTRE);
          world.add(arrow);
        } else {
          draw(target);
          for (const extra of inst.arrowTo ?? []) draw(new THREE.Vector3(...extra));
        }
      }
    }

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = host;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      fitCamera();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      // Clamped, not wrapped: the animation settles and stays settled.
      const elapsed = Math.min((performance.now() - startRef.current) / 1000, runSec + 0.5);
      for (const l of live) {
        const a = l.inst.anim;
        let t = 1;
        if (l.moving) {
          if (staticPose) {
            // Parked short of home, with an arrow doing the explaining.
            t = 1 - spread;
          } else {
            const local = (elapsed - a.delaySec) / a.durationSec;
            t = easeInOut(Math.min(Math.max(local, 0), 1));
          }
        }
        const { q, pos } = poseOf(l.inst, l.inst.reverseArrow ? 1 - t : t);
        l.obj.quaternion.copy(q);
        l.obj.position.copy(pos).sub(BODY_CENTRE);
        // Hide a moving part until its moment arrives.
        l.obj.visible = staticPose || !l.moving || elapsed >= a.delaySec - 0.05;
      }
      if (pendingRefit) {
        // Poses are applied above, so the bounding boxes are meaningful now.
        pendingRefit = false;
        fitCamera();
      }
      controls.update();
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      controls.dispose();
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.geometry) m.geometry.dispose();
        const mat = m.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
        else mat?.dispose();
      });
      renderer.dispose();
      if (renderer.domElement.parentNode === host) host.removeChild(renderer.domElement);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    settled.map((i) => i.key).join(','),
    animating.map((i) => i.key).join(','),
    autoRotate,
    runSec,
    staticPose,
    interactive,
    viewSide,
    viewAxis,
    spread,
    zoom,
    fadeContext,
    focus?.map((i) => i.key).join(',') ?? '',
  ]);

  return (
    <div className={`relative h-full w-full ${className}`}>
      <div ref={hostRef} className="h-full w-full" />
      {showReplay && (
        <button
          onClick={onReplay}
          className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-[#D72638] px-4 py-2.5 text-[13px] font-extrabold uppercase tracking-wide text-white shadow-[0_3px_0_#8f1a26] transition hover:bg-[#e83346] active:translate-y-[2px] active:shadow-[0_1px_0_#8f1a26]"
        >
          <RotateCcw className="h-4 w-4" />
          Repeat Visual
        </button>
      )}
    </div>
  );
}

/**
 * Gentle S-curve. A cubic ease-out covers 90% of the travel in the first half
 * of its duration, which reads as a snap rather than a demonstration; this
 * keeps the part visibly moving for most of the step.
 */
const easeInOut = (x: number) =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

/** Convenience wrapper that owns its own replay token. */
export function StepVisual({
  settled,
  animating,
  className,
  viewSide,
}: {
  settled: Instance[];
  animating: Instance[];
  className?: string;
  viewSide?: Side;
}) {
  const [token, setToken] = useState(0);
  const replay = useCallback(() => setToken((t) => t + 1), []);
  return (
    <AssemblyView
      settled={settled}
      animating={animating}
      playToken={token}
      showReplay
      onReplay={replay}
      className={className}
      viewSide={viewSide}
    />
  );
}
