'use client';

import { useState, useEffect } from 'react';

interface SearchBoxProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export function SearchBox({ onSearch, placeholder = 'Search dapps...' }: SearchBoxProps) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const debounce = setTimeout(() => {
      onSearch(query);
    }, 300);

    return () => clearTimeout(debounce);
  }, [query, onSearch]);

  return (
    <div className="relative w-full max-w-sm">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full px-6 py-4 bg-surface border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-defi/50 transition-colors"
      />
      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30">
        <svg
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="9" cy="9" r="7" />
          <path d="m15 15 4 4" />
        </svg>
      </div>
    </div>
  );
}