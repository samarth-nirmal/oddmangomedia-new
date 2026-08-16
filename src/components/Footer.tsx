import { motion } from 'motion/react';
import { Instagram, Twitter, Youtube, Mail } from 'lucide-react';
import mangoLogo from '../assets/mango-logo-orange.png';

export const Footer = () => {
  return (
    <footer className="w-full bg-[#050505] text-white pt-16 md:pt-24 border-t border-white/10 snap-start flex flex-col">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-start gap-16 md:gap-10 pb-16 md:pb-24">
        
        {/* Left Side: Logo */}
        <div className="flex flex-col gap-6">
          <img src={mangoLogo} alt="Odd Mango Media Logo" className="w-48 md:w-72 h-auto object-contain" />
          <p className="text-zinc-500 text-[11px] md:text-xs max-w-xs font-bold uppercase tracking-widest leading-relaxed">
            Crafting cinematic experiences and pushing the boundaries of visual storytelling.
          </p>
        </div>

        {/* Right Side: Links & Socials */}
        <div className="flex flex-col md:flex-row gap-12 md:gap-24">
          <div className="flex flex-col gap-5">
            <h4 className="text-[10px] md:text-xs font-black uppercase tracking-[0.25em] text-white">Studio</h4>
            <a href="#" className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">About Us</a>
            <a href="#" className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">Featured Works</a>
            <a href="#" className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">Directors</a>
            <a href="#" className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">Careers</a>
          </div>
          
          <div className="flex flex-col gap-5">
            <h4 className="text-[10px] md:text-xs font-black uppercase tracking-[0.25em] text-white">Connect</h4>
            <a href="#" className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">Contact</a>
            <a href="#" className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">Press</a>
            <a href="#" className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">Instagram</a>
            <a href="#" className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">Vimeo</a>
          </div>
        </div>
        
      </div>
      
      <div className="container mx-auto px-6 py-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-zinc-600 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em]">© {new Date().getFullYear()} Odd Mango Media. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="text-zinc-600 hover:text-white transition-colors"><Instagram size={16} /></a>
          <a href="#" className="text-zinc-600 hover:text-white transition-colors"><Twitter size={16} /></a>
          <a href="#" className="text-zinc-600 hover:text-white transition-colors"><Youtube size={16} /></a>
          <a href="#" className="text-zinc-600 hover:text-white transition-colors"><Mail size={16} /></a>
        </div>
      </div>

      {/* Marquee Banner Below Footer */}
      <div className="w-full bg-[#f97316] text-black overflow-hidden py-3 border-t border-black mt-auto">
        <motion.div 
          className="flex whitespace-nowrap w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        >
          {[...Array(40)].map((_, i) => (
            <span key={i} className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] px-4">
              TALK WITH US •
            </span>
          ))}
        </motion.div>
      </div>
    </footer>
  );
};
