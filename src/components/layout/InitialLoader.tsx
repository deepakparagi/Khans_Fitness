'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function InitialLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Check if it's already been shown this session
    const hasLoaded = sessionStorage.getItem('khan-loader-played');
    
    if (hasLoaded) {
      setIsLoading(false);
      return;
    }

    // Otherwise, play the loader and mark as loaded
    const timer = setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem('khan-loader-played', 'true');
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div 
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#080808] text-[var(--acid)]"
          initial={{ y: 0 }}
          exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
        >
          <div className="flex flex-col items-center gap-8 w-full max-w-[400px] px-8">
            <div className="font-mono text-[10px] tracking-[0.3em] uppercase w-full flex justify-between">
              <span>SYSTEM</span>
              <span className="animate-pulse">BOOTING...</span>
            </div>
            
            <div className="font-bebas text-[clamp(50px,10vw,80px)] leading-[0.85] text-center tracking-[-0.02em] w-full text-white">
              <motion.div
                initial={{ clipPath: 'inset(0 100% 0 0)' }}
                animate={{ clipPath: 'inset(0 0% 0 0)' }}
                transition={{ duration: 1.5, ease: "circInOut", delay: 0.2 }}
                className="whitespace-nowrap"
              >
                KHAN&apos;S <span className="text-[var(--acid)]">FITNESS</span>
              </motion.div>
            </div>

            <div className="w-full h-[2px] bg-[#222] relative overflow-hidden">
              <motion.div 
                className="absolute inset-y-0 left-0 bg-[var(--acid)]"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </div>
            
            <div className="font-mono text-[10px] tracking-[0.3em] uppercase w-full flex justify-between text-[var(--text-muted)]">
              <span>EST. 2015</span>
              <span>v2.0.0</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
