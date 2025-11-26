import React from 'react';
import { Minus, Plus, RefreshCw } from 'lucide-react';
import { MIN_BET } from '../constants';

interface ControlsProps {
  bet: number;
  balance: number;
  isSpinning: boolean;
  onBetChange: (newBet: number) => void;
  onSpin: () => void;
}

export const Controls: React.FC<ControlsProps> = ({ 
  bet, 
  balance, 
  isSpinning, 
  onBetChange, 
  onSpin 
}) => {
  const handleDec = () => {
    if (bet > MIN_BET) onBetChange(bet - 1);
  };

  const handleInc = () => {
    if (bet < balance) onBetChange(bet + 1);
  };

  const isSpinDisabled = isSpinning || balance < bet || balance <= 0;

  return (
    <div className="flex flex-col gap-4 w-full max-w-lg mx-auto">
      
      {/* Bet Adjuster */}
      <div className="flex items-center justify-between bg-black/60 border border-gray-700 p-1.5 rounded-full backdrop-blur-md">
        <div className="flex items-center gap-2 md:gap-4 px-2 md:px-4">
          <span className="text-gray-400 font-cinzel text-xs uppercase tracking-widest hidden sm:inline">Wager</span>
          <div className="flex items-center gap-2">
            <button 
              onClick={handleDec}
              disabled={isSpinning || bet <= MIN_BET}
              className="w-8 h-8 rounded-full border border-nordic-gold text-nordic-gold flex items-center justify-center hover:bg-nordic-gold hover:text-black transition-all disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-nordic-gold"
            >
              <Minus size={14} />
            </button>
            <span className="text-xl font-bold text-white min-w-[2.5rem] text-center font-cinzel">
              {bet}
            </span>
            <button 
              onClick={handleInc}
              disabled={isSpinning || bet >= balance}
              className="w-8 h-8 rounded-full border border-nordic-gold text-nordic-gold flex items-center justify-center hover:bg-nordic-gold hover:text-black transition-all disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-nordic-gold"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>

        <div className="px-4 border-l border-gray-700">
          <span className="text-[10px] text-nordic-red uppercase font-bold tracking-wider whitespace-nowrap">
            {balance < bet ? "No Funds" : "Ready"}
          </span>
        </div>
      </div>

      {/* Spin Button */}
      <button
        onClick={onSpin}
        disabled={isSpinDisabled}
        className={`
          group relative w-full h-16 md:h-20 rounded-full font-cinzel font-black text-xl md:text-2xl uppercase tracking-[0.2em]
          transition-all duration-200 overflow-hidden shadow-lg
          ${isSpinDisabled 
            ? 'bg-gray-800 text-gray-500 cursor-not-allowed border-2 border-gray-700' 
            : 'bg-gradient-to-b from-red-800 to-red-950 text-white border-2 border-nordic-red shadow-[0_0_30px_rgba(179,57,57,0.4)] hover:shadow-[0_0_50px_rgba(179,57,57,0.6)] hover:scale-[1.01] active:scale-[0.98]'}
        `}
      >
        <span className="relative z-10 flex items-center justify-center gap-3">
          {isSpinning ? (
            <>
              <RefreshCw className="animate-spin" />
              Focusing...
            </>
          ) : (
            "Spartan Rage"
          )}
        </span>
        
        {!isSpinDisabled && (
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
        )}
      </button>
    </div>
  );
};