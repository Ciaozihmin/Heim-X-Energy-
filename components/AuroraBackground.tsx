
import React from 'react';

export const AuroraBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-heim-fjord">
      {/* 1. Base Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-heim-fjord via-[#002433] to-heim-iron opacity-90" />

      {/* 2. Engineering Grid (Dots) - Represents Structure & Tech */}
      <div 
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(167, 211, 232, 0.4) 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}
      />

      {/* 3. Topographic Lines (SVG Overlay) - Represents Nature & Flow */}
      <svg 
        className="absolute inset-0 w-full h-full opacity-30" 
        xmlns="http://www.w3.org/2000/svg" 
        preserveAspectRatio="none" 
        viewBox="0 0 100 100"
      >
        {/* Large flowing curves suggesting fjords/maps */}
        <path d="M0,20 C30,5 70,35 100,15" fill="none" stroke="#A7D3E8" strokeWidth="0.2" vectorEffect="non-scaling-stroke" className="opacity-50" />
        <path d="M0,50 C20,40 50,70 100,45" fill="none" stroke="#6FFFB0" strokeWidth="0.3" vectorEffect="non-scaling-stroke" className="opacity-30" />
        <path d="M0,85 C40,70 60,95 100,80" fill="none" stroke="#A7D3E8" strokeWidth="0.2" vectorEffect="non-scaling-stroke" className="opacity-40" />
        
        {/* Vertical thin guide lines for 'engineering' feel */}
        <line x1="20" y1="0" x2="20" y2="100" stroke="white" strokeWidth="0.1" strokeDasharray="1,2" opacity="0.3" vectorEffect="non-scaling-stroke" />
        <line x1="80" y1="0" x2="80" y2="100" stroke="white" strokeWidth="0.1" strokeDasharray="1,2" opacity="0.3" vectorEffect="non-scaling-stroke" />
      </svg>
      
      {/* 4. Noise Texture - Adds materiality */}
      <div className="absolute inset-0 opacity-[0.12] mix-blend-overlay">
         <svg className="w-full h-full">
            <filter id="noiseFilter">
              <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
         </svg>
      </div>

      {/* 5. Aurora Wave 1 (Ice Blue) */}
      <div className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] bg-heim-ice/10 rounded-full blur-[100px] animate-aurora-flow mix-blend-screen" />
      
      {/* 6. Aurora Wave 2 (Aurora Green) */}
      <div className="absolute top-[20%] right-[0%] w-[60vw] h-[60vw] bg-heim-aurora/10 rounded-full blur-[120px] animate-pulse-slow mix-blend-overlay" />
      
      {/* 7. Bottom Glow */}
      <div className="absolute bottom-0 left-0 right-0 h-[40vh] bg-gradient-to-t from-heim-aurora/5 to-transparent" />
    </div>
  );
};
