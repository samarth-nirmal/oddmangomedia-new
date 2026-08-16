import { motion, useScroll, useTransform, useSpring, MotionValue, useMotionValueEvent } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { FeaturedWorks } from './FeaturedWorks';

import { Footer } from './Footer';
import whiteLogo from '../assets/logo-white.png';

const FILMS = [
  { id: 1, title: 'NEON NIGHTS', subtitle: 'A cinematic journey through the glowing streets of Tokyo.', type: 'COMMERCIAL', video: 'https://ak.picdn.net/shutterstock/videos/1047395026/preview/stock-footage-neon-light-of-taipei-city.mp4' },
  { id: 2, title: 'URBAN ECHO', subtitle: 'Exploring the concrete canyons and architectural marvels.', type: 'MUSIC VIDEO', video: 'https://ak.picdn.net/shutterstock/videos/1026033479/preview/stock-footage-abstract-animation-of-futuristic-surface.mp4' },
  { id: 3, title: 'SILENT DRIFT', subtitle: 'The art of motion and the beauty of the open road.', type: 'SHORT FILM', video: 'https://ak.picdn.net/shutterstock/videos/1029415412/preview/stock-footage-car-driving-on-a-road.mp4' },
  { id: 4, title: 'WILDHEART', subtitle: 'Raw nature and the untamed spirit of the wilderness.', type: 'DOCUMENTARY', video: 'https://ak.picdn.net/shutterstock/videos/1049964505/preview/stock-footage-ocean-waves.mp4' },
  { id: 5, title: 'CHROMATIC', subtitle: 'A vibrant exploration of color theory in fashion.', type: 'FASHION', video: 'https://ak.picdn.net/shutterstock/videos/1028726588/preview/stock-footage-colorful-smoke.mp4' }
];

function FilmCard({ film, index, scrollProgress }: { film: typeof FILMS[0], index: number, scrollProgress: MotionValue<number> }) {
  const start = (index - 1) * 0.25;
  const end = index * 0.25;
  
  const x = useTransform(
    scrollProgress,
    [start, end],
    index === 0 ? ["0%", "0%"] : ["100%", "0%"]
  );

  return (
    <motion.div
      style={{ x, zIndex: index }}
      className="absolute inset-0 w-full h-full flex flex-col md:flex-row overflow-hidden"
    >
      {/* Left Info Panel (30%) */}
      <div className="w-full md:w-[30%] h-[40%] md:h-full bg-[#161616] flex flex-col px-8 md:px-12 lg:px-16 xl:px-24 relative z-10 pt-32 pb-12 md:py-24">
        <div className="flex-1 flex flex-col justify-center">
          <h3 className="text-[clamp(2.5rem,10vw,4rem)] md:text-[clamp(2.5rem,4vw,6.5rem)] font-bold uppercase tracking-tighter text-white leading-[0.85] scale-y-110 origin-bottom mb-6 md:mb-8 break-words">
            {film.title}
          </h3>
          <p className="text-white/80 text-sm md:text-base lg:text-lg font-medium tracking-wide mb-8 md:mb-12 max-w-sm">
            {film.subtitle}
          </p>
        </div>
      </div>
      
      {/* Right Video Panel (65%) */}
      <div className="w-full md:w-[65%] h-[60%] md:h-full relative overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-1000 scale-105 hover:scale-100"
        >
          <source src={film.video} type="video/mp4" />
        </video>
      </div>

      {/* Far Right Panel (5%) */}
      <div className="hidden md:block md:w-[5%] h-full bg-[#161616]"></div>
    </motion.div>
  );
}

