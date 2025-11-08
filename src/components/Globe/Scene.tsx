'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Globe } from './Globe';
import { Dapp } from '@/types';

interface SceneProps {
  dapps: Dapp[];
  filteredDapps: Dapp[];
  onDappHover: (dapp: Dapp | null) => void;
  onDappClick: (dapp: Dapp) => void;
}

export function Scene({ dapps, filteredDapps, onDappHover, onDappClick }: SceneProps) {
  return (
    <Canvas
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
    >
      {/* Camera - Positioned slightly higher to center globe below header */}
      <PerspectiveCamera makeDefault position={[0, 1.1, 9]} fov={45} />

      {/* Lights */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 3, 5]} intensity={1} />
      <pointLight position={[-5, -3, -5]} intensity={0.5} color="#16f2b3" />

      {/* Globe */}
      <Globe
        dapps={dapps}
        filteredDapps={filteredDapps}
        onDappHover={onDappHover}
        onDappClick={onDappClick}
      />

      {/* Controls - Target slightly lower to match camera */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={3}
        maxDistance={8}
        rotateSpeed={0.5}
        zoomSpeed={0.8}
        target={[0, 1.1, 0]}
      />
    </Canvas>
  );
}