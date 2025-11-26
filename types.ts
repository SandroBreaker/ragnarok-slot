export enum SymbolType {
  ICE = 'ICE',
  SHIELD = 'SHIELD',
  FIRE = 'FIRE',
  OMEGA = 'OMEGA',
}

export interface SymbolDef {
  id: SymbolType;
  name: string;
  weight: number;
  color: string;
  multiplier: number;
  icon: string; // Lucide icon name mapping
}

export interface WinLine {
  coords: { row: number; col: number }[];
  symbol: SymbolType;
  amount: number;
}

export interface GameState {
  balance: number;
  bet: number;
  totalWon: number;
  totalBet: number;
  isSpinning: boolean;
  lastWin: number;
  grid: SymbolType[][];
  winLines: WinLine[];
  message: string;
}
