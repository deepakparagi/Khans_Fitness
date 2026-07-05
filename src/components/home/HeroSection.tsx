'use client';

import { MagneticButton } from '@/components/ui/MagneticButton';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

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
    <section className="relative w-full h-[100svh] overflow-hidden flex flex-col">
      
      {/* CSS Keyframe Animations */}
      <style>{`
        @keyframes heroSlideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes heroFadeUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes heroFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .hero-slide-1 { animation: heroSlideUp 0.8s cubic-bezier(0.76, 0, 0.24, 1) 0.15s both; }
        .hero-slide-2 { animation: heroSlideUp 0.8s cubic-bezier(0.76, 0, 0.24, 1) 0.25s both; }
        .hero-slide-3 { animation: heroSlideUp 0.8s cubic-bezier(0.76, 0, 0.24, 1) 0.35s both; }
        .hero-fade-1 { animation: heroFadeUp 0.7s ease 0.55s both; }
        .hero-fade-2 { animation: heroFadeUp 0.7s ease 0.7s both; }
        .hero-fade-3 { animation: heroFadeIn 0.8s ease 0.9s both; }
        .hero-meta  { animation: heroFadeUp 0.6s ease 0.05s both; }
      `}</style>

      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <img 
          src="/images/hero/homepage_hero.png" 
          alt="Khan's Fitness Gym" 
          className="w-full h-full object-cover"
        />
        {/* Desktop: left-weighted gradient | Mobile: full strong overlay for text readability */}
        <div 
          className="absolute inset-0 pointer-events-none hidden md:block"
          style={{
            background: 'linear-gradient(90deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.15) 100%)',
          }}
        />
        <div 
          className="absolute inset-0 pointer-events-none md:hidden"
          style={{
            background: 'linear-gradient(180deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.8) 100%)',
          }}
        />
      </div>

      {/* ==================== MAIN CONTENT ==================== */}
      {/* Mobile: flex-col with justify-center to vertically center content */}
      {/* Desktop: items-center for vertical centering, left-aligned */}
      <div
        className={[
          'relative z-10 w-full flex-1 flex',
          // Mobile: center vertically, 24px horizontal padding
          'flex-col justify-center px-6',
          // Desktop: revert to horizontal layout, left-aligned
          'md:flex-row md:items-center md:justify-start md:px-8 lg:px-14 2xl:px-24',
          // Top padding accounts for fixed navbar (72px) + breathing room
          'pt-[92px] md:pt-[72px]',
          // Bottom padding for marquee strip clearance
          'pb-[56px] md:pb-[60px]',
        ].join(' ')}
      >
        <div className="w-full max-w-[520px] flex flex-col">

          {/* --- Metadata Strip --- */}
          {/* 0px top margin (flush start of content block) */}
          <div className="hero-meta flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[7px] md:text-[8px] tracking-widest text-[rgba(255,255,255,0.6)] uppercase select-none">
            <div className="flex items-center gap-1.5 text-[var(--acid)] font-semibold border-r border-white/15 pr-3">
              <span className="w-1.5 h-1.5 bg-[var(--acid)] rounded-full animate-pulse" />
              ONLINE
            </div>
            <span className="border-r border-white/15 pr-3">GADAG-BETAGERI</span>
            <span className="border-r border-white/15 pr-3">4.7&#9733; GOOGLE</span>
            <span>EST. 2015</span>
          </div>

          {/* --- Main Heading --- */}
          {/* 20px below metadata (mt-5) */}
          <div 
            ref={headingRef} 
            className="mt-7 md:mt-6 flex flex-col font-bebas text-[clamp(47px,12vw,86px)] md:text-[clamp(62px,7vw,105px)] text-left max-w-[70%] md:max-w-none"
            style={{ lineHeight: '0.92', letterSpacing: '-0.02em', fontWeight: '400' }}
          >
            <div className="overflow-hidden">
              <div className="hero-slide-1 text-white">SYSTEMIZE</div>
            </div>
            <div className="overflow-hidden">
              <div className="hero-slide-2 text-white">YOUR</div>
            </div>
            <div className="overflow-hidden">
              <div className="hero-slide-3 text-[var(--acid)]">GAINS.</div>
            </div>
          </div>

          {/* --- Supporting Copy --- */}
          {/* 20px below heading (mt-5) */}
          <div className="hero-fade-1 mt-7 md:mt-6 flex flex-col gap-2">
            <p className="font-inter font-light text-[12px] md:text-[14px] text-white/85 leading-relaxed max-w-[85%] md:max-w-none">
              North Karnataka&apos;s most advanced fitness destination.
            </p>
            {/* 16px below description (gap-2 + internal) */}
            <p className="font-mono text-[7px] md:text-[9px] text-white/40 uppercase tracking-wider">
              Est. 2015 &bull; Unisex &bull; AI Powered
            </p>
          </div>

          {/* --- CTA Buttons --- */}
          {/* 20px below supporting copy (mt-5) */}
          <div className="hero-fade-2 mt-7 md:mt-6 flex flex-col sm:flex-row gap-4 sm:gap-5 items-stretch sm:items-center">
            <MagneticButton 
              onClick={() => router.push('/contact')}
              className="w-full sm:w-auto bg-[var(--acid)] text-white font-mono text-[9px] md:text-[10px] uppercase tracking-widest px-7 md:px-8 py-[18px] md:py-3.5 hover:bg-white hover:text-black transition-colors duration-300 shadow-lg text-center"
            >
              INITIALIZE MEMBERSHIP
            </MagneticButton>
            <button 
              onClick={() => router.push('/plans')}
              className="font-mono text-[9px] md:text-[10px] text-white/80 hover:text-[var(--acid)] uppercase tracking-widest flex items-center gap-1.5 transition-colors group cursor-pointer whitespace-nowrap"
            >
              EXPLORE PLANS <span className="group-hover:translate-x-1 transition-transform">&#8594;</span>
            </button>
          </div>

          {/* --- Statistics --- */}
          {/* 40px below CTAs (mt-10) - large section gap */}
          <div className="hero-fade-3 mt-12 md:mt-8 pt-6 md:pt-4 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-6 sm:gap-6 w-full">
            <div onClick={() => router.push('/contact')} className="flex flex-col cursor-pointer hover:opacity-70 transition-opacity">
              <span className="font-bebas text-[23px] md:text-[27px] text-[var(--acid)] leading-none">500+</span>
              <span className="font-mono text-[6px] md:text-[7px] text-white/40 uppercase tracking-widest mt-1.5">MEMBERS</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bebas text-[23px] md:text-[27px] text-[var(--acid)] leading-none">4.7&#9733;</span>
              <span className="font-mono text-[6px] md:text-[7px] text-white/40 uppercase tracking-widest mt-1.5">RATING</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bebas text-[23px] md:text-[27px] text-[var(--acid)] leading-none">6+</span>
              <span className="font-mono text-[6px] md:text-[7px] text-white/40 uppercase tracking-widest mt-1.5">TRAINERS</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bebas text-[23px] md:text-[27px] text-[var(--acid)] leading-none">10+</span>
              <span className="font-mono text-[6px] md:text-[7px] text-white/40 uppercase tracking-widest mt-1.5">YEARS</span>
            </div>
          </div>

        </div>
      </div>

      {/* Marquee Strip */}
      <div className="absolute bottom-0 left-0 w-full border-t border-white/10 py-2 md:py-2.5 bg-[var(--bg)] overflow-hidden whitespace-nowrap group z-20">
        <div className="inline-block animate-[marquee_25s_linear_infinite] group-hover:[animation-play-state:paused]">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="font-mono text-[10px] md:text-[11px] text-[var(--text-muted)] uppercase tracking-widest mx-4">
              STRENGTH TRAINING &middot; WEIGHT LOSS &middot; CARDIO FITNESS &middot; PERSONAL TRAINING &middot; NUTRITION COACHING &middot; BODY TRANSFORMATION &middot; AI-POWERED PLANS &middot; ELITE EQUIPMENT &middot; UNISEX FACILITY &middot; EST. 2015 &middot; GADAG-BETAGERI &middot;
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
