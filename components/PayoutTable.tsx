import React from 'react';
import { SYMBOLS } from '../constants';
import { SlotIcon } from './SlotIcon';

export const PayoutTable: React.FC = () => {
  return (
    <div className="grid grid-cols-4 gap-2 w-full max-w-2xl mx-auto mb-2">
      {SYMBOLS.map((s) => (
        <div 
          key={s.id}
          className="flex flex-col items-center justify-center p-2 rounded-lg border border-white/5 bg-gradient-to-b from-gray-800/50 to-black/50 backdrop-blur-sm"
        >
          <div className="flex items-center gap-2 mb-1">
            <SlotIcon type={s.id} className="w-5 h-5 drop-shadow-md" />
            <span className="text-white font-bold text-sm">{s.multiplier}x</span>
          </div>
          <span className="text-gray-500 text-[9px] uppercase tracking-wide text-center leading-none">{s.name}</span>
        </div>
      ))}
    </div>
  );
};