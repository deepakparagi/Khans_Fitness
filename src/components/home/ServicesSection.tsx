'use client';

import { TextReveal } from '@/components/ui/TextReveal';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const SERVICES = [
  { id: '01', name: 'STRENGTH TRAINING', tags: '[WEIGHTS · COMPOUND]', desc: 'Progressive overload programming utilizing raw free weights and plate-loaded machines.' },
  { id: '02', name: 'WEIGHT LOSS & CARDIO', tags: '[HIIT · METABOLIC]', desc: 'High-output metabolic conditioning designed to incinerate fat and optimize cardiovascular health.' },
  { id: '03', name: 'PERSONAL TRAINING', tags: '[1-ON-1 · DATA DRIVEN]', desc: 'Direct, brutal accountability from our elite Human Optimization Coaches.' },
  { id: '04', name: 'AI COACHING', tags: '[ALGORITHMIC · PRECISE]', desc: 'Automated diet and workout generation customized to your specific biomechanical metrics.' },
  { id: '05', name: 'BODY TRANSFORMATION', tags: '[90-DAY · RESULTS]', desc: 'A complete system reboot. Nutrition, programming, and tracking for a total physique overhaul.' },
];

export function ServicesSection() {
  return (
    <section className="bg-[var(--bg)] py-24 lg:py-32 border-b border-[var(--border)]">
      <div className="px-6 lg:px-12 2xl:px-24 w-full mx-auto">
        
        {/* 2-Column Desktop Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-20 items-start">
          
          {/* Left Column (55%): Header + Services List */}
          <div className="flex flex-col">
            {/* Header Area */}
            <div className="flex flex-col mb-16 lg:mb-24">
              <div className="font-mono text-[11px] text-[var(--acid)] tracking-widest uppercase mb-6 lg:mb-12">
                [SYS_INF: CORE_CAPABILITIES]
              </div>

              <TextReveal stagger={0.15}>
                <div className="font-bebas text-[clamp(56px,7vw,96px)] leading-[0.85] tracking-[-0.02em] uppercase flex flex-col">
                  <span className="text-[var(--text-primary)]">ENGINEERED</span>
                  <span className="text-[var(--acid)]">FOR</span>
                  <span className="text-[var(--text-primary)]">MAXIMUM</span>
                  <span className="text-[var(--acid)]">OUTPUT</span>
                </div>
              </TextReveal>
              
              <p className="font-inter text-[14px] text-[var(--text-secondary)] mt-8 max-w-lg leading-relaxed">
                Every capability we deploy is calibrated for maximum athletic performance. We eliminate the friction between effort and results with structured biomechanics, elite equipment, and data-driven systems.
              </p>
            </div>

            {/* List Format */}
            <div className="flex flex-col border-t border-[var(--border)]">
              {SERVICES.map((service) => (
                <Link 
                  key={service.id} 
                  href="/plans"
                  className="service-row group relative flex flex-col md:flex-row md:items-center justify-between border-b border-[var(--border)] p-6 lg:p-8 overflow-hidden transition-colors"
                  data-cursor-text="VIEW"
                >
                  {/* Hover Sweep Effect */}
                  <div className="absolute inset-0 bg-[var(--acid)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] z-0" />
                  
                  {/* Content */}
                  <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-4 md:gap-16 w-full">
                    
                    {/* Number */}
                    <div className="font-mono text-[11px] text-[var(--text-muted)] group-hover:text-[var(--bg)] transition-colors duration-300 w-8">
                      {service.id}
                    </div>
                    
                    {/* Name */}
                    <div className="flex-1">
                      <h3 className="font-grotesk font-bold text-[20px] text-[var(--text-primary)] group-hover:text-[var(--bg)] transition-colors duration-300 uppercase">
                        {service.name}
                      </h3>
                      <p className="font-inter text-[14px] text-[var(--text-secondary)] group-hover:text-[var(--bg)] transition-colors duration-300 mt-2 max-w-lg opacity-100 group-hover:opacity-70">
                        {service.desc}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="font-mono text-[10px] text-[var(--text-muted)] group-hover:text-[var(--bg)] transition-colors duration-300 tracking-widest hidden lg:block opacity-100 group-hover:opacity-80">
                      {service.tags}
                    </div>

                    {/* Arrow */}
                    <div className="hidden md:flex w-12 h-12 rounded-full border border-[var(--border)] group-hover:bg-[var(--bg)] group-hover:border-[var(--bg)] items-center justify-center transition-colors duration-300">
                      <ArrowRight className="w-5 h-5 text-[var(--text-primary)] group-hover:text-[var(--acid)] transition-colors duration-300" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Column (45%): Sticky Image */}
          <div className="sticky top-[100px] h-[calc(100vh-160px)] min-h-[400px] hidden lg:block overflow-hidden border border-[var(--border)]">
            <img 
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=900&q=80"
              alt="Elite Athletic Facility"
              className="service-sticky-image w-full h-full object-cover transition-[filter] duration-300"
            />
          </div>
          
        </div>

      </div>
    </section>
  );
}
