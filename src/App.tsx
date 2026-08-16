/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import Loader from './components/Loader';
import LandingPage from './components/LandingPage';
import FilmsPage from './components/FilmsPage';
import AboutPage from './components/AboutPage';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<'home' | 'films' | 'about'>('home');

  const navigateTo = (page: 'home' | 'films' | 'about') => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-zinc-800 selection:text-white">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Loader key="loader" onComplete={() => setIsLoading(false)} />
        ) : (
          <AnimatePresence mode="wait">
            {currentPage === 'home' && (
              <LandingPage key="landing" onNavigate={navigateTo} />
            )}
            {currentPage === 'films' && (
              <FilmsPage key="films" onNavigate={navigateTo} />
            )}
            {currentPage === 'about' && (
              <AboutPage key="about" onNavigate={navigateTo} />
            )}
          </AnimatePresence>
        )}
      </AnimatePresence>
    </div>
  );
}
