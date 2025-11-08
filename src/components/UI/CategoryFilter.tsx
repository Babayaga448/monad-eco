'use client';

import { DappCategory, CATEGORY_CONFIG } from '@/types';

interface CategoryFilterProps {
  selectedCategories: DappCategory[];
  onToggleCategory: (category: DappCategory) => void;
}

export function CategoryFilter({ selectedCategories, onToggleCategory }: CategoryFilterProps) {
  const categories = Object.keys(CATEGORY_CONFIG) as DappCategory[];

  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((category) => {
        const isSelected = selectedCategories.includes(category);
        const config = CATEGORY_CONFIG[category];

        return (
          <button
            key={category}
            onClick={() => onToggleCategory(category)}
            className={`
              px-4 py-2 rounded-lg border transition-all
              ${
                isSelected
                  ? 'border-white/30 bg-white/5'
                  : 'border-white/10 bg-transparent hover:border-white/20'
              }
            `}
            style={{
              borderColor: isSelected ? config.color : undefined,
            }}
          >
            <span className="text-white text-sm font-medium">
              {config.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}