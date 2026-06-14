'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

const Hero3D = dynamic(() => import('./Hero3D'), { ssr: false });

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
    <section className="relative w-full h-[100svh] overflow-hidden flex flex-col pt-[64px]">
      
      {/* 3D Background */}
      <div className="absolute inset-0 w-full h-full z-0 opacity-60 pointer-events-none">
        <Hero3D />
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-6 lg:px-12 2xl:px-24 pt-8 lg:pt-[32px] pb-[90px] w-full max-w-[1000px] flex flex-col justify-center flex-1 items-start mt-4 lg:mt-0">
        
        {/* Top Indicators (Moved inline to prevent overlap) */}
        <div className="relative z-20 flex flex-col lg:flex-row lg:items-center justify-between w-full mb-8 lg:mb-10 gap-2 lg:gap-0">
          <div className="flex flex-wrap items-center gap-2 font-mono text-[9px] md:text-[10px] lg:text-[11px] tracking-widest text-[var(--text-primary)] uppercase">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--acid)] animate-pulse shrink-0" />
            <span>[SYS: ONLINE] [LOC: GADAG-BETAGERI, KARNATAKA] [RTG: 4.7/5] [EST: 2015]</span>
          </div>
          <div className="font-mono text-[9px] md:text-[10px] lg:text-[11px] tracking-widest text-[var(--text-muted)] uppercase">
            15.4325° N, 75.6358° E
          </div>
        </div>

        {/* Main Heading */}
        <div ref={headingRef} className="flex flex-col font-bebas text-[clamp(50px,14vw,90px)] md:text-[clamp(60px,9vw,110px)] xl:text-[120px] leading-[0.85] tracking-[-0.02em] text-left">
          <div className="overflow-hidden pt-4 -mt-4 pb-2">
            <motion.div
              initial={{ y: '120px', opacity: 0 }}
              animate={{ y: '0px', opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
              className="text-[var(--text-primary)]"
            >
              SYSTEMIZE
            </motion.div>
          </div>
          <div className="overflow-hidden pt-4 -mt-4 pb-2">
            <motion.div
              initial={{ y: '120px', opacity: 0 }}
              animate={{ y: '0px', opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.22 }}
              className="text-[var(--text-primary)]"
            >
              YOUR
            </motion.div>
          </div>
          <div className="overflow-hidden pt-4 -mt-4 pb-2">
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

        {/* Descriptor */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-inter font-light text-[13px] md:text-[14px] lg:text-[15px] text-[var(--text-secondary)] mt-4 max-w-[520px] text-left"
        >
          North Karnataka&apos;s most advanced fitness destination. Est. 2015 · Unisex · AI-Powered. Results guaranteed.
        </motion.p>

        {/* CTAs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col md:flex-row flex-wrap items-start md:items-center gap-3 lg:gap-4 mt-4 lg:mt-5 w-full md:w-auto"
        >
          <MagneticButton 
            onClick={() => router.push('/contact')}
            className="w-full md:w-auto bg-[var(--acid)] text-[var(--bg)] font-mono text-[11px] md:text-[12px] uppercase tracking-widest px-6 py-4 hover:bg-[var(--text-primary)] transition-colors"
          >
            INITIALIZE MEMBERSHIP →
          </MagneticButton>
          <MagneticButton 
            onClick={() => router.push('/contact')}
            className="w-full md:w-auto border border-[var(--text-muted)] bg-transparent text-[var(--text-primary)] font-mono text-[11px] md:text-[12px] uppercase tracking-widest px-6 py-4 hover:border-[var(--acid)] transition-colors"
          >
            EXECUTE TRIAL ▶
          </MagneticButton>
        </motion.div>

        {/* Stats Row */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="grid grid-cols-2 md:flex flex-wrap items-center gap-x-4 gap-y-6 sm:gap-8 mt-6 lg:mt-6 w-full max-w-[600px]"
        >
          <div onClick={() => router.push('/contact')} className="flex flex-col gap-1 flex-1 cursor-pointer hover:opacity-70 transition-opacity">
            <span className="font-bebas text-[clamp(32px,8vw,48px)] md:text-[clamp(24px,3vw,36px)] text-[var(--acid)] leading-none">500+</span>
            <span className="font-mono text-[9px] md:text-[10px] text-[var(--text-muted)] uppercase">[ACTIVE MEMBERS]</span>
          </div>
          <div className="hidden sm:block w-[1px] h-6 md:h-8 bg-[var(--border)]" />
          <div onClick={() => router.push('/contact')} className="flex flex-col gap-1 flex-1 cursor-pointer hover:opacity-70 transition-opacity">
            <span className="font-bebas text-[clamp(32px,8vw,48px)] md:text-[clamp(24px,3vw,36px)] text-[var(--acid)] leading-none">4.7★</span>
            <span className="font-mono text-[9px] md:text-[10px] text-[var(--text-muted)] uppercase">[GOOGLE RATING]</span>
          </div>
          <div className="hidden md:block w-[1px] h-6 md:h-8 bg-[var(--border)]" />
          <div onClick={() => router.push('/contact')} className="flex flex-col gap-1 flex-1 cursor-pointer hover:opacity-70 transition-opacity">
            <span className="font-bebas text-[clamp(32px,8vw,48px)] md:text-[clamp(24px,3vw,36px)] text-[var(--acid)] leading-none">6+</span>
            <span className="font-mono text-[9px] md:text-[10px] text-[var(--text-muted)] uppercase">[EXPERT TRAINERS]</span>
          </div>
          <div className="hidden lg:block w-[1px] h-6 md:h-8 bg-[var(--border)]" />
          <div onClick={() => router.push('/contact')} className="flex flex-col gap-1 flex-1 cursor-pointer hover:opacity-70 transition-opacity">
            <span className="font-bebas text-[clamp(32px,8vw,48px)] md:text-[clamp(24px,3vw,36px)] text-[var(--acid)] leading-none">10+</span>
            <span className="font-mono text-[9px] md:text-[10px] text-[var(--text-muted)] uppercase">[YEARS OF EXCELLENCE]</span>
          </div>
        </motion.div>
      </div>

      {/* Marquee Strip */}
      <div className="absolute bottom-0 left-0 w-full border-t border-[var(--border)] py-3 bg-[var(--bg)] overflow-hidden whitespace-nowrap group z-20">
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
