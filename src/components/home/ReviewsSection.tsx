'use client';

import { TextReveal } from '@/components/ui/TextReveal';
import { Star } from 'lucide-react';
import { REVIEWS } from '@/lib/constants'; // Assuming we have some reviews in constants

export function ReviewsSection() {
  return (
    <section className="bg-[var(--bg)] py-24 lg:py-32 overflow-hidden border-b border-[var(--border)]">
      <div className="px-6 lg:px-12 2xl:px-24 w-full mx-auto mb-20">
        <TextReveal stagger={0.1}>
          <h2 className="font-bebas text-[clamp(36px,8vw,130px)] leading-[0.85] tracking-[-0.02em] uppercase flex flex-col">
            <span className="text-[var(--text-primary)]">VERIFIED BY</span>
            <span className="text-[var(--acid)]">502 MEMBERS</span>
          </h2>
        </TextReveal>
        <p className="font-mono text-[12px] text-[var(--text-secondary)] mt-8 tracking-widest uppercase">
          4.7 ★ [SRC: GOOGLE REVIEWS] · 80+ members specifically praised our trainers
        </p>
      </div>

      {/* Marquee Container */}
      <div className="flex flex-col gap-6 relative">
        
        {/* Row 1: Scroll Left */}
        <div className="group flex overflow-hidden">
          <div className="flex shrink-0 animate-[marquee_40s_linear_infinite] group-hover:[animation-play-state:paused]">
            {[...REVIEWS, ...REVIEWS].map((review, i) => (
              <div 
                key={`r1-${i}`}
                className="w-[350px] shrink-0 border border-[var(--border)] bg-[var(--surface)] p-7 mx-3 hover:border-[var(--acid)] transition-colors duration-300 flex flex-col"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className={`w-4 h-4 ${j < review.rating ? 'fill-[var(--acid)] text-[var(--acid)]' : 'text-[#333]'}`} />
                  ))}
                </div>
                <p className="font-inter text-[14px] text-[var(--text-secondary)] mb-8 leading-relaxed flex-1">
                  &quot;{review.text}&quot;
                </p>
                <div className="flex items-center justify-between border-t border-[var(--border)] pt-4 mt-auto">
                  <span className="font-grotesk font-bold text-[var(--text-primary)] uppercase">{review.authorName}</span>
                  <span className="font-mono text-[10px] text-[var(--acid)] uppercase tracking-widest">[VERIFIED]</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Scroll Right (reverse) */}
        <div className="group flex overflow-hidden">
          <div className="flex shrink-0 animate-[marquee_40s_linear_infinite_reverse] group-hover:[animation-play-state:paused]">
            {/* Reverse the array to make it look different from row 1 */}
            {[...REVIEWS.slice().reverse(), ...REVIEWS.slice().reverse()].map((review, i) => (
              <div 
                key={`r2-${i}`}
                className="w-[350px] shrink-0 border border-[var(--border)] bg-[var(--surface)] p-7 mx-3 hover:border-[var(--acid)] transition-colors duration-300 flex flex-col"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className={`w-4 h-4 ${j < review.rating ? 'fill-[var(--acid)] text-[var(--acid)]' : 'text-[#333]'}`} />
                  ))}
                </div>
                <p className="font-inter text-[14px] text-[var(--text-secondary)] mb-8 leading-relaxed flex-1">
                  &quot;{review.text}&quot;
                </p>
                <div className="flex items-center justify-between border-t border-[var(--border)] pt-4 mt-auto">
                  <span className="font-grotesk font-bold text-[var(--text-primary)] uppercase">{review.authorName}</span>
                  <span className="font-mono text-[10px] text-[var(--acid)] uppercase tracking-widest">[VERIFIED]</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
