import { motion } from 'motion/react';
import { Menu } from 'lucide-react';
import { useEffect } from 'react';
import whiteLogo from '../assets/logo-white.png';
import orangeLogo from '../assets/mango-logo-orange.png';
import { Footer } from './Footer';

interface AboutPageProps {
  onNavigate: (page: 'home' | 'films' | 'about') => void;
}

const TEAM = [
  { name: 'KUNAL MEHRA', role: 'Director / Founder', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400&h=500' },
  { name: 'SARAH CHEN', role: 'Director of Photography', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400&h=500' },
  { name: 'MARCUS WRIGHT', role: 'Executive Producer', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=500' }
];

export default function AboutPage({ onNavigate }: AboutPageProps) {
  useEffect(() => {
    // Force instant scroll to top and remove any smooth scrolling behavior temporarily
    const originalStyle = window.getComputedStyle(document.documentElement).scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    document.documentElement.style.scrollBehavior = originalStyle;
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="w-full min-h-screen bg-black text-white relative flex flex-col pt-24 overflow-x-hidden select-none"
    >
      {/* Navigation */}
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
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
            <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors cursor-pointer">HOME</button>
            <button onClick={() => onNavigate('films')} className="hover:text-white transition-colors cursor-pointer">FILMS</button>
            <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors cursor-pointer text-white">ABOUT</button>
            <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors cursor-pointer">CONTACT</button>
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

      {/* Content */}
      <main className="flex-1 px-4 md:px-12 flex flex-col items-center justify-center relative pb-24 min-h-[80vh]">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12 relative"
        >
          {/* Decorative glow */}
          <div className="absolute inset-0 bg-orange-500/10 blur-[100px] rounded-full scale-150 pointer-events-none"></div>
          <img src={orangeLogo} alt="Mango Logo" className="w-48 h-48 md:w-64 md:h-64 object-contain relative z-10 drop-shadow-2xl" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center max-w-3xl mx-auto z-10"
        >
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-wider mb-6 text-white drop-shadow-lg text-center leading-tight">
            ODD MANGO<br/>MEDIA
          </h1>
          
          <div className="space-y-6 text-lg md:text-xl text-zinc-300 font-sans font-light leading-relaxed">
            <p>
              We are a passionate collective of visual storytellers, directors, and cinematographers dedicated to pushing the boundaries of the moving image. At Odd Mango Media, we believe every frame should evoke emotion and every sequence should leave a lasting impression.
            </p>
            <p>
              From gritty urban documentaries to high-fashion commercial spots, our diverse portfolio reflects a relentless pursuit of visual perfection and narrative depth. We blend technical mastery with creative audacity to deliver cinematic experiences that resonate.
            </p>
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-6xl mx-auto mt-32 z-10"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-widest text-white uppercase font-display">Our Team</h2>
            <div className="w-16 h-1 bg-orange-500 mx-auto mt-6"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {TEAM.map((member, idx) => (
              <motion.div 
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group cursor-pointer flex flex-col items-center"
              >
                <div className="relative w-full aspect-[4/5] overflow-hidden mb-6 bg-zinc-900 rounded-sm">
                  <img 
                    src={member.img} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <h3 className="text-xl font-bold tracking-widest text-white mb-2">{member.name}</h3>
                <p className="text-sm font-bold tracking-widest text-orange-500/80">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </main>

      <Footer />
    </motion.div>
  );
}
