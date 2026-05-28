"use client";

import { useRef, useMemo, Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { usePrefersReducedMotion } from "@/lib/hooks/useMediaQuery";

/* ─── Shared mouse (one listener for whole scene) ─── */
function useMouseParallax() {
  const mouse = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return mouse;
}

/* ─── Animated terminal screen lines ─── */
const CODE_LINES = [
  { w: 1.1, color: "#22d3ee", y: 0.32 },
  { w: 0.85, color: "#a78bfa", y: 0.14 },
  { w: 0.95, color: "#60a5fa", y: -0.04 },
  { w: 0.7, color: "#f472b6", y: -0.22 },
  { w: 0.55, color: "#34d399", y: -0.38 },
];

function CodeScreen() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.children.forEach((child, i) => {
      if (child instanceof THREE.Mesh) {
        const mat = child.material as THREE.MeshBasicMaterial;
        mat.opacity = 0.55 + Math.sin(t * 2 + i * 0.8) * 0.35;
      }
    });
  });

  return (
    <group ref={group} position={[0, 0.02, 0.026]}>
      {CODE_LINES.map((line, i) => (
        <mesh key={i} position={[-0.42 + line.w / 2, line.y, 0]}>
          <boxGeometry args={[line.w, 0.055, 0.01]} />
          <meshBasicMaterial color={line.color} transparent opacity={0.8} />
        </mesh>
      ))}
      {/* Cursor blink */}
      <mesh position={[0.52, -0.38, 0.015]}>
        <boxGeometry args={[0.04, 0.055, 0.01]} />
        <meshBasicMaterial color="#22d3ee" />
      </mesh>
    </group>
  );
}

/* ─── Monitor + keyboard workstation ─── */
function DevWorkstation({ mouse }: { mouse: React.RefObject<{ x: number; y: number }> }) {
  const rig = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!rig.current) return;
    rig.current.rotation.y = THREE.MathUtils.lerp(
      rig.current.rotation.y,
      mouse.current.x * 0.35,
      0.04
    );
    rig.current.rotation.x = THREE.MathUtils.lerp(
      rig.current.rotation.x,
      mouse.current.y * 0.15,
      0.04
    );
    rig.current.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.06;
  });

  return (
    <group ref={rig}>
      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.25}>
        {/* Monitor stand */}
        <mesh position={[0, -0.42, 0]}>
          <boxGeometry args={[0.12, 0.35, 0.12]} />
          <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[0, -0.62, 0]}>
          <boxGeometry args={[0.7, 0.04, 0.45]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Monitor frame */}
        <mesh position={[0, 0.15, 0]}>
          <boxGeometry args={[1.85, 1.15, 0.07]} />
          <meshStandardMaterial color="#0f172a" metalness={0.85} roughness={0.15} />
        </mesh>

        {/* Screen glow */}
        <mesh position={[0, 0.15, 0.038]}>
          <planeGeometry args={[1.62, 0.98]} />
          <meshBasicMaterial color="#1d4ed8" transparent opacity={0.12} />
        </mesh>

        {/* Screen surface */}
        <mesh position={[0, 0.15, 0.04]}>
          <planeGeometry args={[1.58, 0.94]} />
          <meshStandardMaterial
            color="#020617"
            emissive="#2563eb"
            emissiveIntensity={0.45}
            metalness={0.2}
            roughness={0.8}
          />
        </mesh>

        <group position={[0, 0.15, 0.045]}>
          <CodeScreen />
        </group>

        {/* Keyboard */}
        <mesh position={[0, -0.28, 0.42]} rotation={[0.18, 0, 0]}>
          <boxGeometry args={[1.35, 0.04, 0.42]} />
          <meshStandardMaterial color="#1e293b" metalness={0.6} roughness={0.35} />
        </mesh>

        {/* Coffee mug accent */}
        <mesh position={[1.15, -0.2, 0.35]}>
          <cylinderGeometry args={[0.09, 0.08, 0.18, 12]} />
          <meshStandardMaterial
            color="#334155"
            emissive="#f59e0b"
            emissiveIntensity={0.15}
          />
        </mesh>
      </Float>
    </group>
  );
}

/* ─── Orbiting tech chips (6 meshes — lightweight) ─── */
const CHIP_DATA = [
  { color: "#61dafb", label: "React" },
  { color: "#8b5cf6", label: "PHP" },
  { color: "#22c55e", label: "Node" },
  { color: "#f97316", label: "MySQL" },
  { color: "#ec4899", label: "Shopify" },
  { color: "#06b6d4", label: "API" },
];

