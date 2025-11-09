'use client';

import { useState, useCallback, useMemo } from 'react';
import { Scene } from '@/components/Globe/Scene';
import { SearchBox } from '@/components/UI/SearchBox';
import { CategoryFilter } from '@/components/UI/CategoryFilter';
import { DappTooltip } from '@/components/UI/DappTooltip';
import { dappsData } from '@/data/dapps';
import { Dapp, DappCategory } from '@/types';

export default function Home() {
  const [hoveredDapp, setHoveredDapp] = useState<Dapp | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<DappCategory[]>([]);

  const handleDappHover = useCallback((dapp: Dapp | null) => {
    setHoveredDapp(dapp);
  }, []);

  const handleDappClick = useCallback((dapp: Dapp) => {
    window.open(dapp.url, '_blank', 'noopener,noreferrer');
  }, []);

  const handleToggleCategory = useCallback((category: DappCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  }, []);

  const filteredDapps = useMemo(() => {
    let filtered = dappsData;

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (dapp) =>
          dapp.name.toLowerCase().includes(query) ||
          dapp.description.toLowerCase().includes(query) ||
          dapp.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((dapp) =>
        selectedCategories.includes(dapp.category)
      );
    }

    return filtered;
  }, [searchQuery, selectedCategories]);

  return (
    <main className="relative w-screen h-screen overflow-hidden">
      {/* Galactic Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/galaxy-background.jpg)',
          filter: 'brightness(0.4)',
        }}
      />
      
      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />

      {/* 3D Globe Scene */}
      <div className="absolute inset-0">
        <Scene
          dapps={dappsData}
          filteredDapps={filteredDapps}
          onDappHover={handleDappHover}
          onDappClick={handleDappClick}
        />
      </div>

      {/* UI Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="container mx-auto h-full flex flex-col p-15 md:p-8 pointer-events-none">
          {/* Header */}
          <div className="pointer-events-auto flex-shrink-0">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">
              Monad Eco
            </h1>
            <p className="text-white/50 text-base md:text-lg mb-4 md:mb-8">
              Explore Monad ecosystem
            </p>

            {/* Search */}
            <div className="mb-1 md:mb-4">
              <SearchBox onSearch={setSearchQuery} />
            </div>

            {/* Category Filter */}
            <CategoryFilter
              selectedCategories={selectedCategories}
              onToggleCategory={handleToggleCategory}
            />
          </div>

          {/* Spacer to push globe down */}
          <div className="flex-1 min-h-0" />

          {/* Stats Footer */}
          <div className="pointer-events-auto flex-shrink-0">
            <div className="flex gap-6 md:gap-8 text-white/60 text-sm">
              <div>
                <span className="text-white font-semibold text-xl md:text-2xl">
                  {filteredDapps.length}
                </span>
                <span className="ml-2">Dapps</span>
              </div>
              <div>
                <span className="text-white font-semibold text-xl md:text-2xl">
                  {new Set(dappsData.map((d) => d.category)).size}
                </span>
                <span className="ml-2">Categories</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tooltip */}
      <DappTooltip dapp={hoveredDapp} />
    </main>
  );
}