export default function LandingPage({ onNavigate }: { onNavigate?: (page: 'home' | 'films' | 'about') => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [activeFilm, setActiveFilm] = useState(1);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.classList.add('snap-enabled');
    return () => document.documentElement.classList.remove('snap-enabled');
  }, []);
  
  // For hero section fade out
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroOpacity = useTransform(heroProgress, [0, 1], [1, 0]);
  const heroY = useTransform(heroProgress, [0, 1], [0, 200]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    mass: 0.5,
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const glowColor = useTransform(
    smoothProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [
      "rgba(252, 238, 10, 0.25)",
      "rgba(10, 252, 238, 0.25)",
      "rgba(252, 10, 100, 0.25)",
      "rgba(100, 252, 10, 0.25)",
      "rgba(150, 10, 252, 0.25)"
    ]
  );

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const index = Math.round(latest * (FILMS.length - 1)) + 1;
    setActiveFilm(index);
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="w-full bg-black min-h-screen text-white font-sans overflow-clip"
    >
      {/* Navigation */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-8 left-1/2 -translate-x-1/2 z-50 flex"
      >
        {/* Mobile Menu */}
        <button className="md:hidden flex items-center justify-center w-10 h-10 bg-black/50 backdrop-blur-md shadow-2xl rounded-md text-white hover:bg-white/10 transition-colors">
          <Menu size={20} strokeWidth={1.5} />
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          {/* Main Navigation */}
          <nav className="flex items-center gap-6 bg-black/50 backdrop-blur-md shadow-2xl rounded-md px-6 h-10 text-xs font-bold tracking-wider text-zinc-400">
            <button onClick={() => onNavigate?.('home')} className="hover:text-white transition-colors cursor-pointer text-white">HOME</button>
            <button onClick={() => onNavigate?.('films')} className="hover:text-white transition-colors cursor-pointer">FILMS</button>
            <button onClick={() => onNavigate?.('about')} className="hover:text-white transition-colors cursor-pointer">ABOUT</button>
            <button onClick={() => onNavigate?.('home')} className="hover:text-white transition-colors cursor-pointer">CONTACT</button>
          </nav>

          {/* Shop Button */}
          <motion.a 
            href="#" 
            className="flex items-center justify-center w-10 h-10 bg-black/50 backdrop-blur-md shadow-2xl rounded-md"
            whileHover={{ rotateY: 360 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
             <img src={whiteLogo} alt="Logo" className="w-6 h-6 object-contain" />
          </motion.a>
        </div>
      </motion.div>

      {/* Hero Section */}
      <div ref={heroRef} className="h-screen w-full relative z-0 snap-start overflow-hidden">
        <motion.div style={{ opacity: heroOpacity, y: heroY }} className="w-full h-full">
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative flex flex-col items-center justify-center h-screen p-8 text-center overflow-hidden"
          >
          <div className="absolute inset-0 w-full h-full z-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-60 blur-xl scale-110"
            >
              <source src="https://ak.picdn.net/shutterstock/videos/1031448833/preview/stock-footage-business-people-walking-on-street-in-city.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Side Texts Container */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="absolute inset-0 pointer-events-none z-10 hidden md:block"
          >
            <div className="w-full px-8 xl:px-16 relative h-full flex items-center justify-center">
              {/* Top */}
              <div className="absolute top-[35%] -translate-y-full left-1/2 -translate-x-1/2 text-xs font-bold tracking-widest text-zinc-300 whitespace-nowrap">
                // WE BUILD VISUAL GENRES //
              </div>

              {/* Left */}
              <div className="absolute left-6 xl:left-12 flex flex-col items-start text-[10px] md:text-xs font-bold tracking-[0.2em] text-zinc-300 gap-2 text-left">
                <span>EST. 2020</span>
                <span>MUSIC • MOTION • COLORS</span>
              </div>

              {/* Right */}
              <div className="absolute right-6 xl:right-12 flex flex-col items-end text-[10px] md:text-xs font-bold tracking-[0.2em] text-zinc-300 gap-2 text-right">
                <span>BASED IN INDIA</span>
                <span>WORKING GLOBALLY</span>
              </div>

              {/* Bottom */}
              <div className="absolute bottom-[35%] translate-y-full left-1/2 -translate-x-1/2 flex flex-col items-center text-xs font-bold tracking-widest text-zinc-300 gap-2 text-center whitespace-nowrap">
                <span>PRODUCTION HOUSE</span>
                <span>CRAFTED FOR ARTISTS & BRANDS</span>
              </div>
            </div>
          </motion.div>

          <motion.h1 
            initial={{ scale: 15, filter: 'blur(10px)' }}
            animate={{ scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 text-5xl md:text-[9rem] font-normal uppercase tracking-[0.3em] md:tracking-[0.4em] max-w-5xl leading-[0.9] ml-[0.3em] md:ml-[0.4em] text-white"
          >
            Mango
          </motion.h1>
          </motion.section>
        </motion.div>
      </div>

      {/* Featured Films Section */}
      <section ref={containerRef} className="relative w-full bg-[#050505] h-[500vh]">
        <div className="absolute inset-0 w-full pointer-events-none">
          {FILMS.map((_, i) => (
            <div key={i} className="absolute w-full snap-start h-screen" style={{ top: `${i * 100}vh` }} />
          ))}
        </div>
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col pt-32 pb-12">
          
          {/* Animated Background Glow */}
          <motion.div 
            className="absolute top-[-10%] left-0 w-full h-[60vh] blur-[150px] pointer-events-none z-0"
            style={{ backgroundColor: glowColor, opacity: 0.6 }}
          />

          {/* Header */}
          <div className="px-12 md:px-24 mb-12 flex items-center justify-between relative flex-shrink-0 z-20">
            <div className="flex flex-col text-sm font-bold tracking-widest text-zinc-400">
              <span className="flex">
                ({activeFilm}/{FILMS.length})
              </span>
              <span>FILMS</span>
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 text-center whitespace-nowrap overflow-hidden py-4">
              <motion.h2 
                initial={{ y: 60, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-3xl md:text-5xl lg:text-7xl font-bold tracking-tighter uppercase text-white scale-y-110 leading-none"
              >
                FEATURED FILMS
              </motion.h2>
            </div>
            <button 
              onClick={() => onNavigate?.('films')} 
              className="flex flex-col text-right text-sm font-bold tracking-widest text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <span>ALL</span>
              <span>FILMS</span>
            </button>
          </div>
          
          {/* Cards container */}
          <div className="relative flex-1 w-full z-10">
            {FILMS.map((film, index) => (
              <FilmCard key={film.id} film={film} index={index} scrollProgress={smoothProgress} />
            ))}
          </div>

        </div>
      </section>

      {/* Featured Works Section */}
      <FeaturedWorks />

      {/* Footer Section */}
      <Footer />
    </motion.div>
  );
}
