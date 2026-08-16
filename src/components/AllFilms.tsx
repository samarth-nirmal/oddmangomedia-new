import { motion } from 'motion/react';

const FILMS_DATA = [
  { 
    id: '01/32', 
    title: 'ABAAD - SEEDHE MAUT, HURRICANE FEAT. ENCORE ABJ & GHAATAK', 
    category: 'MUSIC VIDEO', 
    image: 'https://images.unsplash.com/photo-1493225457124-a1a2a5ea3a71?q=80&w=2940&auto=format&fit=crop', // tall? no, wide
    aspect: 'video'
  },
  { 
    id: '02/32', 
    title: 'LAKMÉ FASHION WEEK 2026', 
    category: 'LIVE EVENT', 
    image: 'https://images.unsplash.com/photo-1550614000-4b9f7a77e8a3?q=80&w=2831&auto=format&fit=crop', 
    aspect: 'portrait'
  },
  { 
    id: '03/32', 
    title: 'WIT IT - TY DOLLA $IGN FT. CHLÖE', 
    category: 'MUSIC VIDEO', 
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2940&auto=format&fit=crop', 
    aspect: 'video'
  },
  { 
    id: '04/32', 
    title: 'RATHER BE - THEKIDLAROI', 
    category: 'EXPERIMENTAL', 
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2940&auto=format&fit=crop', 
    aspect: 'video'
  },
  { 
    id: '05/32', 
    title: 'CENTRAL CEE, ROLLING LOUD INDIA, MUMBAI', 
    category: 'EXPERIMENTAL', 
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2940&auto=format&fit=crop', 
    aspect: 'video'
  },
];

export const AllFilms = () => {
  return (
    <section className="w-full bg-black text-white py-24 md:py-32 snap-start border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12 flex flex-col gap-24">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 md:gap-0">
          
          {/* Left: Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-12"
          >
            <h3 className="text-lg font-bold uppercase tracking-widest text-white">
              ALL FILMS (32)
            </h3>
            
            <div className="grid grid-cols-2 gap-x-12 gap-y-2 text-xs font-bold tracking-widest text-zinc-500 uppercase">
              <span className="hover:text-white transition-colors cursor-pointer">MUSIC VIDEOS (14)</span>
              <span className="hover:text-white transition-colors cursor-pointer">SHORT FILMS (2)</span>
              <span className="hover:text-white transition-colors cursor-pointer">LIVE EVENTS (7)</span>
              <span className="hover:text-white transition-colors cursor-pointer">EXPERIMENTAL (8)</span>
              <span className="hover:text-white transition-colors cursor-pointer">COMMERCIALS (1)</span>
            </div>
          </motion.div>
          
          {/* Right: Giant Text */}
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-[4rem] md:text-[8rem] lg:text-[10rem] font-black uppercase tracking-tighter text-white leading-none scale-y-125 origin-bottom"
          >
            ALL FILMS
          </motion.h2>

        </div>

        {/* Grid Area */}
        {/* Using a flex container with items-end ensures titles align at the bottom */}
        <div className="flex flex-col md:flex-row items-end gap-6 overflow-x-auto pb-8 hide-scrollbar">
          {FILMS_DATA.map((film, index) => (
            <motion.div
              key={film.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`flex flex-col gap-4 flex-shrink-0 group cursor-pointer ${
                film.aspect === 'portrait' ? 'w-[280px] md:w-[320px]' : 'w-[280px] md:w-[320px]'
              }`}
            >
              <div className={`w-full overflow-hidden relative bg-zinc-900 ${
                film.aspect === 'portrait' ? 'aspect-[9/16]' : 'aspect-[16/9]'
              }`}>
                <img 
                  src={film.image} 
                  alt={film.title} 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105"
                />
              </div>
              
              <div className="flex flex-col gap-1 text-[10px] md:text-xs font-bold tracking-widest uppercase">
                <span className="text-white line-clamp-2 leading-relaxed">{film.title}</span>
                <span className="text-zinc-500">({film.id}) — {film.category}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
