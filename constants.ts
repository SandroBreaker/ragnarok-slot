import { SymbolDef, SymbolType } from './types';

export const SYMBOLS: SymbolDef[] = [
  { 
    id: SymbolType.ICE, 
    name: 'Leviathan Axe', 
    weight: 45, 
    color: '#74b9ff', 
    multiplier: 2, 
    icon: 'Snowflake' 
  },
  { 
    id: SymbolType.SHIELD, 
    name: 'Guardian Shield', 
    weight: 30, 
    color: '#cd6133', 
    multiplier: 5, 
    icon: 'Shield' 
  },
  { 
    id: SymbolType.FIRE, 
    name: 'Blades of Chaos', 
    weight: 20, 
    color: '#e17055', 
    multiplier: 10, 
    icon: 'Flame' 
  },
  { 
    id: SymbolType.OMEGA, 
    name: 'God of War', 
    weight: 5, 
    color: '#ff3f34', 
    multiplier: 50, 
    icon: 'Zap' 
  },
];

export const GRID_ROWS = 3;
export const GRID_COLS = 3;
export const MIN_BET = 1;
export const INITIAL_BALANCE = 100;

export const PERSONA_QUOTES = [
  "Boy. Focus.",
  "Don't be sorry, be better.",
  "Keep your guard up.",
  "The cycle ends here.",
  "Fate only binds you if you let it.",
  "Do not mistake my silence for lack of grief.",
  "We win because we are determined.",
];
