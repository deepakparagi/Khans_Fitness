'use client';

import { TextReveal } from '@/components/ui/TextReveal';
import { BarChart3 } from 'lucide-react';
import Link from 'next/link';

export default function CalculatorsPage() {

  return (
    <div className="w-full min-h-[100svh] bg-[var(--bg)]">
      <section className="pt-32 pb-24 lg:pt-48 px-6 lg:px-12 2xl:px-24 w-full mx-auto flex flex-col items-center">
        
        <div className="flex flex-col items-center text-center max-w-2xl mb-16">
          <div className="flex items-center gap-2 font-mono text-[11px] text-[var(--acid)] tracking-widest uppercase mb-8 border border-[var(--acid)] px-3 py-1 w-max">
            <BarChart3 className="w-4 h-4" />
            [METRICS_HUB]
          </div>
          <TextReveal>
            <h1 className="font-bebas text-[clamp(32px,7vw,90px)] leading-[0.85] tracking-[-0.02em] uppercase text-[var(--text-primary)] mb-6">
              ADVANCED <span className="text-[var(--acid)]">CALCULATORS</span>
            </h1>
          </TextReveal>
          <p className="font-inter text-[var(--text-secondary)]">Select a module to compute your performance thresholds.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {/* Card 1 */}
          <Link href="/ai/bmi" className="group flex flex-col border border-[var(--border)] bg-[var(--surface)] p-9 hover:bg-[var(--acid-dim)] hover:border-[var(--acid)] transition-colors min-h-[240px]">
            <h3 className="font-bebas text-[32px] text-[var(--text-primary)] uppercase mb-3 group-hover:text-[var(--acid)] transition-colors">BMI & BMR</h3>
            <p className="font-inter text-[14px] text-[var(--text-secondary)] mb-8 leading-relaxed">Calculate exact Body Mass Index and basal metabolic rate.</p>
            <span className="mt-auto font-mono text-[12px] text-[var(--acid)] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">ACCESS MODULE →</span>
          </Link>
          
          {/* Card 2 */}
          <div className="group flex flex-col border border-[var(--border)] bg-[var(--surface)] p-9 hover:bg-[var(--surface2)] transition-colors min-h-[240px] opacity-50 cursor-not-allowed">
            <h3 className="font-bebas text-[32px] text-[var(--text-primary)] uppercase mb-3">1RM MAX</h3>
            <p className="font-inter text-[14px] text-[var(--text-secondary)] mb-8 leading-relaxed">Calculate your absolute maximum power output for lifts.</p>
            <span className="mt-auto font-mono text-[12px] text-[var(--text-muted)] uppercase tracking-widest">[SYSTEM OFFLINE]</span>
          </div>

          {/* Card 3 */}
          <div className="group flex flex-col border border-[var(--border)] bg-[var(--surface)] p-9 hover:bg-[var(--surface2)] transition-colors min-h-[240px] opacity-50 cursor-not-allowed">
            <h3 className="font-bebas text-[32px] text-[var(--text-primary)] uppercase mb-3">MACRO SPLIT</h3>
            <p className="font-inter text-[14px] text-[var(--text-secondary)] mb-8 leading-relaxed">Determine precise protein, carb, and fat distributions.</p>
            <span className="mt-auto font-mono text-[12px] text-[var(--text-muted)] uppercase tracking-widest">[SYSTEM OFFLINE]</span>
          </div>
        </div>

      </section>
    </div>
  );
}
