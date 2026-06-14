'use client';

import { TextReveal } from '@/components/ui/TextReveal';
import { ArrowDown, ArrowUp } from 'lucide-react';

const TRANSFORMATIONS = [
  {
    id: 1,
    name: 'VIKAS R.',
    goal: 'WEIGHT LOSS',
    startWeight: '105',
    endWeight: '80',
    change: 'Lost 25kg',
    duration: '8 months',
    story: 'Completely overhauled my diet and followed the metabolic conditioning protocol to the letter.',
    isLoss: true,
  },
  {
    id: 2,
    name: 'ARJUN N.',
    goal: 'MUSCLE GAIN',
    startWeight: '55',
    endWeight: '72',
    change: '17kg gained',
    duration: '12 months',
    story: 'Strict hypertrophy programming and calorie surplus. The data-driven approach worked flawlessly.',
    isLoss: false,
  }
];

export function TransformationsPreview() {
  return (
    <section className="bg-[var(--bg)] py-24 lg:py-32 border-b border-[var(--border)]">
      <div className="px-6 lg:px-12 2xl:px-24 w-full mx-auto">
        
        {/* Header */}
        <div className="mb-20">
          <TextReveal stagger={0.1}>
            <h2 className="font-bebas text-[clamp(36px,8vw,130px)] leading-[0.85] tracking-[-0.02em] uppercase flex flex-col">
              <span className="text-[var(--text-primary)]">REAL</span>
              <span className="text-[var(--acid)]">TRANSFORMATIONS</span>
            </h2>
          </TextReveal>
          <p className="font-inter text-[var(--text-secondary)] mt-6 max-w-xl">
            These are real members who executed the protocol. Their data proves the efficacy of our brutalist optimization system.
          </p>
        </div>

        {/* 2-Col Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {TRANSFORMATIONS.map((tf) => (
            <div 
              key={tf.id}
              className="flex flex-col sm:flex-row border border-[var(--border)] bg-[var(--surface)] hover:border-l-[2px] hover:border-l-[var(--acid)] transition-all duration-300"
            >
              {/* Left: Weight Data */}
              <div className="sm:w-[45%] border-b sm:border-b-0 sm:border-r border-[var(--border)] p-8 flex flex-col items-center justify-center relative bg-[var(--bg)]">
                <div className="absolute top-4 left-4 font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest">
                  [STATE: INITIAL]
                </div>
                
                <div className="flex flex-col items-center mt-6">
                  <div className="font-bebas text-[52px] text-[#333] line-through leading-none">
                    {tf.startWeight}kg
                  </div>
                  
                  <div className="my-4">
                    {tf.isLoss ? (
                      <ArrowDown className="w-8 h-8 text-[var(--acid)]" />
                    ) : (
                      <ArrowUp className="w-8 h-8 text-[var(--acid)]" />
                    )}
                  </div>
                  
                  <div className="font-bebas text-[72px] text-[var(--acid)] leading-none">
                    {tf.endWeight}kg
                  </div>
                </div>

                <div className="absolute bottom-4 right-4 font-mono text-[10px] bg-[var(--acid)] text-[#080808] px-2 py-1 uppercase tracking-widest">
                  [STATE: OPTIMAL]
                </div>
              </div>

              {/* Right: Info */}
              <div className="sm:w-[55%] p-8 flex flex-col justify-center">
                <div className="font-mono text-[11px] text-[var(--acid)] mb-4 tracking-widest uppercase">
                  {tf.goal}
                </div>
                
                <h3 className="font-grotesk font-bold text-[22px] text-[var(--text-primary)] uppercase mb-3">
                  {tf.name}
                </h3>
                
                <p className="font-inter text-[14px] text-[var(--text-secondary)] mb-8 leading-relaxed">
                  {tf.story}
                </p>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-2 border-t border-[var(--border)] pt-6 mt-auto">
                  <div className="flex flex-col">
                    <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase mb-1">Delta</span>
                    <span className="font-mono text-[12px] text-[var(--text-primary)]">{tf.change}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase mb-1">Time</span>
                    <span className="font-mono text-[12px] text-[var(--text-primary)]">{tf.duration}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase mb-1">Status</span>
                    <span className="font-mono text-[12px] text-[var(--acid)]">VALID ✓</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
