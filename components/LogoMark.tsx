import React from 'react';
import { motion } from 'framer-motion';

interface LogoMarkProps {
  className?: string;
  scale?: number;
  animated?: boolean;
}

export const LogoMark: React.FC<LogoMarkProps> = ({ className = "", scale = 1, animated = false }) => {
  const size = 100 * scale;
  const strokeWidth = 8;
  
  // Animation variants
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay: i * 0.2, type: "spring", duration: 1.5, bounce: 0 },
        opacity: { delay: i * 0.2, duration: 0.01 }
      }
    })
  };

  const glow = {
    hidden: { opacity: 0.5, scale: 0.95 },
    visible: { 
      opacity: [0.5, 0.8, 0.5], 
      scale: [0.95, 1.05, 0.95],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
    }
  };

  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
       {/* Background Glow for the Aurora effect */}
       {animated && (
        <motion.div 
          className="absolute inset-0 bg-heim-aurora/20 blur-3xl rounded-full"
          variants={glow}
          initial="hidden"
          animate="visible"
        />
       )}

      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        initial={animated ? "hidden" : "visible"}
        animate="visible"
        className="z-10 overflow-visible"
      >
        <defs>
          <linearGradient id="auroraGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6FFFB0" />
            <stop offset="50%" stopColor="#A7D3E8" />
            <stop offset="100%" stopColor="#6FFFB0" />
          </linearGradient>
          <filter id="glowFilter">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Part A: The Rune Stems (Heim - ᚼ structure) */}
        {/* Main Vertical Stem */}
        <motion.line
          x1="50" y1="10" x2="50" y2="90"
          stroke="#2B2B2B" /* Iron Grey */
          strokeWidth={strokeWidth}
          strokeLinecap="square"
          variants={draw}
          custom={0}
        />
        
        {/* The Rune Crossbars (Hagalaz style asterisk shape for ᚼ) */}
        <motion.line
          x1="25" y1="35" x2="75" y2="65"
          stroke="#2B2B2B"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          variants={draw}
          custom={1}
        />
        
        {/* Part C: The Light (X) - The Intersection */}
        {/* This represents the 'Spark' and cuts through the rune */}
        <motion.line
          x1="25" y1="65" x2="75" y2="35"
          stroke="url(#auroraGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          filter="url(#glowFilter)"
          variants={draw}
          custom={2}
          className="drop-shadow-[0_0_8px_rgba(111,255,176,0.8)]"
        />
        
        {/* Center Spark point */}
        <motion.circle
           cx="50" cy="50" r="3"
           fill="#fff"
           initial={{ scale: 0 }}
           animate={{ scale: 1 }}
           transition={{ delay: 1.5, type: "spring" }}
        />

      </motion.svg>
    </div>
  );
};