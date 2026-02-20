import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// Floating Cloth/Garment Component
function FloatingCloth({ 
  position, 
  rotation, 
  scale, 
  color 
}: { 
  position: [number, number, number]; 
  rotation: [number, number, number];
  scale: number;
  color: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Create wavy cloth geometry
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(2, 3, 20, 20);
    const pos = geo.attributes.position;
    
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      // Add wave effect
      const z = Math.sin(x * 2) * 0.2 + Math.sin(y * 3) * 0.15;
      pos.setZ(i, z);
    }
    
    geo.computeVertexNormals();
    return geo;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={0.5}
    >
      <mesh
        ref={meshRef}
        position={position}
        rotation={rotation}
        scale={scale}
        geometry={geometry}
      >
        <meshStandardMaterial
          color={color}
          side={THREE.DoubleSide}
          roughness={0.6}
          metalness={0.1}
          transparent
          opacity={0.9}
        />
      </mesh>
    </Float>
  );
}

// Floating Hanger Component
function FloatingHanger({ 
  position, 
  rotation 
}: { 
  position: [number, number, number]; 
  rotation: [number, number, number];
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.3}
      floatIntensity={0.3}
    >
      <group ref={groupRef} position={position} rotation={rotation}>
        {/* Hanger hook */}
        <mesh position={[0, 1.4, 0]}>
          <torusGeometry args={[0.15, 0.02, 8, 20, Math.PI]} />
          <meshStandardMaterial color="#C9A962" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Hanger body */}
        <mesh position={[0, 1.2, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.3]} />
          <meshStandardMaterial color="#C9A962" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Hanger shoulders */}
        <mesh position={[0, 1.05, 0]} rotation={[0, 0, Math.PI / 12]}>
          <boxGeometry args={[1.2, 0.04, 0.04]} />
          <meshStandardMaterial color="#C9A962" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
    </Float>
  );
}

// Main Scene
function Scene() {
  return (
    <>
      {/* Ambient Light */}
      <ambientLight intensity={0.4} />
      
      {/* Directional Light */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={0.8}
        castShadow
      />
      
      {/* Point Lights for ambiance */}
      <pointLight position={[-5, 3, -5]} intensity={0.3} color="#2E7D5A" />
      <pointLight position={[5, -3, 5]} intensity={0.2} color="#F5F5F3" />

      {/* Floating Garments */}
      <FloatingCloth
        position={[-3, 1, -2]}
        rotation={[0.2, 0.3, -0.1]}
        scale={0.8}
        color="#1F4D3A"
      />
      
      <FloatingCloth
        position={[3, -0.5, -3]}
        rotation={[0.1, -0.4, 0.2]}
        scale={0.7}
        color="#2E7D5A"
      />
      
      <FloatingCloth
        position={[0, 2, -4]}
        rotation={[-0.1, 0.2, 0.1]}
        scale={0.6}
        color="#F5F5F3"
      />

      {/* Floating Hangers */}
      <FloatingHanger
        position={[-2, -1, -2]}
        rotation={[0, 0.5, 0]}
      />
      
      <FloatingHanger
        position={[2.5, 1.5, -3]}
        rotation={[0, -0.3, 0]}
      />

      {/* Contact Shadows */}
      <ContactShadows
        position={[0, -3, 0]}
        opacity={0.2}
        scale={20}
        blur={2}
        far={5}
      />

      {/* Environment */}
      <Environment preset="city" />
    </>
  );
}

// Main Component
export default function FloatingGarments3D() {
  return (
    <div className="absolute inset-0 pointer-events-none z-[1]">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
