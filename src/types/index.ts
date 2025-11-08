export type DappCategory = 'defi' | 'nft' | 'gaming' | 'social' | 'infra'| 'ai';

export interface Dapp {
  id: string;
  name: string;
  description: string;
  category: DappCategory;
  url: string;
  tags: string[];
  position: {
    lat: number;
    lng: number;
  };
  logo?: string;
}

export interface CategoryInfo {
  name: string;
  color: string;
  description: string;
}

export const CATEGORY_CONFIG: Record<DappCategory, CategoryInfo> = {
  defi: {
    name: 'DeFi',
    color: '#16f2b3',
    description: 'Decentralized Finance Applications',
  },
  nft: {
    name: 'NFT',
    color: '#7c3aed',
    description: 'NFT Marketplaces & Collections',
  },
  gaming: {
    name: 'Gaming',
    color: '#f59e0b',
    description: 'Blockchain Gaming & Metaverse',
  },
  social: {
    name: 'Social',
    color: '#ec4899',
    description: 'Social & Community Platforms',
  },
  infra: {
    name: 'Infra',
    color: '#3b82f6',
    description: 'Developer Tools & Infrastructure',
  },
    ai: {
    name: 'AI',
    color: '#FFC0CB',
    description: 'Artificial Intelligence',
  },
};