function TechOrbit({ mouse }: { mouse: React.RefObject<{ x: number; y: number }> }) {
  const chips = useRef<THREE.Group>(null);
  const radius = 2.35;

  useFrame((state) => {
    if (!chips.current) return;
    const t = state.clock.elapsedTime * 0.35;
    chips.current.rotation.y = t + mouse.current.x * 0.12;

    chips.current.children.forEach((child, i) => {
      const a = (i / CHIP_DATA.length) * Math.PI * 2 + t;
      const y = Math.sin(t * 1.5 + i) * 0.18;
      child.position.set(Math.cos(a) * radius, y + 0.15, Math.sin(a) * radius);
      child.lookAt(0, child.position.y, 0);
    });
  });

  return (
    <group ref={chips}>
      {CHIP_DATA.map((chip) => (
        <group key={chip.label}>
          <mesh>
            <boxGeometry args={[0.38, 0.22, 0.06]} />
            <meshStandardMaterial
              color={chip.color}
              emissive={chip.color}
              emissiveIntensity={0.55}
              metalness={0.4}
              roughness={0.35}
            />
          </mesh>
          <mesh position={[0, 0, 0.04]}>
            <planeGeometry args={[0.28, 0.1]} />
            <meshBasicMaterial color="#0f172a" transparent opacity={0.85} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ─── Lightweight particles ─── */
function SoftParticles() {
  const ref = useRef<THREE.Points>(null);
  const count = 45;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 7;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 5;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.015;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#93c5fd"
        transparent
        opacity={0.65}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ─── Simple floor grid (cheap GridHelper) ─── */
function FloorGrid() {
  const grid = useMemo(() => {
    const g = new THREE.GridHelper(12, 16, "#1e40af", "#0c1929");
    g.position.y = -0.85;
    return g;
  }, []);

  return <primitive object={grid} />;
}

/* ─── Floating code symbols { } <> ─── */
function CodeSymbols() {
  const group = useRef<THREE.Group>(null);

  const symbols = useMemo(
    () => [
      { pos: [-2.2, 1.1, -0.5] as [number, number, number], scale: 0.2 },
      { pos: [2.4, 0.8, -0.8] as [number, number, number], scale: 0.16 },
      { pos: [-1.8, -0.5, 0.6] as [number, number, number], scale: 0.14 },
    ],
    []
  );

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.children.forEach((child, i) => {
      child.position.y = symbols[i].pos[1] + Math.sin(t + i * 2) * 0.08;
      child.rotation.y = t * 0.3 + i;
    });
  });

  return (
    <group ref={group}>
      {symbols.map((s, i) => (
        <mesh key={i} position={s.pos} scale={s.scale}>
          <torusGeometry args={[1, 0.08, 6, 12]} />
          <meshBasicMaterial
            color={i === 0 ? "#22d3ee" : i === 1 ? "#a78bfa" : "#f472b6"}
            transparent
            opacity={0.7}
            wireframe
          />
        </mesh>
      ))}
    </group>
  );
}

function SceneContent() {
  const mouse = useMouseParallax();
  const reducedMotion = usePrefersReducedMotion();

  if (reducedMotion) {
    return (
      <>
        <ambientLight intensity={0.6} />
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.5, 1, 0.1]} />
          <meshStandardMaterial color="#1e40af" emissive="#3b82f6" emissiveIntensity={0.3} />
        </mesh>
      </>
    );
  }

  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 5]} intensity={0.9} color="#93c5fd" />
      <pointLight position={[-3, 2, 2]} intensity={0.4} color="#c084fc" />

      <FloorGrid />
      <SoftParticles />
      <DevWorkstation mouse={mouse} />
      <TechOrbit mouse={mouse} />
      <CodeSymbols />
    </>
  );
}

export function HeroScene() {
  return (
    <div className="relative z-0 h-full w-full">
      {/* CSS glow — zero GPU cost */}
      <div
        className="pointer-events-none absolute inset-0 rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(ellipse at 55% 45%, rgba(59,130,246,0.25) 0%, rgba(139,92,246,0.08) 40%, transparent 70%)",
        }}
        aria-hidden
      />
      <Canvas
        camera={{ position: [0, 0.35, 4.2], fov: 42 }}
        dpr={[1, 1.25]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
        }}
        frameloop="always"
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  );
}
