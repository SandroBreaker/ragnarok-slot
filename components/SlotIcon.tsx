import React from 'react';
import { Snowflake, Shield, Flame, Zap } from 'lucide-react';
import { SymbolType } from '../types';
import { SYMBOLS } from '../constants';

interface SlotIconProps {
  type: SymbolType;
  className?: string;
  style?: React.CSSProperties;
}

export const SlotIcon: React.FC<SlotIconProps> = ({ type, className, style }) => {
  const def = SYMBOLS.find(s => s.id === type);
  const color = def?.color || '#fff';
  
  // Combine custom style with dynamic color
  const combinedStyle = { color, ...style };

  switch (type) {
    case SymbolType.ICE:
      return <Snowflake className={className} style={combinedStyle} />;
    case SymbolType.SHIELD:
      return <Shield className={className} style={combinedStyle} />;
    case SymbolType.FIRE:
      return <Flame className={className} style={combinedStyle} />;
    case SymbolType.OMEGA:
      return <Zap className={className} style={combinedStyle} />;
    default:
      return null;
  }
};
