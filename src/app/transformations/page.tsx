import { TextReveal } from '@/components/ui/TextReveal';
import { ArrowDown, ArrowUp } from 'lucide-react';
import Image from 'next/image';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Real Transformations | Khan's Fitness",
  description: "See the real results from our members at Khan's Fitness. Proven weight loss and muscle gain transformations driven by our expert trainers and data-driven protocols.",
};

const TRANSFORMATIONS = [
  {
    id: 1,
    name: 'VIKAS R.',
    goal: 'WEIGHT LOSS',
    startWeight: '105',
    endWeight: '80',
    change: 'Lost 25kg',
    duration: '8 months',
    story: 'Completely overhauled my diet and followed the metabolic conditioning protocol to the letter. Brutal but effective.',
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
  },
  {
    id: 3,
    name: 'DEEPA J.',
    goal: 'POST-PREGNANCY',
    startWeight: '78',
    endWeight: '62',
    change: '16kg lost',
    duration: '6 months',
    story: 'Structured recovery and gradual strength building. The system adapted to my biomechanical needs perfectly.',
    isLoss: true,
  },
  {
    id: 4,
    name: 'RAVI H.',
    goal: 'LEAN MUSCLE',
    startWeight: '68',
    endWeight: '80',
    change: '12kg gained',
    duration: '6 months',
    story: 'Switched from generic bro-splits to Khan\'s functional powerlifting protocols. The gains speak for themselves.',
    isLoss: false,
  }
];

export default function TransformationsPage() {
  return (
    <div className="w-full bg-[var(--bg)]">
      
      {/* Hero Section */}
      <section className="relative mt-[72px] pt-[80px] pb-[100px] px-6 lg:px-12 2xl:px-24 w-full mx-auto h-[calc(100svh-72px)] min-h-[calc(100svh-72px)] flex flex-col justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/hero/4722374.jpg"
            alt="Real Transformations"
            fill
            className="object-cover grayscale transition-opacity duration-300 hero-bg-image"
            quality={90}
            priority
          />
          <div className="absolute inset-0 bg-[var(--hero-overlay-bg)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/30 to-transparent" />
        </div>
        
        <div className="relative z-10 flex flex-col items-start text-left px-6">
          <div className="font-mono text-[11px] text-[var(--tag-text)] tracking-widest uppercase mb-8 border border-[var(--acid-border)] bg-[var(--acid-dim)] px-3 py-1 inline-block">
            [SYS_INF: PROTOCOL_RESULTS]
          </div>
          <TextReveal stagger={0.15} className="items-start">
            <h1 className="font-bebas text-[clamp(36px,8vw,130px)] leading-[0.85] tracking-[-0.02em] uppercase flex flex-col items-start drop-shadow-2xl">
              <span className="text-[var(--text-primary)]">REAL</span>
              <span className="text-[var(--acid)]">TRANSFORMATIONS</span>
            </h1>
          </TextReveal>
          <p className="font-inter text-[var(--text-secondary)] mt-8 max-w-xl text-left">
            These are real members who executed the protocol. Their data proves the efficacy of our brutalist optimization system.
          </p>
        </div>
      </section>

      <section className="py-[100px] px-6 lg:px-12 2xl:px-24 w-full mx-auto">
        
        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {TRANSFORMATIONS.map((tf) => (
            <div 
              key={tf.id}
              className="flex flex-col sm:flex-row border border-[var(--border)] bg-[var(--surface)] hover:border-l-[2px] hover:border-l-[var(--acid)] transition-all duration-300"
            >
              {/* Left: Weight Data */}
              <div className="sm:w-[45%] border-b sm:border-b-0 sm:border-r border-[var(--border)] p-8 flex flex-col items-center justify-center relative bg-[var(--surface2)]">
                <div className="absolute top-4 left-4 font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest">
                  [STATE: INITIAL]
                </div>
                
                <div className="flex flex-col items-center mt-6">
                  <div className="font-bebas text-[52px] text-[var(--muted)] line-through leading-none">
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

                <div className="absolute bottom-4 right-4 font-mono text-[10px] bg-[var(--acid)] text-[var(--bg)] px-2 py-1 uppercase tracking-widest">
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

      </section>
    </div>
  );
}
