import { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { Dapp } from '@/types';
import { DappMarker } from './DappMarker';

interface GlobeProps {
  dapps: Dapp[];
  filteredDapps: Dapp[];
  onDappHover: (dapp: Dapp | null) => void;
  onDappClick: (dapp: Dapp) => void;
}

export function Globe({ dapps, filteredDapps, onDappHover, onDappClick }: GlobeProps) {
  const globeRef = useRef<THREE.Mesh>(null);
  
  const continentTexture = useLoader(THREE.TextureLoader, '/continents-outline.png');

  // Subtle rotation animation
  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group>
      {/* Base Purple Globe */}
      <Sphere ref={globeRef} args={[2, 64, 64]}>
        <meshStandardMaterial
          color="#836EF9"
          roughness={0.9}
          metalness={0.1}
        />
      </Sphere>

      {/* Continent Overlay - Slightly above surface */}
      <Sphere args={[2.002, 64, 64]}>
        <meshBasicMaterial
          map={continentTexture}
          transparent
          opacity={0.4}
          color="#ffffff"
          depthWrite={false}
        />
      </Sphere>

      {/* Latitude/Longitude Grid Lines */}
      <Sphere args={[2.005, 64, 64]}>
        <meshBasicMaterial
          color="#9D8BFA"
          wireframe
          transparent
          opacity={0}
        />
      </Sphere>

      {/* Outer Glow Effect */}
      <Sphere args={[2.15, 64, 64]}>
        <meshBasicMaterial
          color="#836EF9"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Dapp Markers */}
      {filteredDapps.map((dapp) => (
        <DappMarker
          key={dapp.id}
          dapp={dapp}
          onHover={onDappHover}
          onClick={onDappClick}
        />
      ))}
    </group>
  );
}