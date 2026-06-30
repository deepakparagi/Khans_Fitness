'use client';
/* eslint-disable react-hooks/purity */

import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '@/components/ThemeProvider';

let particleMaterial: THREE.PointsMaterial | null = null;
let ringMaterial: THREE.MeshBasicMaterial | null = null;

function ParticleField({ theme }: { theme: string }) {
  const ref = useRef<THREE.Points>(null);
  
  // Generate random points in a sphere
  const sphere = new Float32Array(3000 * 3);
  for (let i = 0; i < 3000; i++) {
    const r = 10 * Math.cbrt(Math.random());
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos(2 * Math.random() - 1);
    
    sphere[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    sphere[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    sphere[i * 3 + 2] = r * Math.cos(phi);
  }

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          ref={(el) => { if (el) particleMaterial = el as any }}
          transparent
          color={theme === 'light' ? '#333333' : '#ffffff'}
          size={0.02}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.3}
        />
      </Points>
    </group>
  );
}

function Dumbbell3D({ theme }: { theme: string }) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.4;
      ref.current.rotation.y += delta * 0.5;
      ref.current.rotation.z += delta * 0.2;
      ref.current.position.y = Math.sin(state.clock.elapsedTime) * 0.3;
    }
  });

  const isLight = theme === 'light';
  const weightColor = isLight ? '#222222' : '#4a4a4a';
  const handleColor = isLight ? '#888888' : '#aaaaaa';
  const accentColor = isLight ? '#DC2626' : '#FCA5A5';

  return (
    <group ref={ref} position={[3.8, 0.0, 0]} scale={1.1}>
      {/* Central Handle */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.1, 0.1, 2.5, 16]} />
        <meshStandardMaterial color={handleColor} metalness={0.9} roughness={0.1} />
      </mesh>

      {/* LEFT SIDE */}
      <group position={[-1.25, 0, 0]}>
        {/* Inner Plate */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.7, 0.7, 0.3, 6]} />
          <meshStandardMaterial color={weightColor} metalness={0.3} roughness={0.7} />
        </mesh>
        {/* Outer Plate */}
        <mesh position={[-0.35, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.5, 0.5, 0.3, 6]} />
          <meshStandardMaterial color={weightColor} metalness={0.3} roughness={0.7} />
        </mesh>
        {/* Accent Ring */}
        <mesh position={[-0.175, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.72, 0.72, 0.05, 16]} />
          <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.3} />
        </mesh>
      </group>

      {/* RIGHT SIDE */}
      <group position={[1.25, 0, 0]}>
        {/* Inner Plate */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.7, 0.7, 0.3, 6]} />
          <meshStandardMaterial color={weightColor} metalness={0.3} roughness={0.7} />
        </mesh>
        {/* Outer Plate */}
        <mesh position={[0.35, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.5, 0.5, 0.3, 6]} />
          <meshStandardMaterial color={weightColor} metalness={0.3} roughness={0.7} />
        </mesh>
        {/* Accent Ring */}
        <mesh position={[0.175, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.72, 0.72, 0.05, 16]} />
          <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.3} />
        </mesh>
      </group>
    </group>
  );
}

