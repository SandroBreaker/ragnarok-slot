import React from 'react';

interface HeaderProps {
  balance: number;
  totalWon: number;
  totalBet: number;
  quote: string;
}

export const Header: React.FC<HeaderProps> = ({ balance, totalWon, totalBet, quote }) => {
  const net = totalWon - totalBet;
  const ratio = totalBet === 0 ? 50 : Math.min(Math.max(((net / (totalBet || 1)) * 50) + 50, 0), 100);

  return (
    <header className="w-full max-w-4xl mx-auto">
      <div className="flex flex-row justify-between items-center mb-2 border-b border-nordic-gold/20 pb-2">
        <div className="text-left">
          <h1 className="text-2xl md:text-4xl font-cinzel font-black text-gray-200 tracking-tighter drop-shadow-lg leading-none">
            GOD OF <span className="text-nordic-red">SLOTS</span>
          </h1>
          <p className="text-nordic-gold italic font-cinzel text-xs md:text-sm opacity-80 mt-1 truncate max-w-[200px] md:max-w-none">
            {quote}
          </p>
        </div>

        <div className="text-right">
          <span className="text-gray-400 text-[10px] uppercase tracking-widest block">Hacksilver</span>
          <span className="text-xl md:text-3xl font-cinzel font-bold text-white tabular-nums leading-none">
            {balance.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="w-full max-w-md mx-auto relative h-2 md:h-3 bg-gray-800 rounded-full border border-gray-600 overflow-hidden shadow-inner">
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/50 z-10" />
        <div 
          className="absolute left-0 top-0 bottom-0 bg-nordic-gold transition-all duration-700 ease-out"
          style={{ width: `${ratio}%` }}
        />
        <div 
          className="absolute right-0 top-0 bottom-0 bg-nordic-red transition-all duration-700 ease-out"
          style={{ width: `${100 - ratio}%` }}
        />
      </div>
      
      <div className="flex justify-between max-w-md mx-auto mt-1 text-[9px] text-gray-500 font-mono uppercase">
        <span>Offered: {totalBet.toFixed(0)}</span>
        <span>Plundered: {totalWon.toFixed(0)}</span>
      </div>
    </header>
  );
};