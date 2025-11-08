'use client';

import { useEffect, useState } from 'react';
import { Dapp, CATEGORY_CONFIG } from '@/types';

interface DappTooltipProps {
  dapp: Dapp | null;
}

export function DappTooltip({ dapp }: DappTooltipProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!dapp) return null;

  const categoryConfig = CATEGORY_CONFIG[dapp.category];

  return (
    <div
      className="fixed pointer-events-none z-50"
      style={{
        left: position.x + 20,
        top: position.y + 20,
      }}
    >
      <div className="bg-surface border border-white/10 rounded-xl p-4 shadow-2xl max-w-xs">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="text-white font-semibold text-lg">{dapp.name}</h3>
          <span
            className="px-2 py-1 rounded text-xs font-medium"
            style={{
              backgroundColor: `${categoryConfig.color}20`,
              color: categoryConfig.color,
            }}
          >
            {categoryConfig.name}
          </span>
        </div>
        <p className="text-white/60 text-sm mb-3">{dapp.description}</p>
        <div className="flex flex-wrap gap-2">
          {dapp.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-white/5 rounded text-white/40 text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}