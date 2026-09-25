"use client";

import { useRef, useMemo, Suspense, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
  PerformanceMonitor,
  RoundedBox,
  Sparkles,
} from "@react-three/drei";
import * as THREE from "three";
import { usePrefersReducedMotion } from "@/lib/hooks/useMediaQuery";

type Vec2Ref = React.RefObject<{ x: number; y: number }>;

/* ─── Pointer + scroll tracking (one listener each for the whole scene) ─── */
function useSceneInputs() {
  const pointer = useRef({ x: 0, y: 0 });
  const scroll = useRef({ x: 0, y: 0 }); // y = 0..1 progress through the first viewport

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    const container = document.getElementById("scroll-container");
    const onScroll = () => {
      if (!container) return;
      scroll.current.y = Math.min(1, container.scrollTop / window.innerHeight);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    container?.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      container?.removeEventListener("scroll", onScroll);
    };
  }, []);

  return { pointer, scroll };
}

/* ─── Glowing distorted core wrapped in a wireframe shell ─── */
function Core({ compact }: { compact: boolean }) {
  const shell = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (shell.current) {
      shell.current.rotation.x += delta * 0.12;
      shell.current.rotation.y -= delta * 0.18;
    }
    if (inner.current) {
      inner.current.rotation.y += delta * 0.25;
      const s = 1 + Math.sin(t * 1.4) * 0.03;
      inner.current.scale.setScalar(s);
    }
  });

  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={inner}>
        <icosahedronGeometry args={[0.95, compact ? 12 : 24]} />
        <MeshDistortMaterial
          color="#3b82f6"
          emissive="#1d4ed8"
          emissiveIntensity={0.35}
          roughness={0.25}
          metalness={0.3}
          distort={0.4}
          speed={2}
        />
      </mesh>
      <mesh ref={shell} scale={1.42}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.28} />
      </mesh>
      {/* Soft halo */}
      <mesh scale={1.9}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#6366f1"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>
    </Float>
  );
}

/* ─── Tilted orbit rings, each with a comet travelling along it ─── */
const RINGS = [
  { r: 1.9, tilt: [1.2, 0.2, 0], color: "#22d3ee", speed: 0.7 },
  { r: 2.25, tilt: [0.4, 0.9, 0.3], color: "#a78bfa", speed: -0.5 },
  { r: 2.6, tilt: [1.8, -0.5, 0.6], color: "#f472b6", speed: 0.35 },
] as const;

function OrbitRing({
  r,
  tilt,
  color,
  speed,
}: (typeof RINGS)[number]) {
  const comet = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!comet.current) return;
    const a = state.clock.elapsedTime * speed;
    comet.current.position.set(Math.cos(a) * r, Math.sin(a) * r, 0);
  });

  return (
    <group rotation={tilt as unknown as [number, number, number]}>
      <mesh>
        <torusGeometry args={[r, 0.006, 8, 160]} />
        <meshBasicMaterial color={color} transparent opacity={0.35} />
      </mesh>
      <mesh ref={comet}>
        <sphereGeometry args={[0.055, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
}

/* ─── Floating tech chips ─── */
const CHIPS = [
  { color: "#61dafb", pos: [-2.5, 1.2, -0.4] },
  { color: "#8b5cf6", pos: [2.6, 1.0, -0.8] },
  { color: "#22c55e", pos: [-2.2, -1.2, 0.4] },
  { color: "#f97316", pos: [2.3, -1.1, 0.2] },
  { color: "#ec4899", pos: [0.2, 2.0, -1.2] },
  { color: "#06b6d4", pos: [-0.4, -2.0, -0.6] },
] as const;

function TechChips({ compact }: { compact: boolean }) {
  const list = compact ? CHIPS.slice(0, 4) : CHIPS;
  return (
    <>
      {list.map((chip, i) => (
        <Float
          key={i}
          speed={1.5 + i * 0.2}
          rotationIntensity={1.2}
          floatIntensity={1.2}
          position={chip.pos as unknown as [number, number, number]}
        >
          <RoundedBox args={[0.42, 0.26, 0.06]} radius={0.04} smoothness={3}>
            <meshStandardMaterial
              color={chip.color}
              emissive={chip.color}
              emissiveIntensity={0.6}
              metalness={0.5}
              roughness={0.3}
            />
          </RoundedBox>
          <mesh position={[0, 0, 0.035]}>
            <planeGeometry args={[0.3, 0.12]} />
            <meshBasicMaterial color="#0f172a" transparent opacity={0.85} />
          </mesh>
          {[0.05, 0, -0.03].map((y, j) => (
            <mesh key={j} position={[-0.04 + j * 0.02, y, 0.04]}>
              <planeGeometry args={[0.18 - j * 0.04, 0.012]} />
              <meshBasicMaterial color={chip.color} />
            </mesh>
          ))}
        </Float>
      ))}
    </>
  );
}

/* ─── Rig: parallax from pointer, drift away on scroll ─── */
function Rig({
  pointer,
  scroll,
  children,
}: {
  pointer: Vec2Ref;
  scroll: Vec2Ref;
  children: React.ReactNode;
}) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const s = scroll.current.y;
    const t = state.clock.elapsedTime;
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, pointer.current.x * 0.4 + t * 0.05 + s * 1.2, 0.05);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, -pointer.current.y * 0.25 + s * 0.4, 0.05);
    g.position.y = THREE.MathUtils.lerp(g.position.y, s * 1.2, 0.08);
    const scale = THREE.MathUtils.lerp(g.scale.x, 1 - s * 0.35, 0.08);
    g.scale.setScalar(scale);
  });

  return <group ref={group}>{children}</group>;
}

