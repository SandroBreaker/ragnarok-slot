import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Grid } from './components/Grid';
import { Controls } from './components/Controls';
import { PayoutTable } from './components/PayoutTable';
import { WinModal } from './components/WinModal';
import { generateGrid, checkWins } from './utils/gameLogic';
import { INITIAL_BALANCE, MIN_BET, PERSONA_QUOTES } from './constants';
import { GameState } from './types';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    balance: INITIAL_BALANCE,
    bet: MIN_BET,
    totalWon: 0,
    totalBet: 0,
    isSpinning: false,
    lastWin: 0,
    grid: generateGrid(),
    winLines: [],
    message: PERSONA_QUOTES[0],
  });

  const [showWinPopup, setShowWinPopup] = useState(false);

  const getNewQuote = () => PERSONA_QUOTES[Math.floor(Math.random() * PERSONA_QUOTES.length)];

  const handleBetChange = (newBet: number) => {
    setGameState(prev => ({ ...prev, bet: newBet }));
  };

  const spin = useCallback(() => {
    if (gameState.balance < gameState.bet || gameState.isSpinning) return;

    setGameState(prev => ({
      ...prev,
      balance: prev.balance - prev.bet,
      totalBet: prev.totalBet + prev.bet,
      isSpinning: true,
      winLines: [],
      lastWin: 0,
      message: "...",
    }));

    setShowWinPopup(false);

    setTimeout(() => {
      const newGrid = generateGrid();
      const { totalWin, lines } = checkWins(newGrid, gameState.bet);

      setGameState(prev => ({
        ...prev,
        grid: newGrid,
        balance: prev.balance + totalWin,
        totalWon: prev.totalWon + totalWin,
        isSpinning: false,
        lastWin: totalWin,
        winLines: lines,
        message: totalWin > 0 ? "A worthy offering!" : getNewQuote(),
      }));

      if (totalWin >= gameState.bet * 3) {
        setShowWinPopup(true);
        setTimeout(() => setShowWinPopup(false), 2500);
      }

    }, 1500);
  }, [gameState.balance, gameState.bet, gameState.isSpinning]);

  return (
    // Main Container: h-[100dvh] forces full viewport height, overflow-hidden prevents scrolling
    <div className="h-[100dvh] w-full flex flex-col overflow-hidden text-gray-200 font-sans selection:bg-nordic-red selection:text-white bg-black/40">
      
      {/* Header Section: Fixed height (auto), stays at top */}
      <div className="flex-none z-10 p-2 md:p-4 bg-gradient-to-b from-nordic-dark to-transparent">
        <Header 
          balance={gameState.balance} 
          totalWon={gameState.totalWon}
          totalBet={gameState.totalBet}
          quote={gameState.message}
        />
      </div>

      {/* Game Area: Flex-1 takes remaining space. min-h-0 allows children to shrink if needed. */}
      <div className="flex-1 flex flex-col items-center justify-center min-h-0 relative z-0 px-4">
        
        <div className="w-full max-w-2xl h-full flex flex-col items-center justify-center gap-2 md:gap-6">
          
          {/* Payout Table: Hide on small screens to prioritize Grid, show on md+ */}
          <div className="shrink-0 hidden md:block w-full">
            <PayoutTable />
          </div>

          {/* Grid Container: Constrained by max width, but allowed to shrink vertically */}
          <div className="flex-1 w-full max-w-md flex items-center justify-center min-h-0">
             <div className="w-full max-h-full aspect-square">
                <Grid 
                  grid={gameState.grid} 
                  winLines={gameState.winLines} 
                  isSpinning={gameState.isSpinning} 
                />
             </div>
          </div>
          
        </div>
      </div>

      {/* Controls Section: Fixed at bottom */}
      <div className="flex-none z-20 p-4 bg-gradient-to-t from-black via-black/80 to-transparent">
        <Controls 
          bet={gameState.bet} 
          balance={gameState.balance} 
          isSpinning={gameState.isSpinning}
          onBetChange={handleBetChange}
          onSpin={spin}
        />
      </div>

      {showWinPopup && (
        <WinModal amount={gameState.lastWin} onClose={() => setShowWinPopup(false)} />
      )}
    </div>
  );
};

export default App;