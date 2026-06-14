'use client';

import { useState } from 'react';
import { TextReveal } from '@/components/ui/TextReveal';
import { Activity } from 'lucide-react';
import Link from 'next/link';

export default function AssessmentPage() {
  const [analyzing, setAnalyzing] = useState(false);
  const [done, setDone] = useState(false);

  const startAnalysis = (e: React.FormEvent) => {
    e.preventDefault();
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setDone(true);
    }, 2000);
  };

  return (
    <div className="w-full min-h-[100svh] bg-[var(--bg)]">
      <section className="pt-32 pb-24 lg:pt-48 px-6 lg:px-12 2xl:px-24 w-full mx-auto flex flex-col lg:flex-row gap-16">
        
        {/* Left: Form */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <div className="flex items-center gap-2 font-mono text-[11px] text-[var(--acid)] tracking-widest uppercase mb-8 border border-[var(--acid)] px-3 py-1 w-max">
            <Activity className="w-4 h-4" />
            [BIOMETRIC_SCAN]
          </div>
          <TextReveal>
            <h1 className="font-bebas text-[clamp(32px,7vw,90px)] leading-[0.85] tracking-[-0.02em] uppercase text-[var(--text-primary)] mb-12">
              FITNESS <span className="text-[var(--acid)]">ASSESSMENT</span>
            </h1>
          </TextReveal>

          <form onSubmit={startAnalysis} className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] text-[var(--text-secondary)] uppercase tracking-widest">Age</label>
                <input required type="number" className="bg-[var(--surface)] border border-[var(--border)] p-4 font-mono text-[12px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--acid)] transition-colors" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] text-[var(--text-secondary)] uppercase tracking-widest">Gender</label>
                <select className="bg-[var(--surface)] border border-[var(--border)] p-4 font-mono text-[12px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--acid)] transition-colors appearance-none">
                  <option>MALE</option>
                  <option>FEMALE</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] text-[var(--text-secondary)] uppercase tracking-widest">Current Level</label>
                <select className="bg-[var(--surface)] border border-[var(--border)] p-4 font-mono text-[12px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--acid)] transition-colors appearance-none">
                  <option>BEGINNER</option>
                  <option>INTERMEDIATE</option>
                  <option>ADVANCED</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] text-[var(--text-secondary)] uppercase tracking-widest">Goal</label>
                <select className="bg-[var(--surface)] border border-[var(--border)] p-4 font-mono text-[12px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--acid)] transition-colors appearance-none">
                  <option>WEIGHT LOSS</option>
                  <option>MUSCLE GAIN</option>
                  <option>STRENGTH</option>
                </select>
              </div>
            </div>
            
            <button disabled={analyzing} className="bg-[var(--acid)] text-[#080808] font-mono text-[12px] font-bold uppercase tracking-widest py-5 mt-4 hover:bg-white transition-colors disabled:opacity-50">
              {analyzing ? '[ANALYZING_DATA...]' : 'INITIALIZE SCAN →'}
            </button>
          </form>
        </div>

        {/* Right: Results Panel */}
        <div className="w-full lg:w-1/2 bg-[var(--surface)] border border-[var(--border)] p-8 lg:p-12 flex flex-col justify-center min-h-[400px]">
          {analyzing ? (
            <div className="flex flex-col items-center justify-center text-center">
              <Activity className="w-12 h-12 text-[var(--acid)] mb-4 animate-pulse" />
              <span className="font-mono text-[11px] text-[var(--acid)] tracking-widest uppercase">
                PROCESSING BIOMETRICS
              </span>
            </div>
          ) : done ? (
            <div className="flex flex-col animate-in fade-in zoom-in duration-500">
              <span className="font-mono text-[11px] text-[var(--text-muted)] tracking-widest uppercase mb-4">[ASSESSMENT_COMPLETE]</span>
              <span className="font-bebas text-[80px] text-[var(--text-primary)] leading-none mb-2">SCORE: <span className="text-[var(--acid)]">72/100</span></span>
              <span className="font-grotesk font-bold text-[24px] text-[var(--text-primary)] uppercase mb-12">INTERMEDIATE CAPABILITY</span>

              <div className="border-l-2 border-[var(--acid)] pl-6 mb-8">
                <h4 className="font-mono text-[11px] text-[var(--acid)] uppercase tracking-widest mb-2">SYSTEM RECOMMENDATION</h4>
                <p className="font-inter text-[14px] text-[var(--text-secondary)] leading-relaxed">
                  Baseline metrics are within operational thresholds. Proceed with Hypertrophy Protocol to increase power output. Consult our experts for precise form correction.
                </p>
              </div>
              <Link href="/contact" className="font-mono text-[11px] text-[var(--text-primary)] uppercase tracking-widest border border-white px-6 py-3 w-max hover:bg-white hover:text-black transition-colors">
                TALK TO AN EXPERT
              </Link>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center opacity-50">
              <Activity className="w-12 h-12 text-[var(--text-muted)] mb-4" />
              <span className="font-mono text-[11px] text-[var(--text-secondary)] tracking-widest uppercase">
                AWAITING_INPUT
              </span>
            </div>
          )}
        </div>

      </section>
    </div>
  );
}
