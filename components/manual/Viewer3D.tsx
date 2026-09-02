"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {
  ELECTRONIC_BUILDERS,
  ElectronicKind,
  normalise,
  recentreOnly,
} from '@/lib/three-parts';

type Vec3 = [number, number, number];

export type SceneItem =
  | {
      kind: 'stl';
      url: string;
      color: string;
      fitTo?: number;
      position?: Vec3;
      rotation?: Vec3;
      /**
       * Show the part the way it sits on the finished dog: belly down, length
       * across the view. Uses the same two-stage rotation as the assembly view
       * so a part never reads differently between the two.
       */
      standUp?: boolean;
      /** Draw faded, for parts already built in an earlier step. */
      ghost?: boolean;
    }
  | {
      kind: ElectronicKind;
      fitTo?: number;
      position?: Vec3;
      rotation?: Vec3;
      open?: boolean;
      showWires?: boolean;
    };

interface Viewer3DProps {
  items: SceneItem[];
  /** Head-room around the framed content. 1 = tight, higher = more margin. */
  padding?: number;
  className?: string;
  autoRotate?: boolean;
  interactive?: boolean;
  /**
   * Frame this many millimetres across instead of fitting the part.
   * Every thumbnail sharing a value renders at the same scale, so the body
   * looks like a body and the spindle cap looks like a fingernail.
   */
  frameMm?: number;
}

const stlCache = new Map<string, Promise<THREE.BufferGeometry>>();

function loadStl(url: string) {
  if (!stlCache.has(url)) {
    stlCache.set(
      url,
      new Promise<THREE.BufferGeometry>((resolve, reject) =>
        new STLLoader().load(url, resolve, undefined, reject)
      )
    );
  }
  return stlCache.get(url)!;
}

/**
 * Every 3D figure in the manual renders through here.
 *
 * This drives three.js directly rather than through react-three-fiber: R3F's
 * reconciler builds a renderer but never runs a render pass under this
 * Next 13 / SWC-wasm setup, leaving every canvas blank. Owning the loop also
 * means the interactive take-apart model can reuse this same scene graph.
 */
