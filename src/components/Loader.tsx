import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import img1 from '../assets/front-loading/1.jpg';
import img2 from '../assets/front-loading/2.jpg';
import img3 from '../assets/front-loading/3.jpg';
import img4 from '../assets/front-loading/4.jpg';
import img7 from '../assets/front-loading/7.jpg';

const IMAGES = [
  img1,
  img2,
  img3,
  img4,
  img7,
  img1,
  img2,
  img3,
  img4,
  img7,
];

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Preload images to ensure smooth animation
    IMAGES.forEach(src => {
      const img = new Image();
      img.src = src;
    });

    // Cinematic interval for natural pacing
    const interval = setInterval(() => {
      setCurrentIndex(prev => {
        if (prev >= IMAGES.length - 1) {
          return 0; // Loop until unmounted
        }
        return prev + 1;
      });
    }, 850); // Slow, natural pacing

    // Trigger completion after 6.5 seconds
    const timeout = setTimeout(() => {
      onComplete();
    }, 6500);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 z-50 flex items-center justify-between px-8 md:px-24 bg-black"
    >
      <div className="flex flex-col text-[10px] md:text-xs uppercase tracking-widest leading-loose font-medium text-white/90">
        <span>A Photographic Tale</span>
        <span>Indian Streets</span>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 md:w-80 aspect-[3/4] md:aspect-[4/5] overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.img
            key={currentIndex}
            src={IMAGES[currentIndex]}
            alt=""
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full object-cover object-center grayscale contrast-125 brightness-90"
          />
        </AnimatePresence>
      </div>

      <div className="flex flex-col text-[10px] md:text-xs uppercase tracking-widest leading-loose text-right font-medium text-white/90">
        <span>On the streets of India</span>
        <span>By Odd Mango Media</span>
      </div>
    </motion.div>
  );
}
