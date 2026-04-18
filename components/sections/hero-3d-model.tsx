"use client"

import { Suspense, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import {
  Environment,
  Float,
  Sparkles,
  Sphere,
} from "@react-three/drei"
import * as THREE from "three"

/* ─── Geometric Architectural Core ────────────────────────────────────────── */
function GeometricCore({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  const coreRef = useRef<THREE.Mesh>(null)
  const wireRef = useRef<THREE.Mesh>(null)
  const ring1Ref = useRef<THREE.Mesh>(null)
  const ring2Ref = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const [mx, my] = mouse.current

    // Parallax group based on mouse
    if (groupRef.current) {
      // Smooth interpolation for mouse movement
      groupRef.current.rotation.x += (my * 0.3 - groupRef.current.rotation.x) * 0.1
      groupRef.current.rotation.y += (mx * 0.3 - groupRef.current.rotation.y) * 0.1
    }

    // Rotate core
    if (coreRef.current) {
      coreRef.current.rotation.x = t * 0.15
      coreRef.current.rotation.y = t * 0.2
    }
    
    // Rotate wireframe opposite with a slight breathing scale
    if (wireRef.current) {
      wireRef.current.rotation.x = -t * 0.1
      wireRef.current.rotation.y = -t * 0.15
      wireRef.current.scale.setScalar(1 + Math.sin(t * 1.5) * 0.03)
    }

    // Rings
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = Math.PI / 3 + Math.sin(t * 0.2) * 0.2
      ring1Ref.current.rotation.y = t * 0.3
      ring1Ref.current.rotation.z = t * 0.15
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = Math.PI / 2 + Math.cos(t * 0.25) * 0.2
      ring2Ref.current.rotation.y = -t * 0.2
      ring2Ref.current.rotation.z = -t * 0.25
    }
  })

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={1.5}>
        {/* Inner Solid Core: Dark, glossy physical material */}
        <mesh ref={coreRef}>
          <icosahedronGeometry args={[1.3, 0]} />
          <meshPhysicalMaterial 
            color="#050a15"
            metalness={0.9}
            roughness={0.1}
            clearcoat={1}
            clearcoatRoughness={0.1}
            envMapIntensity={3}
            emissive="#001a2e"
            emissiveIntensity={0.2}
          />
        </mesh>

        {/* Outer Wireframe Core */}
        <mesh ref={wireRef}>
          <icosahedronGeometry args={[1.55, 0]} />
          <meshBasicMaterial 
            color="#00D9FF"
            wireframe
            transparent
            opacity={0.25}
          />
        </mesh>

        {/* Orbiting Ring 1 (Cyan) */}
        <mesh ref={ring1Ref}>
          <torusGeometry args={[2.3, 0.012, 16, 100]} />
          <meshStandardMaterial 
            color="#00D9FF"
            emissive="#00D9FF"
            emissiveIntensity={2}
            metalness={1}
            roughness={0}
          />
        </mesh>

        {/* Orbiting Ring 2 (Gold) */}
        <mesh ref={ring2Ref}>
          <torusGeometry args={[2.7, 0.008, 16, 100]} />
          <meshStandardMaterial 
            color="#F0B233"
            emissive="#F0B233"
            emissiveIntensity={1.5}
            metalness={1}
            roughness={0}
          />
        </mesh>
      </Float>

      {/* Center glowing orb to light it from inside slightly */}
      <Sphere args={[0.6, 32, 32]}>
        <meshBasicMaterial color="#00D9FF" transparent opacity={0.05} />
      </Sphere>

      {/* Cyan Sparkles */}
      <Sparkles
        count={100}
        scale={6}
        size={1.5}
        speed={0.4}
        opacity={0.6}
        color="#00D9FF"
      />
      {/* Gold Sparkles */}
      <Sparkles
        count={50}
        scale={7}
        size={1}
        speed={0.3}
        opacity={0.4}
        color="#F0B233"
      />
    </group>
  )
}

/* ─── Scene ──────────────────────────────────────────────────────────────────── */
function Scene({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  return (
    <>
      {/* Cinematic Lighting */}
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={4} color="#00D9FF" />
      <pointLight position={[-5, -5, 2]} intensity={2.5} color="#F0B233" />
      <pointLight position={[0, 0, 5]} intensity={1} color="#ffffff" />
      
      <Environment preset="city" />

      <GeometricCore mouse={mouse} />
    </>
  )
}

/* ─── Exported Canvas wrapper ────────────────────────────────────────────────── */
export function Hero3DModel({ mouseRef }: { mouseRef: React.MutableRefObject<[number, number]> }) {
  return (
    <div className="relative w-full h-[120%] lg:h-[130%] -top-[10%] lg:-top-[15%]">
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 50 }}
        gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
        style={{ background: "transparent" }}
        className="relative z-10 w-full h-full"
      >
        <Suspense fallback={null}>
          <Scene mouse={mouseRef} />
        </Suspense>
      </Canvas>

      {/* Decorative corner labels */}
      <div
        className="pointer-events-none absolute bottom-8 left-8 z-20 text-[10px] tracking-[0.2em] uppercase opacity-40 mix-blend-plus-lighter"
        style={{ color: "#00D9FF", fontFamily: "var(--font-jetbrains-mono, monospace)" }}
      >
        [ Core / Active ]
      </div>
      <div
        className="pointer-events-none absolute top-8 right-8 z-20 text-[10px] tracking-[0.2em] uppercase opacity-40 mix-blend-plus-lighter"
        style={{ color: "#F0B233", fontFamily: "var(--font-jetbrains-mono, monospace)" }}
      >
        Interactive
      </div>
    </div>
  )
}