export function Viewer3D({
  items,
  padding = 1.35,
  className = '',
  autoRotate = true,
  interactive = true,
  frameMm,
}: Viewer3DProps) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let disposed = false;
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 1000);
    // Direction only; fitView() sets the distance once content exists.
    const VIEW_DIR = new THREE.Vector3(0.75, 0.55, 0.8).normalize();
    camera.position.copy(VIEW_DIR).multiplyScalar(10);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    host.appendChild(renderer.domElement);

    // --- lights (explicit, so nothing streams from a CDN) ---
    scene.add(new THREE.HemisphereLight(0xffffff, 0xb8bcc4, 0.9));
    scene.add(new THREE.AmbientLight(0xffffff, 0.35));

    const key = new THREE.DirectionalLight(0xffffff, 2.0);
    key.position.set(5, 8, 6);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    scene.add(key);

    const fill = new THREE.DirectionalLight(0xdfe6f2, 0.8);
    fill.position.set(-6, 3, -4);
    scene.add(fill);

    const bounce = new THREE.DirectionalLight(0xffe9c9, 0.4);
    bounce.position.set(0, -4, 3);
    scene.add(bounce);

    // --- contact shadow catcher ---
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(30, 30),
      new THREE.ShadowMaterial({ opacity: 0.22 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -2.3;
    ground.receiveShadow = true;
    scene.add(ground);

    // --- controls ---
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableZoom = interactive;
    controls.enableRotate = interactive;
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 1.4;
    controls.minPolarAngle = 0.3;
    controls.maxPolarAngle = Math.PI - 0.4;
    if (!interactive) renderer.domElement.style.pointerEvents = 'none';

    const content = new THREE.Group();
    scene.add(content);

    /** Set for static viewers so late-arriving geometry still gets drawn. */
    let renderQueue: (() => void) | null = null;

    /**
     * Frames whatever is currently in `content`. Parts arrive at very
     * different scales and aspect ratios (a 187 mm chassis vs a 9 mm cap), so
     * the camera distance is derived from the real bounding box against both
     * the vertical and horizontal field of view rather than hand-tuned.
     */
    const fitView = () => {
      if (!content.children.length) return;
      if (frameMm) {
        // Shared-scale mode: hold the camera still and let real size show.
        const bbox0 = new THREE.Box3().setFromObject(content);
        if (bbox0.isEmpty()) return;
        const c0 = new THREE.Vector3();
        bbox0.getCenter(c0);
        content.position.sub(c0);
        const vFov0 = THREE.MathUtils.degToRad(camera.fov);
        const hFov0 = 2 * Math.atan(Math.tan(vFov0 / 2) * camera.aspect);
        const d0 = frameMm / 2 / Math.tan(hFov0 / 2);
        camera.position.copy(VIEW_DIR).multiplyScalar(d0);
        camera.near = d0 / 100;
        camera.far = d0 * 20;
        camera.updateProjectionMatrix();
        controls.target.set(0, 0, 0);
        controls.update();
        ground.position.y = -frameMm / 2;
        return;
      }
      const bbox = new THREE.Box3().setFromObject(content);
      if (bbox.isEmpty()) return;

      const size = new THREE.Vector3();
      const centre = new THREE.Vector3();
      bbox.getSize(size);
      bbox.getCenter(centre);

      // Recentre the group so orbiting spins around the content, not the origin.
      content.position.sub(centre);

      const vFov = THREE.MathUtils.degToRad(camera.fov);
      const hFov = 2 * Math.atan(Math.tan(vFov / 2) * camera.aspect);
      const distV = size.y / 2 / Math.tan(vFov / 2);
      const distH = Math.max(size.x, size.z) / 2 / Math.tan(hFov / 2);
      const dist = Math.max(distV, distH, 0.5) * padding + Math.max(size.x, size.y, size.z) * 0.25;

      camera.position.copy(VIEW_DIR).multiplyScalar(dist);
      camera.near = Math.max(dist / 100, 0.01);
      camera.far = dist * 20;
      camera.updateProjectionMatrix();
      controls.target.set(0, 0, 0);
      controls.update();

      ground.position.y = -size.y / 2 - dist * 0.02;
    };

    const place = (obj: THREE.Object3D, item: SceneItem) => {
      let wrapper = frameMm
        ? recentreOnly(obj)
        : normalise(obj, item.fitTo ?? 2.4);
      if (item.kind === 'stl' && item.standUp) {
        wrapper.rotation.x = -Math.PI / 2;
        const outer = new THREE.Group();
        outer.rotation.y = Math.PI / 2;
        outer.add(wrapper);
        wrapper = outer;
      } else if (item.rotation) {
        wrapper.rotation.set(...item.rotation);
      }
      if (item.position) wrapper.position.add(new THREE.Vector3(...item.position));
      content.add(wrapper);
      fitView();
      renderQueue?.();
    };

    for (const item of items) {
      if (item.kind === 'stl') {
        loadStl(item.url)
          .then((geo) => {
            if (disposed) return;
            const g = geo.clone();
            g.computeVertexNormals();
            const mesh = new THREE.Mesh(
              g,
              new THREE.MeshStandardMaterial({
                color: item.ghost ? '#c9ccd1' : item.color,
                roughness: 0.72,
                metalness: 0.06,
                transparent: !!item.ghost,
                opacity: item.ghost ? 0.3 : 1,
              })
            );
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            place(mesh, item);
          })
          .catch((err) => console.error('[manual] STL failed:', item.url, err));
      } else {
        const build = ELECTRONIC_BUILDERS[item.kind] as (a?: boolean) => THREE.Group;
        const obj =
          item.kind === 'connector' ? build(item.open ?? false) : build(item.showWires ?? true);
        place(obj, item);
      }
    }

    // --- size to host ---
    const resize = () => {
      const { clientWidth: w, clientHeight: h } = host;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      fitView();
      renderQueue?.();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    // --- render loop ---
    // A static thumbnail (no auto-rotate, no interaction) has nothing to
    // animate, so it draws once per change instead of holding a rAF loop open.
    // The parts-list spread alone shows nine of these at a time.
    const animated = autoRotate || interactive;
    let raf = 0;

    const drawOnce = () => {
      controls.update();
      renderer.render(scene, camera);
    };

    if (animated) {
      const tick = () => {
        raf = requestAnimationFrame(tick);
        drawOnce();
      };
      tick();
    } else {
      drawOnce();
      // Re-draw when an async STL lands or the box is resized.
      renderQueue = drawOnce;
      if (interactive) controls.addEventListener('change', drawOnce);
    }

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      if (renderQueue) controls.removeEventListener('change', renderQueue);
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
  }, [JSON.stringify(items), padding, autoRotate, interactive, frameMm]);

  return <div ref={hostRef} className={`h-full w-full ${className}`} />;
}
