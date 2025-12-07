
import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { INSTAGRAM_SLIDES } from '../constants';
import { LogoMark } from './LogoMark';
import { InstagramSlide } from '../types';
import { Plus, Minus } from 'lucide-react';

export const Manifesto: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="relative w-full max-w-5xl mx-auto py-20">
      
      {/* The Energy Line - Connecting the story */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 hidden md:block">
        <motion.div 
          style={{ height }}
          className="w-full bg-gradient-to-b from-heim-aurora via-heim-ice to-heim-aurora shadow-[0_0_15px_rgba(111,255,176,0.6)]"
        />
      </div>

      <div className="flex flex-col gap-12 md:gap-24">
        {INSTAGRAM_SLIDES.map((slide, index) => (
          <ManifestoBlock key={slide.id} slide={slide} index={index} />
        ))}
      </div>
    </div>
  );
};

const ManifestoBlock: React.FC<{ slide: InstagramSlide; index: number }> = ({ slide, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isEven = index % 2 === 0;

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div 
      className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-24 z-10 cursor-pointer group ${isEven ? 'md:flex-row-reverse' : ''}`}
      onClick={toggleOpen}
    >
      
      {/* Number / Trigger Side */}
      <div className="flex-1 w-full flex justify-center items-center">
         <motion.div
           initial={{ opacity: 0, scale: 0.8 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true, margin: "-50px" }}
           transition={{ duration: 0.6 }}
           className="relative"
         >
            {/* The Big Number Bubble */}
            <div className={`
              w-32 h-32 md:w-56 md:h-56 rounded-full 
              border transition-all duration-500
              flex items-center justify-center 
              bg-heim-fjord/40 backdrop-blur-sm
              relative overflow-hidden
              ${isOpen ? 'border-heim-aurora shadow-[0_0_40px_rgba(111,255,176,0.2)]' : 'border-white/10 group-hover:border-heim-aurora/50'}
            `}>
              <span className={`
                font-display text-7xl md:text-9xl font-bold transition-colors duration-500
                ${isOpen ? 'text-heim-aurora' : 'text-white/10 group-hover:text-white/30'}
              `}>
                 {index + 1}
              </span>

              {/* Toggle Icon */}
              <div className={`absolute bottom-6 md:bottom-8 transition-transform duration-500 ${isOpen ? 'rotate-180 text-heim-aurora' : 'text-heim-ice/50'}`}>
                 {isOpen ? <Minus size={24} /> : <Plus size={24} />}
              </div>
            </div>
         </motion.div>
      </div>

      {/* Content Side */}
      <div className={`flex-1 w-full text-center ${isEven ? 'md:text-right' : 'md:text-left'}`}>
        <motion.div 
          initial={{ opacity: 0, x: isEven ? -20 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Main Heading - Always Visible */}
          <h2 className={`
            font-display text-4xl md:text-6xl font-bold tracking-tight mb-4
            transition-colors duration-300
            ${isOpen ? 'text-white' : 'text-heim-ice/80 group-hover:text-white'}
          `}>
            {slide.heading || `PART ${index + 1}`}
          </h2>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className={`
                  pt-4 md:pt-8 pb-4
                  ${isEven ? 'md:pl-12' : 'md:pr-12'}
                `}>
                  {/* Subtitle */}
                  {(slide.subtitle || slide.title) && (
                    <div className="mb-6 border-l-2 border-heim-aurora pl-4 text-left">
                       {slide.subtitle && <p className="text-heim-aurora text-xs font-bold uppercase tracking-[0.3em] mb-2">{slide.subtitle}</p>}
                       {slide.title && <p className="font-display text-xl md:text-2xl font-bold text-white leading-tight whitespace-pre-wrap">{slide.title}</p>}
                    </div>
                  )}

                  {/* Body Text */}
                  <div className="space-y-6 text-left">
                    {slide.blocks.map((block, i) => (
                      <div key={i} className="space-y-2">
                        {block.cn && <p className="text-base md:text-lg text-gray-200 font-light leading-relaxed whitespace-pre-wrap">{block.cn}</p>}
                        {block.en && <p className="text-sm text-gray-400 font-light leading-relaxed whitespace-pre-wrap italic">{block.en}</p>}
                      </div>
                    ))}
                  </div>

                  {slide.footer && (
                    <div className="mt-8 pt-6 border-t border-white/10 text-heim-aurora font-display font-bold text-left">
                      {slide.footer}
                    </div>
                  )}
                  
                  {slide.layout === 'final' && (
                     <div className="mt-8 flex justify-center md:justify-start">
                        <LogoMark scale={0.8} animated={true} />
                     </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {!isOpen && (
            <motion.p 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               className="text-xs text-heim-ice/30 uppercase tracking-[0.2em] mt-2 group-hover:text-heim-aurora/70 transition-colors"
            >
              Tap to explore
            </motion.p>
          )}

        </motion.div>
      </div>
    </div>
  );
};
