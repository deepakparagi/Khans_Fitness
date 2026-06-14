'use client';

import { TextReveal } from '@/components/ui/TextReveal';
import { MagneticButton } from '@/components/ui/MagneticButton';
import Image from 'next/image';

export function CTASection() {
  return (
    <section className="relative w-full py-[100px] flex items-center justify-center overflow-hidden border-b border-[var(--border)]">
      
      {/* Background Image */}
      <Image 
        src="https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=1920&q=80"
        alt="Training Background"
        fill
        className="object-cover z-[-2]"
        quality={90}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-[var(--overlay)] dark:bg-[var(--bg)]/88 bg-[#F5F5F0]/85 z-[-1] transition-colors duration-300" />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto">
        
        <div className="font-mono text-[11px] text-[var(--acid)] uppercase tracking-widest mb-8 border border-[var(--acid)] px-3 py-1">
          [LIMITED TIME OFFER]
        </div>

        <TextReveal stagger={0.15} className="items-center">
          <h2 className="font-bebas text-[clamp(42px,10vw,150px)] leading-[0.85] tracking-[-0.02em] uppercase flex flex-col items-center">
            <span className="text-[var(--text-primary)]">YOUR TRANSFORMATION</span>
            <span className="text-[var(--acid)]">STARTS TODAY</span>
          </h2>
        </TextReveal>

        <p className="font-inter font-normal text-[16px] text-[var(--text-secondary)] mt-8 mb-12 max-w-lg">
          Stop guessing. Start executing. Our AI-powered human optimization facility is ready for your input. Secure your trial access now.
        </p>

        <MagneticButton className="bg-[var(--acid)] text-[var(--bg)] font-mono text-[14px] font-bold uppercase tracking-widest px-[64px] py-[20px] hover:bg-[var(--text-primary)] transition-colors duration-300">
          BOOK FREE TRIAL →
        </MagneticButton>

      </div>
    </section>
  );
}
