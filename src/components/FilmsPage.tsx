import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, Play, X, Volume2, VolumeX } from 'lucide-react';
import whiteLogo from '../assets/logo-white.png';

interface Film {
  id: string;
  title: string;
  category: string;
  aspect: 'portrait' | 'video';
  image: string;
  video: string;
  color: string;
}

const FILMS_DATA: Film[] = [
  { 
    id: '01/12', 
    title: 'ABAAD - SEEDHE MAUT, HURRICANE FEAT. ENCORE ABJ & GHAATAK', 
    category: 'MUSIC VIDEO', 
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop', 
    aspect: 'video',
    video: 'https://ak.picdn.net/shutterstock/videos/1026033479/preview/stock-footage-abstract-animation-of-futuristic-surface.mp4',
    color: 'bg-[#fcd34d]/90'
  },
  { 
    id: '02/12', 
    title: 'LAKMÉ FASHION WEEK 2026', 
    category: 'LIVE EVENT', 
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1200&auto=format&fit=crop', 
    aspect: 'portrait',
    video: 'https://ak.picdn.net/shutterstock/videos/1028726588/preview/stock-footage-colorful-smoke.mp4',
    color: 'bg-[#f472b6]/90'
  },
  { 
    id: '03/12', 
    title: 'WIT IT - TY DOLLA $IGN FT. CHLÖE', 
    category: 'MUSIC VIDEO', 
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200&auto=format&fit=crop', 
    aspect: 'video',
    video: 'https://ak.picdn.net/shutterstock/videos/1047395026/preview/stock-footage-neon-light-of-taipei-city.mp4',
    color: 'bg-[#60a5fa]/90'
  },
  { 
    id: '04/12', 
    title: 'RATHER BE - THEKIDLAROI', 
    category: 'EXPERIMENTAL', 
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop', 
    aspect: 'video',
    video: 'https://ak.picdn.net/shutterstock/videos/1029415412/preview/stock-footage-car-driving-on-a-road.mp4',
    color: 'bg-[#34d399]/90'
  },
  { 
    id: '05/12', 
    title: 'CENTRAL CEE, ROLLING LOUD INDIA, MUMBAI', 
    category: 'EXPERIMENTAL', 
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1200&auto=format&fit=crop', 
    aspect: 'video',
    video: 'https://ak.picdn.net/shutterstock/videos/1031448833/preview/stock-footage-business-people-walking-on-street-in-city.mp4',
    color: 'bg-[#a78bfa]/90'
  },
  { 
    id: '06/12', 
    title: 'CHROME HEARTS - AUTUMN WINTER MANIFESTO', 
    category: 'COMMERCIAL', 
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop', 
    aspect: 'portrait',
    video: 'https://ak.picdn.net/shutterstock/videos/1053155708/preview/stock-footage-stylish-neon-light-commercial.mp4',
    color: 'bg-[#fb923c]/90'
  },
  { 
    id: '07/12', 
    title: 'THE LAST REVELRY - LIVE INTIMATE CONCERT', 
    category: 'LIVE EVENT', 
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=1200&auto=format&fit=crop', 
    aspect: 'video',
    video: 'https://ak.picdn.net/shutterstock/videos/1049964505/preview/stock-footage-ocean-waves.mp4',
    color: 'bg-[#38bdf8]/90'
  },
  { 
    id: '08/12', 
    title: 'SHADOWS OF THE MIND - METROPOLIS ESSAY', 
    category: 'SHORT FILM', 
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1200&auto=format&fit=crop', 
    aspect: 'video',
    video: 'https://ak.picdn.net/shutterstock/videos/1026033479/preview/stock-footage-abstract-animation-of-futuristic-surface.mp4',
    color: 'bg-[#fb7185]/90'
  },
  { 
    id: '09/12', 
    title: 'LIQUID DREAMS - AMBIENT FLUID DYNAMICS', 
    category: 'EXPERIMENTAL', 
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1200&auto=format&fit=crop', 
    aspect: 'portrait',
    video: 'https://ak.picdn.net/shutterstock/videos/1028726588/preview/stock-footage-colorful-smoke.mp4',
    color: 'bg-[#818cf8]/90'
  },
  { 
    id: '10/12', 
    title: 'ETERNAL RETURN - EPISODE I', 
    category: 'SHORT FILM', 
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1200&auto=format&fit=crop', 
    aspect: 'video',
    video: 'https://ak.picdn.net/shutterstock/videos/1029415412/preview/stock-footage-car-driving-on-a-road.mp4',
    color: 'bg-[#2dd4bf]/90'
  },
  { 
    id: '11/12', 
    title: 'ADIDAS ORIGINALS: STREETBEAT', 
    category: 'COMMERCIAL', 
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=1200&auto=format&fit=crop', 
    aspect: 'video',
    video: 'https://ak.picdn.net/shutterstock/videos/1047395026/preview/stock-footage-neon-light-of-taipei-city.mp4',
    color: 'bg-[#a3e635]/90'
  },
  { 
    id: '12/12', 
    title: 'BOILER ROOM BENGALURU: MAIN STAGE 2026', 
    category: 'LIVE EVENT', 
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200&auto=format&fit=crop', 
    aspect: 'portrait',
    video: 'https://ak.picdn.net/shutterstock/videos/1053155708/preview/stock-footage-stylish-neon-light-commercial.mp4',
    color: 'bg-[#fbbf24]/90'
  }
];