function SceneContent({ compact }: { compact: boolean }) {
  const { pointer, scroll } = useSceneInputs();

  const lights = useMemo(
    () => (
      <>
        <ambientLight intensity={0.2} />
        <directionalLight position={[4, 5, 5]} intensity={1.6} color="#bfdbfe" />
        <pointLight position={[-3, -2, 2]} intensity={14} color="#c084fc" />
        <pointLight position={[3, 1, 3]} intensity={10} color="#22d3ee" />
      </>
    ),
    []
  );

  return (
    <>
      {lights}
      <Rig pointer={pointer} scroll={scroll}>
        <Core compact={compact} />
        {RINGS.map((ring, i) => (
          <OrbitRing key={i} {...ring} />
        ))}
        <TechChips compact={compact} />
      </Rig>
      <Sparkles
        count={compact ? 40 : 90}
        scale={[7, 5, 4]}
        size={compact ? 2.5 : 2}
        speed={0.35}
        opacity={0.7}
        color="#93c5fd"
      />
    </>
  );
}

function StaticScene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 5, 5]} intensity={1} />
      <mesh>
        <icosahedronGeometry args={[1, 2]} />
        <meshStandardMaterial color="#1e40af" emissive="#3b82f6" emissiveIntensity={0.3} flatShading />
      </mesh>
    </>
  );
}

export function HeroScene({ compact = false }: { compact?: boolean }) {
  const wrapper = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [inView, setInView] = useState(true);
  const [dpr, setDpr] = useState(compact ? 1 : 1.5);

  // Stop rendering when the hero is off-screen — saves battery on phones
  useEffect(() => {
    const el = wrapper.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapper} className="relative h-full w-full">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(59,130,246,0.28) 0%, rgba(139,92,246,0.1) 35%, transparent 65%)",
        }}
        aria-hidden
      />
      <Canvas
        camera={{ position: [0, 0, compact ? 7 : 6.2], fov: 45 }}
        dpr={dpr}
        gl={{
          antialias: !compact,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
        }}
        frameloop={inView && !reducedMotion ? "always" : "demand"}
        style={{ background: "transparent" }}
      >
        <PerformanceMonitor
          onDecline={() => setDpr(1)}
          onIncline={() => setDpr(compact ? 1.25 : 1.75)}
        />
        <Suspense fallback={null}>
          {reducedMotion ? <StaticScene /> : <SceneContent compact={compact} />}
        </Suspense>
      </Canvas>
    </div>
  );
}
