import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { Dapp, CATEGORY_CONFIG } from '@/types';
import * as THREE from 'three';

interface DappMarkerProps {
  dapp: Dapp;
  onHover: (dapp: Dapp | null) => void;
  onClick: (dapp: Dapp) => void;
}

export function DappMarker({ dapp, onHover, onClick }: DappMarkerProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((_state) => {
    if (groupRef.current && hovered) {
      groupRef.current.scale.setScalar(
        THREE.MathUtils.lerp(groupRef.current.scale.x, 1.2, 0.1)
      );
    } else if (groupRef.current) {
      groupRef.current.scale.setScalar(
        THREE.MathUtils.lerp(groupRef.current.scale.x, 1, 0.1)
      );
    }
  });

  // Convert lat/lng to 3D coordinates on sphere
  const radius = 2.01; // Slightly above globe surface
  const phi = (90 - dapp.position.lat) * (Math.PI / 180);
  const theta = (dapp.position.lng + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);

  // Calculate rotation to point outward from globe center
  const position = new THREE.Vector3(x, y, z);
  const rotation = new THREE.Euler();
  rotation.setFromVector3(position.clone().normalize());

  const categoryColor = CATEGORY_CONFIG[dapp.category].color;

  return (
    <group
      ref={groupRef}
      position={[x, y, z]}
      rotation={[rotation.x + Math.PI / 2, rotation.y, rotation.z]}
    >
      {/* Invisible larger sphere for easier clicking/hovering */}
      <mesh
        onPointerEnter={(e) => {
          e.stopPropagation();
          setHovered(true);
          onHover(dapp);
          document.body.style.cursor = 'pointer';
        }}
        onPointerLeave={(e) => {
          e.stopPropagation();
          setHovered(false);
          onHover(null);
          document.body.style.cursor = 'auto';
        }}
        onClick={(e) => {
          e.stopPropagation();
          onClick(dapp);
        }}
      >
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* Base cylinder pin */}
      <mesh position={[0, -0.08, 0]}>
        <cylinderGeometry args={[0.015, 0.02, 0.08, 8]} />
        <meshStandardMaterial
          color={categoryColor}
          emissive={categoryColor}
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Logo circle background */}
      <mesh position={[0, 0.02, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.01, 32]} />
        <meshStandardMaterial
          color={hovered ? '#ffffff' : categoryColor}
          emissive={hovered ? '#ffffff' : categoryColor}
          emissiveIntensity={hovered ? 0.6 : 0.3}
        />
      </mesh>

      {/* HTML overlay for logo image */}
      {dapp.logo && (
        <Html
          center
          distanceFactor={0.5}
          position={[0, 0.025, 0]}
          style={{
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          <div
            style={{
              width: '148px',
              height: '148px',
              borderRadius: '50%',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: categoryColor,
              border: `3px solid ${hovered ? '#ffffff' : categoryColor}`,
              boxShadow: hovered
                ? `0 0 20px ${categoryColor}`
                : `0 0 10px ${categoryColor}`,
              transition: 'all 0.2s ease',
            }}
          >
            <img
              src={dapp.logo}
              alt={dapp.name}
              style={{
                width: '132px',
                height: '132px',
                objectFit: 'contain',
              }}
            />
          </div>
        </Html>
      )}

      {/* Fallback: Show first letter if no logo */}
      {!dapp.logo && (
        <Html
          center
          distanceFactor={0.5}
          position={[0, 0.025, 0]}
          style={{
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: categoryColor,
              border: `3px solid ${hovered ? '#ffffff' : categoryColor}`,
              boxShadow: hovered
                ? `0 0 20px ${categoryColor}`
                : `0 0 10px ${categoryColor}`,
              transition: 'all 0.2s ease',
              color: '#ffffff',
              fontWeight: 'bold',
              fontSize: '20px',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            {dapp.name.charAt(0).toUpperCase()}
          </div>
        </Html>
      )}
    </group>
  );
}