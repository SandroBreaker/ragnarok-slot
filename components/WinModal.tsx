import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WinModalProps {
  amount: number;
  onClose: () => void;
}

export const WinModal: React.FC<WinModalProps> = ({ amount, onClose }) => {
  if (amount <= 0) return null;

  // Generate stable random particles
  const particles = useMemo(() => Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    angle: Math.random() * 360,
    distance: 100 + Math.random() * 400,
    size: Math.random() * 6 + 2,
    color: Math.random() > 0.6 ? '#c0a062' : '#b33939', // Gold or Red
    delay: Math.random() * 0.2,
    duration: 0.8 + Math.random() * 0.8
  })), []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-500" />

        <div className="relative flex items-center justify-center">
            {/* Particle Explosion System */}
            {particles.map((p) => (
              <motion.div
                key={p.id}
                initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                animate={{
                  x: Math.cos(p.angle * (Math.PI / 180)) * p.distance,
                  y: Math.sin(p.angle * (Math.PI / 180)) * p.distance,
                  opacity: 0,
                  scale: [0, 1.5, 0]
                }}
                transition={{ 
                  duration: p.duration, 
                  delay: p.delay,
                  ease: [0.22, 1, 0.36, 1] // Custom ease out cubic
                }}
                className="absolute rounded-full shadow-[0_0_10px_currentColor]"
                style={{
                  width: p.size,
                  height: p.size,
                  backgroundColor: p.color,
                  color: p.color
                }}
              />
            ))}

            {/* Shockwave Ring */}
            <motion.div 
              initial={{ scale: 0, opacity: 1, borderWidth: "10px" }}
              animate={{ scale: 2, opacity: 0, borderWidth: "0px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute w-64 h-64 rounded-full border-nordic-gold"
            />

            {/* Main Modal Content */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 1.2, opacity: 0 }}
              transition={{ type: "spring", damping: 15, stiffness: 200 }}
              className="relative bg-gradient-to-b from-gray-900 to-black border-2 border-nordic-gold px-12 py-10 rounded-2xl shadow-[0_0_100px_rgba(192,160,98,0.4)] text-center overflow-hidden z-10 min-w-[300px]"
            >
               {/* God Rays / Sheen */}
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(192,160,98,0.2)_0%,_transparent_70%)] animate-pulse" />
               <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-[100%] bg-[conic-gradient(from_0deg_at_50%_50%,_transparent_0deg,_rgba(192,160,98,0.1)_60deg,_transparent_120deg)] opacity-50"
               />

               <motion.h2 
                 animate={{ 
                   textShadow: ["0 0 10px #b33939", "0 0 40px #c0a062", "0 0 10px #b33939"],
                   scale: [1, 1.05, 1]
                 }}
                 transition={{ duration: 2, repeat: Infinity }}
                 className="relative text-5xl md:text-7xl font-cinzel font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 via-nordic-gold to-yellow-700 mb-6 tracking-tighter z-10"
               >
                 BIG WIN
               </motion.h2>
               
               <motion.div 
                 initial={{ scale: 1 }}
                 animate={{ scale: [1, 1.1, 1] }}
                 transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 1.5 }}
                 className="relative z-10 flex flex-col items-center"
               >
                 <span className="text-nordic-gold text-sm font-cinzel tracking-[0.3em] uppercase mb-1 opacity-80">Total Win</span>
                 <span className="text-4xl text-white font-bold tracking-widest font-cinzel drop-shadow-lg">
                   +{amount.toFixed(2)}
                 </span>
               </motion.div>
            </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};