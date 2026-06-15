

import { TextReveal } from '@/components/ui/TextReveal';
import { Cpu, Fingerprint, Radar, Microscope, Network, Terminal } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Fitness Lab | Khan's Fitness",
  description: "Cutting-edge AI tools to optimize your fitness journey. Generate workouts, plan your diet, calculate BMI, and chat with our AI coach at Khan's Fitness.",
};

const AI_TOOLS = [
  {
    title: 'BMI Calculator',
    path: '/ai/bmi',
    icon: Fingerprint,
    desc: 'Calculate your exact Body Mass Index and identify your basal metabolic rate with precision data.'
  },
  {
    title: 'Fitness Assessment',
    path: '/ai/assessment',
    icon: Radar,
    desc: 'A comprehensive evaluation of your current physical capacity and biomechanical state.'
  },
  {
    title: 'Workout Generator',
    path: '/ai/workout',
    icon: Cpu,
    desc: 'Algorithmic generation of training protocols based on your specific goals and schedule.'
  },
  {
    title: 'Diet Planner',
    path: '/ai/diet',
    icon: Microscope,
    desc: 'Macro-calculated nutritional planning optimized for your localized dietary preferences.'
  },
  {
    title: 'Health Calculators',
    path: '/ai/calculators',
    icon: Network,
    desc: 'Advanced metrics including body fat percentage, 1RM, and targeted heart rate zones.'
  },
  {
    title: 'AI Fitness Chat',
    path: '/ai/chat',
    icon: Terminal,
    desc: 'Direct communication line with the Khan\'s Fitness AI coaching system for instant guidance.'
  }
];

export default function AIHubPage() {
  return (
    <div className="relative w-full bg-[var(--bg)] overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative z-10 mt-[64px] pt-[80px] pb-[100px] px-6 lg:px-12 2xl:px-24 w-full mx-auto min-h-[calc(100svh-64px)] flex flex-col items-center justify-center overflow-hidden">
        
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/hero/4722389.jpg"
            alt="AI Fitness Lab"
            fill
            className="object-cover grayscale transition-opacity duration-300 hero-bg-image"
            quality={90}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/50 to-transparent" />
        </div>

        {/* Header Content */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 font-mono text-[11px] text-[var(--acid)] tracking-widest uppercase mb-8 border border-[var(--acid-border)] bg-[var(--acid-dim)] px-4 py-1.5 backdrop-blur-sm">
            <Cpu className="w-4 h-4" />
            [AI-POWERED]
          </div>
          <TextReveal stagger={0.15} className="items-center">
            <h1 className="font-bebas text-[clamp(36px,8vw,130px)] leading-[0.85] tracking-[-0.02em] uppercase flex flex-col items-center drop-shadow-2xl">
              <span className="text-[var(--text-primary)]">YOUR AI</span>
              <span className="text-[var(--text-primary)]">FITNESS</span>
              <span className="text-[var(--acid)]">LAB</span>
            </h1>
          </TextReveal>
          <p className="font-inter text-[var(--text-secondary)] mt-8 max-w-xl text-center">
            Cutting-edge AI tools that analyze your body, plan your workouts, design your diet, and coach you to your goals — completely free.
          </p>
        </div>

      </section>

      {/* Grid Section */}
      <section className="py-[100px] px-6 lg:px-12 2xl:px-24 w-full mx-auto">
        {/* 3x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {AI_TOOLS.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.title}
                href={tool.path}
                className="group relative overflow-hidden flex flex-col border border-[var(--border)] bg-[var(--surface)] p-9 hover:border-[var(--acid)] hover:bg-[var(--acid-dim)] transition-colors duration-300 min-h-[280px]"
              >
                {/* Spectral Gradient Background */}
                <div className="absolute inset-0 z-0 bg-[linear-gradient(to_bottom_right,#ef4444,#f97316,#eab308,#22c55e,#3b82f6,#6366f1,#a855f7)] opacity-[0.03] group-hover:opacity-[0.12] transition-opacity duration-500" />
                
                <div className="relative z-10 flex flex-col flex-1">
                  <Icon className="w-7 h-7 text-[var(--acid)] mb-8" />
                  
                  <h3 className="font-grotesk font-bold text-[22px] text-[var(--text-primary)] uppercase mb-3 group-hover:text-[var(--acid)] transition-colors">
                    {tool.title}
                  </h3>
                  
                  <p className="font-inter text-[14px] text-[var(--text-secondary)] mb-8 leading-relaxed">
                    {tool.desc}
                  </p>

                  <div className="mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="font-mono text-[11px] text-[var(--acid)] uppercase tracking-widest">
                      → LAUNCH
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </section>
    </div>
  );
}
