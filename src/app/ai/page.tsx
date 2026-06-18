

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
  // Generate procedural mesh grid wave dots (matching the reference 3D wave curvature)
  interface MeshDot {
    key: string;
    cx: number;
    cy: number;
    r: number;
    opacity: number;
  }
  const cols = 16;
  const rows = 12;
  const meshDots: MeshDot[] = [];
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      const pctX = c / (cols - 1);
      const pctY = r / (rows - 1);
      
      const x = 30 + pctX * 340;
      const y = 30 + pctY * 240;
      
      // Multi-sine 3D landscape contours
      const phase = (pctX * 3.6) + (pctY * 2.0);
      const waveVal = Math.sin(phase);
      
      const displacedY = y + waveVal * 15;
      const displacedX = x + Math.cos(phase) * 6;
      
      // Scale dot radius and opacity to simulate 3D depth contours
      const radius = 0.8 + (waveVal + 1) * 0.9;
      const opacity = 0.02 + (waveVal + 1) * 0.035;
      
      meshDots.push({
        key: `${c}-${r}`,
        cx: displacedX,
        cy: displacedY,
        r: radius,
        opacity: Number(opacity.toFixed(3)),
      });
    }
  }

  return (
    <div className="relative w-full bg-[var(--bg)] overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative z-10 mt-[72px] pt-[80px] pb-[100px] px-6 lg:px-12 2xl:px-24 w-full mx-auto min-h-[calc(100svh-72px)] flex flex-col items-center justify-center overflow-hidden">
        
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
          <div className="absolute inset-0 bg-[var(--hero-overlay-bg)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/30 to-transparent" />
        </div>
 
        {/* Header Content */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 font-mono text-[11px] text-[var(--tag-text)] tracking-widest uppercase mb-8 border border-[var(--acid-border)] bg-[var(--acid-dim)] px-4 py-1.5 backdrop-blur-sm">
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
                style={{ background: 'var(--ai-card-bg)' }}
                className="group relative overflow-hidden flex flex-col border border-[var(--border)] p-9 shadow-[0_10px_40px_rgba(0,0,0,0.04)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.45)] hover:border-[var(--acid)] hover:scale-[1.02] hover:shadow-[0_20px_60px_rgba(91,15,24,0.15)] transition-all duration-500 min-h-[280px]"
              >
                {/* Procedural Metallic Mesh Waves Background */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                  <svg 
                    className="absolute w-[120%] h-[120%] -left-[10%] -top-[10%] opacity-[var(--ai-card-mesh-opacity)] group-hover:opacity-80 transition-all duration-700 pointer-events-none" 
                    viewBox="0 0 400 300"
                    style={{
                      animation: 'meshFloat 10s ease-in-out infinite',
                    }}
                  >
                    {meshDots.map((dot) => (
                      <circle 
                        key={dot.key}
                        cx={dot.cx}
                        cy={dot.cy}
                        r={dot.r}
                        fill="var(--ai-card-mesh-color)"
                        opacity={dot.opacity}
                      />
                    ))}
                  </svg>
                  {/* Luxury soft radial gradient lighting */}
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,var(--text-primary)_0%,transparent_75%)]" />
                  {/* Metallic travel shine sweep */}
                  <div className="card-shine" />
                </div>
                
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
