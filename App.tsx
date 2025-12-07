import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Home, Sparkles, ChevronDown, Instagram } from 'lucide-react';
import { AuroraBackground } from './components/AuroraBackground';
import { LogoMark } from './components/LogoMark';
import { InstagramCarousel } from './components/InstagramCarousel';
import { BRAND_COLORS, BRAND_ELEMENTS, BRAND_QUOTE } from './constants';

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="relative min-h-screen text-white font-sans selection:bg-heim-aurora selection:text-heim-fjord">
      <AuroraBackground />

      {/* Navigation / Header */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-heim-fjord/80 backdrop-blur-md py-4 border-b border-white/5' : 'bg-transparent py-8'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <LogoMark scale={0.4} />
            <span className="font-display font-bold text-xl tracking-wider text-white">
              HEIM <span className="text-heim-aurora">×</span> ENERGI
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-heim-ice/80 uppercase tracking-widest">
            <a href="#concept" className="hover:text-heim-aurora transition-colors">Concept</a>
            <a href="#social" className="hover:text-heim-aurora transition-colors">Story</a>
            <a href="#colors" className="hover:text-heim-aurora transition-colors">Palette</a>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        
        {/* HERO SECTION */}
        <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 pt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-12"
          >
            <LogoMark scale={3} animated={true} />
          </motion.div>

          <motion.h1 
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-4"
          >
            HEIM <span className="text-heim-aurora inline-block mx-2">×</span> ENERGI
          </motion.h1>

          <motion.div 
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
            className="space-y-2"
          >
            <p className="text-2xl md:text-3xl text-heim-ice font-light tracking-wide">
              啟北之光
            </p>
            <p className="text-sm md:text-base text-gray-400 uppercase tracking-[0.3em] mt-4">
              The Light of the North
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-heim-ice/50 animate-bounce"
          >
            <span className="text-xs uppercase tracking-widest">Discover</span>
            <ChevronDown size={20} />
          </motion.div>
        </section>

        {/* QUOTE SECTION */}
        <section id="vision" className="py-32 px-6 container mx-auto text-center relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-1/2 bg-heim-aurora/5 blur-[100px] rounded-full pointer-events-none" />
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="relative max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-display leading-tight mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white via-heim-ice to-white">
              "{BRAND_QUOTE.main}"
            </h2>
            <p className="text-lg text-heim-ice/70 font-light italic">
              {BRAND_QUOTE.sub}
            </p>
          </motion.div>
        </section>

        {/* SOCIAL MEDIA / STORY SECTION */}
        <section id="social" className="py-24 px-6 bg-heim-fjord/30 border-t border-white/5">
           <div className="container mx-auto flex flex-col items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="mb-12 text-center"
            >
              <div className="flex items-center justify-center gap-2 mb-2 text-heim-aurora">
                <Instagram size={20} />
                <h3 className="text-sm font-bold uppercase tracking-widest">Manifesto</h3>
              </div>
              <h2 className="text-3xl font-display font-bold">The Story of Heim × Energi</h2>
            </motion.div>
            
            <InstagramCarousel />
           </div>
        </section>

        {/* CONCEPT DECONSTRUCTION */}
        <section id="concept" className="py-24 px-6 bg-heim-iron/30 backdrop-blur-sm border-y border-white/5">
          <div className="container mx-auto">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="mb-16 text-center"
            >
              <h3 className="text-sm font-bold text-heim-aurora uppercase tracking-widest mb-2">Deconstruction</h3>
              <h2 className="text-3xl font-display font-bold">Logo Anatomy</h2>
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {BRAND_ELEMENTS.map((el) => (
                <div key={el.id} className="group relative p-8 bg-heim-fjord/50 border border-white/5 hover:border-heim-aurora/30 transition-colors duration-500 rounded-xl overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <span className="text-6xl font-display font-bold">{el.id}</span>
                  </div>
                  
                  <div className="mb-6 w-12 h-12 flex items-center justify-center rounded-lg bg-white/5 text-heim-aurora group-hover:scale-110 transition-transform duration-500">
                    {el.icon === 'rune' && <Home size={24} strokeWidth={1.5} />}
                    {el.icon === 'type' && <Zap size={24} strokeWidth={1.5} />}
                    {el.icon === 'cross' && <Sparkles size={24} strokeWidth={1.5} />}
                  </div>

                  <h4 className="text-xl font-bold mb-1 font-display">{el.title}</h4>
                  <p className="text-sm text-heim-aurora mb-4 uppercase tracking-wider font-medium">{el.subtitle}</p>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    {el.description}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* COLOR PALETTE */}
        <section id="colors" className="py-24 px-6 container mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mb-16"
          >
            <h3 className="text-sm font-bold text-heim-aurora uppercase tracking-widest mb-2">System</h3>
            <h2 className="text-3xl font-display font-bold">Arctic Ocean Palette</h2>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {BRAND_COLORS.map((color) => (
              <motion.div 
                key={color.hex}
                variants={fadeIn}
                className="group relative h-64 rounded-2xl overflow-hidden shadow-2xl transition-transform hover:-translate-y-2 duration-300"
              >
                <div 
                  className="absolute inset-0"
                  style={{ backgroundColor: color.hex }}
                />
                
                {/* Content Overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className={`font-bold font-display text-lg ${color.textColor === 'text-heim-fjord' ? 'text-gray-900' : 'text-white'}`}>
                    {color.name}
                  </p>
                  <p className={`text-xs uppercase tracking-wider mb-2 ${color.textColor === 'text-heim-fjord' ? 'text-gray-800' : 'text-gray-200'}`}>
                    {color.hex}
                  </p>
                  <p className={`text-sm ${color.textColor === 'text-heim-fjord' ? 'text-gray-900' : 'text-gray-300'}`}>
                    {color.description}
                  </p>
                </div>

                {/* Always visible label for mobile mostly, but fading on hover for desktop */}
                <div className="absolute bottom-4 left-4 group-hover:opacity-0 transition-opacity duration-300">
                  <span className={`text-sm font-medium px-3 py-1 rounded-full bg-white/20 backdrop-blur-md ${color.textColor === 'text-heim-fjord' ? 'text-black' : 'text-white'}`}>
                    {color.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* FOOTER */}
        <footer className="py-12 border-t border-white/5 bg-heim-fjord text-center">
          <div className="flex justify-center mb-6">
            <LogoMark scale={0.5} />
          </div>
          <p className="text-heim-ice/40 text-sm font-light">
            © 2024 Heim × Energi. All Rights Reserved.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default App;