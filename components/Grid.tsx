import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SymbolType, WinLine } from '../types';
import { SlotIcon } from './SlotIcon';
import { SYMBOLS } from '../constants';

interface GridProps {
  grid: SymbolType[][];
  winLines: WinLine[];
  isSpinning: boolean;
}

export const Grid: React.FC<GridProps> = ({ grid, winLines, isSpinning }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const isWinningCell = (row: number, col: number) => {
    return winLines.some(line => 
      line.coords.some(coord => coord.row === row && coord.col === col)
    );
  };

  return (
    <div className="relative w-full h-full p-2 bg-nordic-panel border-4 border-gray-800 rounded-xl shadow-2xl overflow-hidden flex flex-col justify-center" ref={containerRef}>
      <div className="absolute inset-0 border border-white/10 rounded-lg pointer-events-none z-10"></div>
      
      <div className="grid grid-cols-3 gap-2 w-full h-full bg-black/50 p-2 rounded-lg relative z-0">
        {grid.map((row, rowIndex) => (
          <React.Fragment key={`row-${rowIndex}`}>
            {row.map((symbol, colIndex) => {
              const isWin = isWinningCell(rowIndex, colIndex) && !isSpinning;
              
              return (
                <div 
                  key={`cell-${rowIndex}-${colIndex}`}
                  className={`
                    relative w-full h-full rounded-md md:rounded-lg flex items-center justify-center 
                    bg-gradient-to-br from-gray-900 to-black border border-gray-800
                    transition-colors duration-300 overflow-hidden
                    ${isWin ? 'border-nordic-gold/60 shadow-[inset_0_0_20px_rgba(192,160,98,0.2)]' : ''}
                  `}
                >
                  <AnimatePresence>
                    {isWin && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.4, 0.1] }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
                        className="absolute inset-0 bg-nordic-gold z-0"
                      />
                    )}
                  </AnimatePresence>

                  <motion.div
                    className="w-full h-full flex items-center justify-center z-10"
                    animate={
                      isSpinning 
                        ? { y: [0, -15, 0], filter: ["blur(0px)", "blur(3px)", "blur(0px)"] }
                        : isWin 
                          ? { scale: [1, 1.15, 1], rotate: [0, -3, 3, 0], filter: "brightness(1.2)" } 
                          : { y: 0, filter: "blur(0px)", scale: 1, rotate: 0 }
                    }
                    transition={
                      isSpinning 
                        ? { repeat: Infinity, duration: 0.1 }
                        : isWin
                          ? { repeat: Infinity, duration: 0.8, ease: "easeInOut" }
                          : { duration: 0.3 }
                    }
                  >
                    <SlotIcon 
                      type={symbol} 
                      className={`w-[60%] h-[60%] ${isWin ? 'drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]' : ''}`} 
                    />
                  </motion.div>
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>

      <AnimatePresence>
        {winLines.length > 0 && !isSpinning && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible">
            {winLines.map((line, idx) => {
              // Adjust coords to align with the center of the grid cells
              // Cells are 33.33% wide/high. Center is 16.66% + (index * 33.33%)
              const getCoord = (index: number) => (index * 33.33) + 16.66;
              
              const points = line.coords.map(c => `${getCoord(c.col)}%,${getCoord(c.row)}%`).join(' ');
              const lineColor = SYMBOLS.find(s => s.id === line.symbol)?.color || '#fff';

              return (
                <React.Fragment key={`win-line-group-${idx}`}>
                  {/* Outer Glow Layer */}
                  <motion.polyline
                    points={points}
                    fill="none"
                    stroke={lineColor}
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.6 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    style={{ filter: `blur(8px)` }}
                  />
                  
                  {/* Inner Core Layer */}
                  <motion.polyline
                    points={points}
                    fill="none"
                    stroke="#fff"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    style={{ filter: `drop-shadow(0 0 5px ${lineColor})` }}
                  />
                </React.Fragment>
              );
            })}
          </svg>
        )}
      </AnimatePresence>
    </div>
  );
};