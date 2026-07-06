'use client';

import { TextReveal } from '@/components/ui/TextReveal';
import Image from 'next/image';
import { Dumbbell, Users, Cpu, ShieldCheck } from 'lucide-react';

const FEATURES = [
  {
    id: '01',
    title: 'MODERN EQUIPMENT',
    desc: 'Top-notch, well-maintained machines for cardio and heavy weight lifting. Members never wait long — equipment is always available and in peak condition.',
    icon: Dumbbell,
  },
  {
    id: '02',
    title: 'EXPERT TRAINERS',
    desc: 'Khan Sir and Sonu Sir are exceptionally knowledgeable and attentive to form, ensuring every exercise is executed correctly.',
    icon: Users,
  },
  {
    id: '03',
    title: 'AI PROTOCOLS',
    desc: 'Cutting-edge algorithmic programming tailored precisely to your biomechanical data and transformation goals. No guesswork, just results.',
    icon: Cpu,
  },
  {
    id: '04',
    title: 'UNISEX FACILITY',
    desc: 'A highly respectful, disciplined environment welcoming both men and women. We focus purely on performance and community support.',
    icon: ShieldCheck,
  }
];

export function AboutPreview() {
  return (
    <section className="relative w-full min-h-[100svh] bg-[var(--bg)] text-[var(--text-primary)] border-y border-[var(--border)] flex flex-col lg:flex-row overflow-hidden">
      
      {/* Left Content (55%) */}
      <div className="w-full lg:w-[55%] flex flex-col z-10 bg-[var(--bg)] lg:border-r border-[var(--border)] relative">
        {/* Top Heading Strip */}
        <div className="px-6 lg:px-12 2xl:px-24 py-16 lg:py-20 border-b border-[var(--border)] bg-[var(--bg2)] relative overflow-hidden">
          <div className="absolute -left-10 -top-10 w-40 h-40 bg-[var(--acid)] opacity-[0.03] blur-3xl rounded-full pointer-events-none" />
          
          <div className="font-mono text-[11px] text-[var(--acid)] tracking-widest uppercase mb-6 flex items-center gap-3 relative z-10">
            <span className="w-8 h-px bg-[var(--acid)]"></span>
            Why Choose Us
          </div>
          <TextReveal>
            <h2 className="font-bebas text-[clamp(40px,8vw,90px)] leading-[0.85] tracking-[-0.02em] uppercase text-white relative z-10">
              UNLEASH YOUR <br/>
              <span className="text-[var(--acid)] drop-shadow-[0_0_15px_rgba(255,59,48,0.3)]">POTENTIAL</span>
            </h2>
          </TextReveal>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 flex-1 relative">
          {FEATURES.map((feat, i) => {
            const Icon = feat.icon;
            // Handle borders carefully for the grid
            // Sm screens and up: right border on even items (index 0, 2), bottom border on all except last row
            const isRightBorder = i % 2 === 0;
            const isBottomBorder = i < 2;
            
            return (
              <div 
                key={feat.id}
                className={`group relative p-8 lg:p-12 flex flex-col overflow-hidden transition-colors duration-500 hover:bg-[var(--acid)]
                  ${isRightBorder ? 'sm:border-r border-[var(--border)]' : ''}
                  ${isBottomBorder ? 'border-b border-[var(--border)]' : ''}
                  ${i === 2 ? 'border-b sm:border-b-0 border-[var(--border)]' : ''}
                `}
              >
                {/* Number Watermark */}
                <span className="absolute top-4 right-6 font-bebas text-[80px] leading-none text-[var(--border)] group-hover:text-[var(--bg)]/10 transition-colors duration-500 select-none z-0 pointer-events-none">
                  {feat.id}
                </span>

                <div className="relative z-10 flex-1 flex flex-col justify-end">
                  <div className="w-12 h-12 mb-8 flex items-center justify-center border border-[var(--border)] group-hover:border-transparent rounded-sm bg-[var(--bg2)] group-hover:bg-[var(--bg)]/10 transition-all duration-500 shadow-sm group-hover:shadow-none">
                    <Icon className="w-5 h-5 text-[var(--acid)] group-hover:text-[var(--bg)] transition-colors duration-500" />
                  </div>
                  
                  <h3 className="font-grotesk font-bold text-[20px] uppercase mb-4 text-[var(--text-primary)] group-hover:text-[var(--bg)] transition-colors duration-500">
                    {feat.title}
                  </h3>
                  <p className="font-inter text-[14px] text-[var(--text-secondary)] group-hover:text-[var(--bg)]/90 leading-relaxed transition-colors duration-500 max-w-[280px]">
                    {feat.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Image (45%) */}
      <div className="w-full lg:w-[45%] h-[50vh] lg:h-auto relative group overflow-hidden bg-[var(--bg2)]">
        <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-black/10 transition-colors duration-700 pointer-events-none" />
        {/* Diagonal overlay pattern */}
        <div className="absolute inset-0 z-20 opacity-30 mix-blend-overlay pointer-events-none" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, var(--border) 0, var(--border) 1px, transparent 0, transparent 50%)',
            backgroundSize: '10px 10px'
        }} />
        
        <Image 
          src="/images/Web/1.png"
          alt="Gym Atmosphere"
          fill
          className="object-cover scale-105 group-hover:scale-100 transition-transform duration-[1.5s] ease-out grayscale-[40%] group-hover:grayscale-0"
          quality={90}
          priority
        />
        
        {/* Floating badge */}
        <div className="absolute bottom-10 right-10 z-30 bg-[var(--acid)] text-[var(--bg)] p-4 flex flex-col items-center justify-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100 shadow-2xl border border-[var(--acid)]">
          <span className="font-bebas text-[32px] leading-none">EST.</span>
          <span className="font-mono text-[12px] font-bold tracking-widest mt-1">2015</span>
        </div>
      </div>

    </section>
  );
}