function Kettlebell3D({ theme }: { theme: string }) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.2;
      ref.current.rotation.y += delta * 0.3;
      ref.current.rotation.z -= delta * 0.1;
      ref.current.position.y = Math.sin(state.clock.elapsedTime + 2) * 0.2 + 2;
    }
  });

  const isLight = theme === 'light';
  const weightColor = isLight ? '#222222' : '#4a4a4a';
  const handleColor = isLight ? '#444444' : '#666666';
  const accentColor = isLight ? '#DC2626' : '#FCA5A5';

  return (
    <group ref={ref} position={[1.0, 3.2, -3]} scale={0.7}>
      {/* Base */}
      <mesh position={[0, -0.2, 0]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial color={weightColor} metalness={0.4} roughness={0.6} />
      </mesh>
      {/* Handle */}
      <mesh position={[0, 0.8, 0]}>
        <torusGeometry args={[0.4, 0.12, 16, 50]} />
        <meshStandardMaterial color={handleColor} metalness={0.6} roughness={0.4} />
      </mesh>
      {/* Accent Band */}
      <mesh position={[0, 0.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.76, 0.76, 0.05, 32]} />
        <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}

function WeightPlate3D({ theme }: { theme: string }) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta * 0.3;
      ref.current.rotation.y += delta * 0.1;
      ref.current.rotation.z += delta * 0.4;
      ref.current.position.y = Math.sin(state.clock.elapsedTime + 4) * 0.4 - 2;
    }
  });

  const isLight = theme === 'light';
  const plateColor = isLight ? '#333333' : '#4a4a4a';
  const accentColor = isLight ? '#DC2626' : '#FCA5A5';

  return (
    <group ref={ref} position={[1.2, -3.2, -2]} scale={0.8}>
      {/* Main Plate */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.2, 1.2, 0.15, 32]} />
        <meshStandardMaterial color={plateColor} metalness={0.5} roughness={0.6} />
      </mesh>
      {/* Inner Hole */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.16, 32]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      {/* Accent Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.0, 0.02, 16, 50]} />
        <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

function ProteinShaker3D({ theme }: { theme: string }) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.15;
      ref.current.rotation.y += delta * 0.25;
      ref.current.position.y = Math.sin(state.clock.elapsedTime + 1) * 0.25 + 2;
    }
  });

  const isLight = theme === 'light';
  const bodyColor = isLight ? '#f0f0f0' : '#4a4a4a';
  const capColor = isLight ? '#888888' : '#111111';
  const accentColor = isLight ? '#DC2626' : '#FCA5A5';

  return (
    <group ref={ref} position={[6.5, 2.8, -2.5]} scale={0.8}>
      {/* Body */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.5, 0.4, 1.8, 32]} />
        <meshStandardMaterial color={bodyColor} transparent opacity={0.9} roughness={0.2} metalness={0.1} />
      </mesh>
      {/* Cap Base */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.52, 0.52, 0.3, 32]} />
        <meshStandardMaterial color={capColor} roughness={0.7} metalness={0.2} />
      </mesh>
      {/* Cap Spout */}
      <mesh position={[0, 0.75, 0]}>
        <cylinderGeometry args={[0.15, 0.2, 0.3, 32]} />
        <meshStandardMaterial color={accentColor} roughness={0.5} metalness={0.1} />
      </mesh>
    </group>
  );
}

function MedicineBall3D({ theme }: { theme: string }) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta * 0.2;
      ref.current.rotation.y += delta * 0.3;
      ref.current.position.y = Math.sin(state.clock.elapsedTime + 3) * 0.3 - 2;
    }
  });

  const isLight = theme === 'light';
  const ballColor = isLight ? '#333333' : '#4a4a4a';
  const stripeColor = isLight ? '#DC2626' : '#FCA5A5';

  return (
    <group ref={ref} position={[6.2, -2.8, -1.0]} scale={0.9}>
      {/* Main Ball */}
      <mesh>
        <sphereGeometry args={[0.9, 32, 32]} />
        <meshStandardMaterial color={ballColor} roughness={0.9} metalness={0.1} />
      </mesh>
      {/* Accent Stripes */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.91, 0.03, 16, 50]} />
        <meshStandardMaterial color={stripeColor} emissive={stripeColor} emissiveIntensity={0.2} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.91, 0.03, 16, 50]} />
        <meshStandardMaterial color={stripeColor} emissive={stripeColor} emissiveIntensity={0.2} />
      </mesh>
    </group>
  );
}

function FloatingRing() {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.1;
      ringRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.3;
    }
  });

  return (
    <mesh ref={ringRef} position={[0, 0, 0]}>
      <torusGeometry args={[2.5, 0.01, 16, 100]} />
      <meshBasicMaterial 
        ref={(el) => { if (el) ringMaterial = el as any }}
        color="#D4A843" 
        transparent 
        opacity={0.15} 
      />
    </mesh>
  );
}

export default function Hero3D() {
  const { theme } = useTheme();

  useEffect(() => {
    const updateColors = () => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light'
      if (particleMaterial) {
        particleMaterial.color.setHex(isLight ? 0x333333 : 0xFFFFFF)
        particleMaterial.opacity = isLight ? 0.12 : 0.20
      }
      if (ringMaterial) {
        ringMaterial.color.setHex(isLight ? 0xDC2626 : 0xFCA5A5)
        ringMaterial.opacity = isLight ? 0.3 : 0.4
      }
    }

    updateColors() // run on mount

    const observer = new MutationObserver(updateColors)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
      <ambientLight intensity={theme === 'light' ? 0.8 : 0.7} />
      <directionalLight position={[10, 10, 5]} intensity={theme === 'light' ? 1.5 : 1.3} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color={theme === 'light' ? '#DC2626' : '#FCA5A5'} />
      <ParticleField theme={theme} />
      <FloatingRing />
      <Dumbbell3D theme={theme} />
      <Kettlebell3D theme={theme} />
      <WeightPlate3D theme={theme} />
      <ProteinShaker3D theme={theme} />
      <MedicineBall3D theme={theme} />
    </Canvas>
  );
}
