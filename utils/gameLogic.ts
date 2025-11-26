import { SYMBOLS, GRID_COLS, GRID_ROWS } from '../constants';
import { SymbolType, WinLine } from '../types';

// Create a weighted array for random selection
const weightedPool: SymbolType[] = [];
SYMBOLS.forEach((s) => {
  for (let i = 0; i < s.weight; i++) {
    weightedPool.push(s.id);
  }
});

export const getRandomSymbol = (): SymbolType => {
  const randomIndex = Math.floor(Math.random() * weightedPool.length);
  return weightedPool[randomIndex];
};

export const generateGrid = (): SymbolType[][] => {
  const grid: SymbolType[][] = [];
  for (let i = 0; i < GRID_ROWS; i++) {
    const row: SymbolType[] = [];
    for (let j = 0; j < GRID_COLS; j++) {
      row.push(getRandomSymbol());
    }
    grid.push(row);
  }
  return grid;
};

export const checkWins = (grid: SymbolType[][], bet: number): { totalWin: number; lines: WinLine[] } => {
  const lines: WinLine[] = [];
  let totalWin = 0;

  // Check Rows
  for (let r = 0; r < GRID_ROWS; r++) {
    const firstSymbol = grid[r][0];
    let match = true;
    for (let c = 1; c < GRID_COLS; c++) {
      if (grid[r][c] !== firstSymbol) {
        match = false;
        break;
      }
    }

    if (match) {
      const symbolDef = SYMBOLS.find((s) => s.id === firstSymbol);
      if (symbolDef) {
        const winAmount = bet * symbolDef.multiplier;
        totalWin += winAmount;
        lines.push({
          coords: Array.from({ length: GRID_COLS }, (_, c) => ({ row: r, col: c })),
          symbol: firstSymbol,
          amount: winAmount,
        });
      }
    }
  }

  // Check Diagonals (Only works for 3x3 specifically or square grids)
  // Diagonal 1: Top-Left to Bottom-Right
  if (grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2]) {
    const symbol = grid[0][0];
    const symbolDef = SYMBOLS.find((s) => s.id === symbol);
    if (symbolDef) {
      const winAmount = bet * symbolDef.multiplier;
      totalWin += winAmount;
      lines.push({
        coords: [{ row: 0, col: 0 }, { row: 1, col: 1 }, { row: 2, col: 2 }],
        symbol,
        amount: winAmount,
      });
    }
  }

  // Diagonal 2: Bottom-Left to Top-Right
  if (grid[2][0] === grid[1][1] && grid[1][1] === grid[0][2]) {
    const symbol = grid[2][0];
    const symbolDef = SYMBOLS.find((s) => s.id === symbol);
    if (symbolDef) {
      const winAmount = bet * symbolDef.multiplier;
      totalWin += winAmount;
      lines.push({
        coords: [{ row: 2, col: 0 }, { row: 1, col: 1 }, { row: 0, col: 2 }],
        symbol,
        amount: winAmount,
      });
    }
  }

  return { totalWin, lines };
};