const CATEGORIES = [
  { name: 'ALL FILMS', count: 32 },
  { name: 'MUSIC VIDEO', count: 14, filterName: 'MUSIC VIDEO' },
  { name: 'LIVE EVENT', count: 7, filterName: 'LIVE EVENT' },
  { name: 'COMMERCIAL', count: 1, filterName: 'COMMERCIAL' },
  { name: 'SHORT FILM', count: 2, filterName: 'SHORT FILM' },
  { name: 'EXPERIMENTAL', count: 8, filterName: 'EXPERIMENTAL' }
];

interface FilmsPageProps {
  onNavigate: (page: 'home' | 'films') => void;
}

export default function FilmsPage({ onNavigate }: FilmsPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('ALL FILMS');
  const [activeFilm, setActiveFilm] = useState<Film | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredFilmId, setHoveredFilmId] = useState<string | null>(null);

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.documentElement).scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    document.documentElement.style.scrollBehavior = originalStyle;
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter films based on selection
  const filteredFilms = selectedCategory === 'ALL FILMS'
    ? FILMS_DATA
    : FILMS_DATA.filter(film => film.category === selectedCategory);

  const hoveredFilm = hoveredFilmId ? FILMS_DATA.find(f => f.id === hoveredFilmId) : null;
  const isAnyHovered = hoveredFilmId !== null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="w-full min-h-screen bg-black text-white font-sans overflow-x-hidden flex flex-col relative select-none"
    >
      
      {/* Background Subtle Ambient Glow */}
      <div className={`absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-700 ${hoveredFilm ? 'opacity-0' : 'opacity-100'}`}>
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-zinc-900/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-zinc-800/5 blur-[150px]" />
      </div>

      {/* Global Background Video on Hover */}
      <AnimatePresence>
        {hoveredFilm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-0 pointer-events-none"
          >
            <video
              src={hoveredFilm.video}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-8 left-1/2 -translate-x-1/2 z-50 flex"
      >
        {/* Mobile Menu */}
        <button className="md:hidden flex items-center justify-center w-10 h-10 rounded-md text-white transition-all duration-300 bg-black/50 backdrop-blur-md shadow-2xl hover:bg-white/10">
          <Menu size={20} strokeWidth={1.5} />
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4 relative z-10">
          {/* Main Navigation */}
          <nav className="flex items-center gap-6 px-6 h-10 text-xs font-bold tracking-wider text-zinc-400 transition-all duration-300 rounded-md bg-black/50 backdrop-blur-md shadow-2xl">
            <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors cursor-pointer">HOME</button>
            <button onClick={() => onNavigate('films')} className="hover:text-white transition-colors cursor-pointer text-white">FILMS</button>
            <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors cursor-pointer">ABOUT</button>
            <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors cursor-pointer">CONTACT</button>
          </nav>

          {/* Shop Button */}
          <motion.a 
            href="#" 
            className="flex items-center justify-center w-10 h-10 rounded-md transition-all duration-300 bg-black/50 backdrop-blur-md shadow-2xl"
            whileHover={{ rotateY: 360 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
             <img src={whiteLogo} alt="Logo" className="w-6 h-6 object-contain" />
          </motion.a>
        </div>
      </motion.div>

      {/* Main Content Layout */}
      <div className="w-full flex-1 flex flex-col justify-between pt-32 pb-8 z-10" style={{ paddingLeft: '86.406px', paddingRight: '86.406px' }}>
        
        {/* Top Titles Section */}
        <div className={`flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-0 mt-4 md:mt-8 w-full border-b border-white/10 pb-8 px-0 transition-opacity duration-500 ${hoveredFilmId ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          
          {/* Left: Interactive Categories with Counts */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6"
          >
            <h3 className="text-sm font-black uppercase tracking-[0.15em] text-white/90">
              ALL FILMS ({FILMS_DATA.length})
            </h3>
            
            <div className="flex flex-wrap lg:grid lg:grid-cols-2 gap-x-8 gap-y-3 text-[11px] md:text-xs font-bold tracking-widest uppercase">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === (cat.filterName || 'ALL FILMS');
                return (
                  <button
                    key={cat.name}
                    onClick={() => setSelectedCategory(cat.filterName || 'ALL FILMS')}
                    className={`text-left transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                      isActive 
                        ? 'text-white translate-x-1 font-extrabold' 
                        : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full bg-white transition-transform ${isActive ? 'scale-100' : 'scale-0'}`} />
                    <span>
                      {cat.name}s ({cat.count})
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
          
          {/* Right: Giant Typographic Display Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="self-end lg:self-auto text-right"
          >
            <h2 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-bold uppercase tracking-[0.2em] text-white leading-none scale-y-[1.4] scale-x-[1.05] sm:scale-x-[1.1] origin-bottom sm:origin-right">
              ALL FILMS
            </h2>
          </motion.div>
        </div>

        {/* Beautiful Center-Aligned Grid Reels Container */}
        <div className="relative w-full flex-1 my-8 md:my-12 px-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 sm:gap-x-12 lg:gap-x-16 gap-y-16 lg:gap-y-20 items-stretch w-full">
            <AnimatePresence mode="popLayout">
              {filteredFilms.map((film, index) => {
                const isPortrait = film.aspect === 'portrait';
                const isHovered = hoveredFilmId === film.id;
                
                return (
                  <motion.div
                    key={film.id}
                    layout
                    initial={{ opacity: 0, y: 30, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -30, scale: 0.98 }}
                    transition={{ duration: 0.5, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
                    onMouseEnter={() => setHoveredFilmId(film.id)}
                    onMouseLeave={() => setHoveredFilmId(null)}
                    className={`flex flex-col gap-4 w-full h-full select-none transition-opacity duration-500 ${isAnyHovered && !isHovered ? 'pointer-events-none' : ''} ${isHovered ? 'z-40' : 'z-10'}`}
                  >
                    {/* Image Wrapper Container (flex-1 to push text to bottom and center image) */}
                    <div className="flex-1 flex flex-col items-center justify-center w-full">
                      <div 
                        onClick={() => setActiveFilm(film)}
                        className={`relative w-full overflow-hidden bg-zinc-950 rounded-none transition-all duration-500 cursor-pointer ${
                          isPortrait ? 'aspect-[9/16]' : 'aspect-square'
                        } ${isAnyHovered && !isHovered ? 'opacity-0' : 'opacity-100'}`}
                      >
                        {/* Image Asset */}
                        <img 
                          src={film.image} 
                          alt={film.title} 
                          referrerPolicy="no-referrer"
                          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 pointer-events-none z-10 ${isHovered ? 'scale-110' : 'scale-100'}`}
                        />
                        
                        {/* Overlay VIEW FILM Text with Image-Based Pastel Background */}
                        <div className={`absolute inset-0 ${film.color} flex items-center justify-center transition-opacity duration-500 z-20 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                          <span className="text-black font-bold tracking-[0.2em] text-sm lg:text-base whitespace-nowrap">VIEW FILM</span>
                        </div>

                        {/* Overlay Category Tag */}
                        <div className={`absolute top-4 left-4 bg-black/80 backdrop-blur-sm border border-white/10 px-2 py-0.5 rounded-sm text-[8px] font-bold tracking-widest text-zinc-300 uppercase transition-opacity duration-500 z-20 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
                          {film.category}
                        </div>
                      </div>
                    </div>

                    {/* Meta/Description Below - Aligned on exactly a single line baseline */}
                    <div className={`flex flex-col gap-1 text-left px-1 transition-all duration-500 ${isAnyHovered && !isHovered ? 'opacity-40 grayscale' : 'opacity-100'}`}>
                      <span 
                        className="text-white text-[11px] md:text-xs font-black tracking-widest leading-relaxed uppercase truncate" 
                        title={film.title}
                      >
                        {film.title}
                      </span>
                      <span className="text-zinc-500 text-[9px] md:text-[10px] font-bold tracking-widest uppercase">
                        ({film.id}) — {film.category}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Cinematic Gallery Section */}
        <div className={`mt-24 mb-12 w-full transition-opacity duration-500 ${hoveredFilmId ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <div className="flex flex-col gap-8 w-full">
            <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-[0.2em] text-white border-b border-white/10 pb-6 text-center lg:text-left">
              GALLERY
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?auto=format&fit=crop&q=80&w=800',
                'https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?auto=format&fit=crop&q=80&w=800',
                'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=800',
                'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&q=80&w=800',
                'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&q=80&w=800',
                'https://images.unsplash.com/photo-1580130601254-05fa23cebee5?auto=format&fit=crop&q=80&w=800'
              ].map((img, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="aspect-[4/3] relative group overflow-hidden bg-zinc-900 rounded-sm cursor-pointer"
                >
                  <img 
                    src={img} 
                    alt={`Gallery ${idx + 1}`}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                    <span className="text-white font-bold tracking-widest text-[10px] md:text-xs uppercase">BEHIND THE SCENES 0{idx + 1}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Minimal Bottom Indicators */}
        <div className={`w-full flex justify-between items-center border-t border-white/10 pt-6 mt-auto transition-opacity duration-500 ${hoveredFilmId ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <p className="text-[10px] tracking-widest text-zinc-600 uppercase font-mono">
            MANGO MEDIA © {new Date().getFullYear()}
          </p>
          <div className="flex gap-2">
            <span className="w-2 h-2 rounded-full bg-white" />
            <span className="w-2 h-2 rounded-full bg-zinc-800" />
            <span className="w-2 h-2 rounded-full bg-zinc-800" />
          </div>
        </div>
      </div>

      {/* Cinematic Full-Screen Video Modal Player */}
      <AnimatePresence>
        {activeFilm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 md:p-8"
          >
            {/* Top Bar inside Player */}
            <div className="absolute top-6 left-0 right-0 px-8 flex justify-between items-center w-full z-10">
              <div className="flex flex-col text-left">
                <span className="text-xs text-zinc-500 font-bold tracking-widest uppercase">NOW STREAMING TRAILER</span>
                <span className="text-sm md:text-base text-white font-extrabold tracking-widest uppercase">{activeFilm.title}</span>
              </div>

              <div className="flex items-center gap-4">
                {/* Mute toggle button */}
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="w-10 h-10 rounded-full border border-white/10 bg-zinc-900/80 hover:bg-zinc-800 flex items-center justify-center text-white transition-colors cursor-pointer"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>

                {/* Close modal button */}
                <button
                  onClick={() => setActiveFilm(null)}
                  className="w-10 h-10 rounded-full border border-white/10 bg-zinc-900/80 hover:bg-zinc-800 flex items-center justify-center text-white transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Video Canvas Container */}
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className={`relative max-w-5xl w-full border border-white/10 bg-black shadow-2xl rounded-sm overflow-hidden ${
                activeFilm.aspect === 'portrait' ? 'aspect-[9/16] max-h-[75vh] w-auto' : 'aspect-[16/9]'
              }`}
            >
              <video
                src={activeFilm.video}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Subtitles / Close overlay prompt */}
            <p className="mt-6 text-xs tracking-widest text-zinc-500 uppercase font-mono">
              Press <span className="text-white px-1.5 py-0.5 bg-zinc-900 rounded border border-white/10">ESC</span> or click Close to return
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
