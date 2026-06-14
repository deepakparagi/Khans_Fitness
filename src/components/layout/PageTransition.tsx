'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { Dumbbell } from 'lucide-react';

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();


  return (
    <>
      {/* The actual page content */}
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="h-full w-full"
      >
        {children}
      </motion.div>

      {/* The Transition Panel overlay */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`overlay-${pathname}`}
          initial={{ top: '100%' }}
          animate={{ top: '-100%' }}
          transition={{ 
            duration: 1.5, 
            ease: [0.76, 0, 0.24, 1] // brutalist ease
          }}
          className="fixed left-0 w-full h-[100vh] z-[200] bg-[var(--bg)] flex items-center justify-center pointer-events-none"
        >
          <div className="flex flex-col items-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="text-[var(--acid)] mb-6"
            >
              <Dumbbell className="w-12 h-12" />
            </motion.div>
            <div className="font-mono text-[var(--acid)] text-sm tracking-[0.3em] uppercase">
              [SYS: LIFTING_PROTOCOL]
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
