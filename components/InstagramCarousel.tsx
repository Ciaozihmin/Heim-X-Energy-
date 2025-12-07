import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Instagram, Heart, Send, Bookmark } from 'lucide-react';
import { INSTAGRAM_SLIDES } from '../constants';
import { LogoMark } from './LogoMark';
import { InstagramSlide } from '../types';

export const InstagramCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % INSTAGRAM_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + INSTAGRAM_SLIDES.length) % INSTAGRAM_SLIDES.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const currentSlide = INSTAGRAM_SLIDES[currentIndex];

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
      {/* Frame Container */}
      <div className="relative w-full aspect-[4/5] bg-heim-fjord rounded-xl overflow-hidden shadow-2xl border border-white/10 group">
        
        {/* Animated Background for all slides */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-tr from-heim-fjord via-[#002433] to-heim-iron" />
          <motion.div 
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 0.3, scale: 1 }}
            transition={{ duration: 3 }}
            className="absolute top-0 right-0 w-[500px] h-[500px] bg-heim-aurora/20 blur-[100px] rounded-full mix-blend-screen"
            style={{ 
              transform: `translate(${currentIndex % 2 === 0 ? '20%' : '-20%'}, ${currentIndex % 3 === 0 ? '-20%' : '20%'})` 
            }}
          />
          <motion.div 
            key={`ice-${currentIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            transition={{ duration: 2, delay: 0.5 }}
            className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-heim-ice/20 blur-[80px] rounded-full mix-blend-overlay"
          />
        </div>

        {/* Content Transition Wrapper */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute inset-0 z-10 flex flex-col p-8 md:p-10"
          >
            <SlideContent slide={currentSlide} />
          </motion.div>
        </AnimatePresence>

        {/* Slide Indicators */}
        <div className="absolute top-4 right-4 z-20 flex gap-1">
          {INSTAGRAM_SLIDES.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-1 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-6 bg-heim-aurora' : 'w-2 bg-white/20'}`}
            />
          ))}
        </div>

        {/* Brand Watermark */}
        <div className="absolute top-6 left-6 z-20 opacity-80">
          <LogoMark scale={0.3} />
        </div>

        {/* Instagram UI Overlay (Bottom) */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-heim-fjord to-transparent z-20 flex justify-between items-center text-white/80">
            <div className="flex gap-4">
               <Heart size={24} className="hover:text-heim-aurora cursor-pointer transition-colors" />
               <Send size={24} className="hover:text-heim-aurora cursor-pointer transition-colors -rotate-45" />
            </div>
            <Bookmark size={24} className="hover:text-heim-aurora cursor-pointer transition-colors" />
        </div>

        {/* Navigation Buttons (Hidden on mobile, visible on hover/desktop) */}
        <button 
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/20 hover:bg-heim-aurora/20 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-all z-30"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/20 hover:bg-heim-aurora/20 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-all z-30"
        >
          <ChevronRight size={24} />
        </button>
      </div>
      
      {/* Mobile external controls */}
      <div className="flex gap-4 mt-6 md:hidden">
        <button onClick={prevSlide} className="p-2 rounded-full border border-white/20 text-white/80">
          <ChevronLeft size={20} />
        </button>
        <div className="flex items-center text-sm font-mono text-heim-ice">
          {currentIndex + 1} / {INSTAGRAM_SLIDES.length}
        </div>
        <button onClick={nextSlide} className="p-2 rounded-full border border-white/20 text-white/80">
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

const SlideContent: React.FC<{ slide: InstagramSlide }> = ({ slide }) => {
  // Render logic based on layout type
  if (slide.layout === 'cover') {
    return (
      <div className="flex flex-col h-full justify-center">
        <div className="space-y-6">
          <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-heim-ice to-heim-aurora">
             {slide.title}
          </h2>
          <div className="w-12 h-1 bg-heim-aurora/50" />
          {slide.blocks.map((block, i) => (
            <div key={i} className="text-sm md:text-base text-gray-200 font-light leading-relaxed whitespace-pre-wrap">
              {block.cn}
            </div>
          ))}
          {slide.footer && (
            <div className="pt-8 text-heim-aurora font-bold tracking-wider text-sm md:text-lg border-t border-white/10 mt-8">
              {slide.footer}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (slide.layout === 'final') {
    return (
      <div className="flex flex-col h-full items-center justify-center text-center">
        <div className="mb-8 p-8 relative">
           <div className="absolute inset-0 bg-heim-aurora/10 blur-3xl rounded-full animate-pulse" />
           <LogoMark scale={1.5} animated={true} />
        </div>
        <h2 className="font-display text-3xl font-bold mb-2 tracking-wide">
          {slide.title}
        </h2>
        <h3 className="text-xl text-heim-aurora mb-8 font-light tracking-[0.2em]">
          {slide.subtitle}
        </h3>
        {slide.blocks.map((block, i) => (
          <div key={i} className="text-gray-300 font-light text-sm whitespace-pre-wrap">
            {block.cn}
            <div className="h-px w-8 bg-white/20 mx-auto my-4" />
            <span className="text-xs uppercase tracking-widest text-heim-ice/80">{block.en}</span>
          </div>
        ))}
      </div>
    );
  }

  if (slide.layout === 'quote') {
    return (
      <div className="flex flex-col h-full justify-center">
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-8 text-white">
          {slide.title}
        </h2>
        <div className="pl-6 border-l-2 border-heim-aurora space-y-4">
          {slide.blocks.map((block, i) => (
            <div key={i} className="space-y-4">
              {block.cn && <p className="text-lg text-gray-100 whitespace-pre-wrap font-medium">{block.cn}</p>}
              {block.en && <p className="text-sm text-heim-ice/80 italic font-light whitespace-pre-wrap">{block.en}</p>}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Standard Layout
  return (
    <div className="flex flex-col h-full pt-12">
       {slide.subtitle && (
         <span className="text-heim-aurora text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
           {slide.subtitle}
         </span>
       )}
       {slide.title && (
         <h2 className="font-display text-2xl md:text-3xl font-bold mb-8 text-white leading-snug">
           {slide.title}
         </h2>
       )}
       
       <div className="space-y-6 mt-auto pb-12">
         {slide.blocks.map((block, i) => (
           <div key={i} className="space-y-3">
             {block.cn && <p className="text-base text-gray-200 font-light leading-relaxed">{block.cn}</p>}
             {block.en && <p className="text-sm text-gray-400 font-light leading-relaxed">{block.en}</p>}
           </div>
         ))}
       </div>
    </div>
  );
};