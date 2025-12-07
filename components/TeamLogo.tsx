import React from 'react';
import { motion } from 'framer-motion';

interface TeamLogoProps {
  role: 'research' | 'internal' | 'external' | 'publicity';
  className?: string;
  scale?: number;
}

export const TeamLogo: React.FC<TeamLogoProps> = ({ role, className = "", scale = 1 }) => {
  const size = 100 * scale;
  const strokeWidth = 6;
  const primaryColor = "#A7D3E8"; // Ice Blue
  const secondaryColor = "#6FFFB0"; // Aurora Green

  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 2, ease: "easeInOut" },
        opacity: { duration: 0.5 }
      }
    }
  };

  const renderLogo = () => {
    switch (role) {
      case 'research':
        // The Lens / Focus - Diamond with core
        return (
          <>
            <motion.path
              d="M50 10 L90 50 L50 90 L10 50 Z"
              stroke={primaryColor}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              fill="transparent"
              variants={draw}
            />
            <motion.circle
              cx="50"
              cy="50"
              r="12"
              stroke={secondaryColor}
              strokeWidth={strokeWidth}
              fill="transparent"
              variants={draw}
            />
            <motion.circle
              cx="50"
              cy="50"
              r="4"
              fill={secondaryColor}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </>
        );
      case 'internal':
        // The Knot / Structure - Interlocking Square
        return (
          <>
            <motion.rect
              x="20"
              y="20"
              width="60"
              height="60"
              rx="4"
              stroke={primaryColor}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              fill="transparent"
              variants={draw}
            />
            <motion.path
              d="M50 20 L50 80 M20 50 L80 50"
              stroke={secondaryColor}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              variants={draw}
            />
            <motion.rect
              x="35"
              y="35"
              width="30"
              height="30"
              stroke={primaryColor}
              strokeWidth={strokeWidth/2}
              fill="transparent"
              variants={draw}
              style={{ rotate: 45, transformOrigin: 'center' }}
            />
          </>
        );
      case 'external':
        // The Compass / Outward - Arrows
        return (
          <>
             <motion.circle
              cx="50"
              cy="50"
              r="8"
              stroke={primaryColor}
              strokeWidth={strokeWidth}
              fill="transparent"
              variants={draw}
            />
            {/* North East */}
            <motion.path d="M56 44 L85 15 M85 15 L85 30 M85 15 L70 15" stroke={secondaryColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" variants={draw} />
            {/* South West */}
            <motion.path d="M44 56 L15 85 M15 85 L15 70 M15 85 L30 85" stroke={secondaryColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" variants={draw} />
             {/* North West */}
            <motion.path d="M44 44 L15 15" stroke={primaryColor} strokeWidth={strokeWidth} strokeLinecap="round" variants={draw} />
             {/* South East */}
            <motion.path d="M56 56 L85 85" stroke={primaryColor} strokeWidth={strokeWidth} strokeLinecap="round" variants={draw} />
          </>
        );
      case 'publicity':
        // The Beacon / Waves - Signal
        return (
          <>
            {/* Tower */}
            <motion.line
              x1="50" y1="90" x2="50" y2="30"
              stroke={primaryColor}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              variants={draw}
            />
            <motion.circle
               cx="50" cy="20" r="6" fill={secondaryColor}
               initial={{ opacity: 0.5 }}
               animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.2, 1] }}
               transition={{ duration: 1.5, repeat: Infinity }}
            />
            {/* Waves Left */}
            <motion.path d="M30 40 Q 20 30 30 20" stroke={secondaryColor} strokeWidth={strokeWidth} strokeLinecap="round" fill="transparent" variants={draw} />
            <motion.path d="M20 50 Q 5 30 20 10" stroke={primaryColor} strokeWidth={strokeWidth} strokeLinecap="round" fill="transparent" variants={draw} />
             {/* Waves Right */}
            <motion.path d="M70 40 Q 80 30 70 20" stroke={secondaryColor} strokeWidth={strokeWidth} strokeLinecap="round" fill="transparent" variants={draw} />
            <motion.path d="M80 50 Q 95 30 80 10" stroke={primaryColor} strokeWidth={strokeWidth} strokeLinecap="round" fill="transparent" variants={draw} />
          </>
        );
    }
  };

  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="overflow-visible"
      >
        <defs>
           <filter id="glow-team">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <g filter="url(#glow-team)">
          {renderLogo()}
        </g>
      </motion.svg>
    </div>
  );
};