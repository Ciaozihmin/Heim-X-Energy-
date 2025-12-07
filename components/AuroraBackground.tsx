import React from 'react';

export const AuroraBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-heim-fjord">
      {/* Deep Base */}
      <div className="absolute inset-0 bg-gradient-to-b from-heim-fjord via-[#002433] to-heim-iron opacity-90" />
      
      {/* Aurora Wave 1 */}
      <div className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] bg-heim-ice/10 rounded-full blur-[100px] animate-aurora-flow mix-blend-screen" />
      
      {/* Aurora Wave 2 (Green) */}
      <div className="absolute top-[20%] right-[0%] w-[60vw] h-[60vw] bg-heim-aurora/10 rounded-full blur-[120px] animate-pulse-slow mix-blend-overlay" />
      
      {/* Bottom Glow */}
      <div className="absolute bottom-0 left-0 right-0 h-[40vh] bg-gradient-to-t from-heim-aurora/5 to-transparent" />
    </div>
  );
};