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
    <section className="relative w-full h-[100svh] overflow-hidden flex flex-col pt-[56px] md:pt-[72px]">
      
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

      {/* Main Content Wrapper */}
      <div className="relative z-10 px-5 lg:px-12 2xl:px-24 w-full flex-1 flex items-end md:items-center justify-start pb-14 md:pb-12">
        <div 
          style={{ 
            background: 'var(--hero-content-bg)', 
            backdropFilter: 'var(--hero-content-blur)',
            WebkitBackdropFilter: 'var(--hero-content-blur)',
          }}
          className="w-full lg:w-[40%] lg:min-w-[480px] flex flex-col items-start gap-4 md:gap-4 p-0 md:p-6"
        >
          
          {/* Metadata Strip */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[9px] md:text-[10px] tracking-widest text-[var(--text-secondary)] uppercase select-none">
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
              lineHeight: '0.88',
              letterSpacing: '-0.03em',
              fontWeight: '400',
            }}
            className="flex flex-col font-bebas text-[clamp(52px,14vw,72px)] md:text-[clamp(64px,8vw,110px)] text-left max-w-[500px]"
          >
            <div className="overflow-hidden pt-2 pb-0.5">
              <motion.div
                initial={{ y: '120px', opacity: 0 }}
                animate={{ y: '0px', opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
                className="text-[var(--text-primary)]"
              >
                SYSTEMIZE
              </motion.div>
            </div>
            <div className="overflow-hidden pt-2 -mt-2 pb-0.5">
              <motion.div
                initial={{ y: '120px', opacity: 0 }}
                animate={{ y: '0px', opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.22 }}
                className="text-[var(--text-primary)]"
              >
                YOUR
              </motion.div>
            </div>
            <div className="overflow-hidden pt-2 -mt-2 pb-0.5">
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
            <p className="font-inter font-light text-[13px] md:text-[15px] text-[var(--text-primary)] leading-relaxed">
              North Karnataka&apos;s most advanced fitness destination.
            </p>
            <p className="font-mono text-[9px] md:text-[11px] text-[var(--text-muted)] uppercase tracking-wider mt-1.5 md:mt-1">
              Est. 2015 • Unisex • AI Powered
            </p>
          </motion.div>

          {/* CTA Section */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-5 items-start sm:items-center w-full sm:w-auto"
          >
            <MagneticButton 
              onClick={() => router.push('/contact')}
              className="w-full sm:w-auto bg-[var(--acid)] text-[var(--bg)] font-mono text-[11px] md:text-[12px] uppercase tracking-widest px-6 md:px-8 py-3.5 hover:bg-[var(--text-primary)] transition-colors duration-300 shadow-md text-center"
            >
              INITIALIZE MEMBERSHIP
            </MagneticButton>
            <button 
              onClick={() => router.push('/plans')}
              className="font-mono text-[11px] md:text-[12px] text-[var(--text-primary)] hover:text-[var(--acid)] uppercase tracking-widest flex items-center gap-1.5 transition-colors group cursor-pointer whitespace-nowrap"
            >
              EXPLORE PLANS <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </motion.div>

          {/* Statistics Placement */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="grid grid-cols-4 gap-4 sm:gap-8 mt-1 md:mt-2 w-full max-w-[500px]"
          >
            <div onClick={() => router.push('/contact')} className="flex flex-col cursor-pointer hover:opacity-70 transition-opacity">
              <span className="font-bebas text-[28px] md:text-[34px] text-[var(--acid)] leading-none">500+</span>
              <span className="font-mono text-[7px] md:text-[9px] text-[var(--text-muted)] uppercase tracking-widest mt-0.5">MEMBERS</span>
            </div>
            <div className="flex flex-col cursor-pointer hover:opacity-70 transition-opacity">
              <span className="font-bebas text-[28px] md:text-[34px] text-[var(--acid)] leading-none">4.7★</span>
              <span className="font-mono text-[7px] md:text-[9px] text-[var(--text-muted)] uppercase tracking-widest mt-0.5">RATING</span>
            </div>
            <div className="flex flex-col cursor-pointer hover:opacity-70 transition-opacity">
              <span className="font-bebas text-[28px] md:text-[34px] text-[var(--acid)] leading-none">6+</span>
              <span className="font-mono text-[7px] md:text-[9px] text-[var(--text-muted)] uppercase tracking-widest mt-0.5">TRAINERS</span>
            </div>
            <div className="flex flex-col cursor-pointer hover:opacity-70 transition-opacity">
              <span className="font-bebas text-[28px] md:text-[34px] text-[var(--acid)] leading-none">10+</span>
              <span className="font-mono text-[7px] md:text-[9px] text-[var(--text-muted)] uppercase tracking-widest mt-0.5">YEARS</span>
            </div>
          </motion.div>
          
        </div>
      </div>

      {/* Marquee Strip */}
      <div className="marquee-strip absolute bottom-0 left-0 w-full border-t border-[var(--border)] py-2 md:py-2.5 bg-[var(--bg)] overflow-hidden whitespace-nowrap group z-20">
        <div className="inline-block animate-[marquee_25s_linear_infinite] group-hover:[animation-play-state:paused]">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="font-mono text-[10px] md:text-[11px] text-[var(--text-muted)] uppercase tracking-widest mx-4">
              STRENGTH TRAINING · WEIGHT LOSS · CARDIO FITNESS · PERSONAL TRAINING · NUTRITION COACHING · BODY TRANSFORMATION · AI-POWERED PLANS · ELITE EQUIPMENT · UNISEX FACILITY · EST. 2015 · GADAG-BETAGERI ·
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
