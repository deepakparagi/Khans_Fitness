'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import Image from 'next/image';

export function HeroSection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (headingRef.current) {
      gsap.to(headingRef.current, {
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });
    }
  }, []);

  return (
    <section className="relative w-full h-[100svh] overflow-hidden flex flex-col pt-[72px]">
      
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <img 
          src="/images/hero/homepage_hero.png" 
          alt="Khan's Fitness Gym" 
          className="w-full h-full object-cover opacity-100"
        />
        <div 
          className="absolute inset-0 transition-opacity duration-300 pointer-events-none" 
          style={{ background: 'var(--hero-overlay-bg)' }} 
        />
      </div>

      {/* Main Content Wrapper - Split Composition (40% width) */}
      <div className="relative z-10 px-6 lg:px-12 2xl:px-24 w-full flex-1 flex items-center justify-start">
        <div 
          style={{ 
            background: 'var(--hero-content-bg)', 
            backdropFilter: 'var(--hero-content-blur)',
            WebkitBackdropFilter: 'var(--hero-content-blur)',
          }}
          className="w-full lg:w-[40%] lg:min-w-[480px] flex flex-col items-start transform -translate-y-[20px] gap-6 p-6 md:p-8"
        >
          
          {/* Metadata Strip */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[9px] md:text-[10px] tracking-widest text-[var(--text-secondary)] uppercase select-none">
            <div className="flex items-center gap-1.5 text-[var(--acid)] font-semibold border-r border-[var(--border)] pr-3">
              <span className="w-1.5 h-1.5 bg-[var(--acid)] rounded-full animate-pulse" />
              ONLINE
            </div>
            <span className="border-r border-[var(--border)] pr-3">GADAG-BETAGERI</span>
            <span className="border-r border-[var(--border)] pr-3">4.7★ GOOGLE</span>
            <span>EST. 2015</span>
          </div>

          {/* Main Heading */}
          <div 
            ref={headingRef} 
            style={{
              lineHeight: '0.85',
              letterSpacing: '-0.03em',
              fontWeight: '400',
            }}
            className="flex flex-col font-bebas text-[clamp(54px,14vw,80px)] md:text-[clamp(75px,10vw,130px)] text-left max-w-[500px]"
          >
            <div className="overflow-hidden pt-3 pb-1">
              <motion.div
                initial={{ y: '120px', opacity: 0 }}
                animate={{ y: '0px', opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
                className="text-[var(--text-primary)]"
              >
                SYSTEMIZE
              </motion.div>
            </div>
            <div className="overflow-hidden pt-3 -mt-3 pb-1">
              <motion.div
                initial={{ y: '120px', opacity: 0 }}
                animate={{ y: '0px', opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.22 }}
                className="text-[var(--text-primary)]"
              >
                YOUR
              </motion.div>
            </div>
            <div className="overflow-hidden pt-3 -mt-3 pb-1">
              <motion.div
                initial={{ y: '120px', opacity: 0 }}
                animate={{ y: '0px', opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.34 }}
                className="text-[var(--acid)]"
              >
                GAINS.
              </motion.div>
            </div>
          </div>

          {/* Supporting Copy */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-[500px] w-full text-left"
          >
            <p className="font-inter font-light text-[14px] md:text-[15px] text-[var(--text-primary)] leading-relaxed">
              North Karnataka&apos;s most advanced fitness destination.
            </p>
            <p className="font-mono text-[10px] md:text-[11px] text-[var(--text-muted)] uppercase tracking-wider mt-2">
              Est. 2015 • Unisex • AI Powered
            </p>
          </motion.div>

          {/* CTA Section */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 items-start sm:items-center w-full sm:w-auto"
          >
            <MagneticButton 
              onClick={() => router.push('/contact')}
              className="w-full sm:w-auto bg-[var(--acid)] text-[var(--bg)] font-mono text-[11px] md:text-[12px] uppercase tracking-widest px-8 py-3.5 hover:bg-[var(--text-primary)] transition-colors duration-300 shadow-md"
            >
              INITIALIZE MEMBERSHIP
            </MagneticButton>
            <button 
              onClick={() => router.push('/plans')}
              className="font-mono text-[11px] md:text-[12px] text-[var(--text-primary)] hover:text-[var(--acid)] uppercase tracking-widest flex items-center gap-1.5 transition-colors group cursor-pointer self-start sm:self-auto"
            >
              EXPLORE PLANS <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </motion.div>

          {/* Statistics Placement */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="grid grid-cols-2 sm:flex sm:flex-row sm:flex-wrap gap-8 sm:gap-10 mt-6 w-full max-w-[500px]"
          >
            <div onClick={() => router.push('/contact')} className="flex flex-col cursor-pointer hover:opacity-70 transition-opacity">
              <span className="font-bebas text-[32px] md:text-[38px] text-[var(--acid)] leading-none">500+</span>
              <span className="font-mono text-[9px] text-[var(--text-muted)] uppercase tracking-widest mt-1">MEMBERS</span>
            </div>
            <div className="flex flex-col cursor-pointer hover:opacity-70 transition-opacity">
              <span className="font-bebas text-[32px] md:text-[38px] text-[var(--acid)] leading-none">4.7★</span>
              <span className="font-mono text-[9px] text-[var(--text-muted)] uppercase tracking-widest mt-1">RATING</span>
            </div>
            <div className="flex flex-col cursor-pointer hover:opacity-70 transition-opacity">
              <span className="font-bebas text-[32px] md:text-[38px] text-[var(--acid)] leading-none">6+</span>
              <span className="font-mono text-[9px] text-[var(--text-muted)] uppercase tracking-widest mt-1">TRAINERS</span>
            </div>
            <div className="flex flex-col cursor-pointer hover:opacity-70 transition-opacity">
              <span className="font-bebas text-[32px] md:text-[38px] text-[var(--acid)] leading-none">10+</span>
              <span className="font-mono text-[9px] text-[var(--text-muted)] uppercase tracking-widest mt-1">YEARS</span>
            </div>
          </motion.div>
          
        </div>
      </div>

      {/* Marquee Strip */}
      <div className="marquee-strip absolute bottom-0 left-0 w-full border-t border-[var(--border)] py-3 bg-[var(--bg)] overflow-hidden whitespace-nowrap group z-20">
        <div className="inline-block animate-[marquee_25s_linear_infinite] group-hover:[animation-play-state:paused]">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="font-mono text-[11px] text-[var(--text-muted)] uppercase tracking-widest mx-4">
              STRENGTH TRAINING · WEIGHT LOSS · CARDIO FITNESS · PERSONAL TRAINING · NUTRITION COACHING · BODY TRANSFORMATION · AI-POWERED PLANS · ELITE EQUIPMENT · UNISEX FACILITY · EST. 2015 · GADAG-BETAGERI ·
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
