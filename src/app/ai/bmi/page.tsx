'use client';

import { useState } from 'react';
import { TextReveal } from '@/components/ui/TextReveal';
import { Calculator } from 'lucide-react';

export default function BMIPage() {
  const [bmiData, setBmiData] = useState<{
    score: number;
    category: string;
    recommendation: string;
  } | null>(null);

  const calculateBMI = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const heightCm = Number(formData.get('height'));
    const weightKg = Number(formData.get('weight'));

    if (heightCm > 0 && weightKg > 0) {
      const heightM = heightCm / 100;
      const bmiScore = weightKg / (heightM * heightM);
      
      let category = '';
      let recommendation = '';

      if (bmiScore < 18.5) {
        category = 'UNDERWEIGHT';
        recommendation = 'Mass acquisition required. Initiate a caloric surplus protocol immediately to build foundational strength.';
      } else if (bmiScore >= 18.5 && bmiScore < 25) {
        category = 'OPTIMAL MASS';
        recommendation = 'Your mass is optimal for baseline functionality. We recommend transitioning to a Hypertrophy protocol to increase raw power output.';
      } else if (bmiScore >= 25 && bmiScore < 30) {
        category = 'OVERWEIGHT';
        recommendation = 'Excess mass detected. Initiate a body recomp protocol combining strength training with a slight caloric deficit.';
      } else {
        category = 'OBESE';
        recommendation = 'Critical mass levels detected. Immediate implementation of a fat loss protocol and cardiovascular conditioning is required.';
      }

      setBmiData({
        score: Number(bmiScore.toFixed(1)),
        category,
        recommendation
      });
    }
  };

  return (
    <div className="w-full min-h-[100svh] bg-[var(--bg)]">
      <section className="pt-32 pb-24 lg:pt-48 px-6 lg:px-12 2xl:px-24 w-full mx-auto flex flex-col lg:flex-row gap-16">
        
        {/* Left: Form */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <div className="flex items-center gap-2 font-mono text-[11px] text-[var(--acid)] tracking-widest uppercase mb-8 border border-[var(--acid)] px-3 py-1 w-max">
            <Calculator className="w-4 h-4" />
            [BMI_MODULE]
          </div>
          <TextReveal>
            <h1 className="font-bebas text-[clamp(32px,7vw,90px)] leading-[0.85] tracking-[-0.02em] uppercase text-[var(--text-primary)] mb-12">
              CALCULATE <span className="text-[var(--acid)]">METRICS</span>
            </h1>
          </TextReveal>

          <form onSubmit={calculateBMI} className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] text-[var(--text-secondary)] uppercase tracking-widest">Height (cm)</label>
                <input required type="number" name="height" className="bg-[var(--surface)] border border-[var(--border)] p-4 font-mono text-[12px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--acid)] transition-colors" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] text-[var(--text-secondary)] uppercase tracking-widest">Weight (kg)</label>
                <input required type="number" name="weight" className="bg-[var(--surface)] border border-[var(--border)] p-4 font-mono text-[12px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--acid)] transition-colors" />
              </div>
            </div>
            
            <button className="bg-[var(--acid)] text-[#080808] font-mono text-[12px] font-bold uppercase tracking-widest py-5 mt-4 hover:bg-white transition-colors">
              EXECUTE CALCULATION →
            </button>
          </form>
        </div>

        {/* Right: Results Panel */}
        <div className="w-full lg:w-1/2 bg-[var(--surface)] border border-[var(--border)] p-8 lg:p-12 flex flex-col justify-center min-h-[400px]">
          {bmiData ? (
            <div className="flex flex-col animate-in fade-in zoom-in duration-500">
              <span className="font-mono text-[11px] text-[var(--text-muted)] tracking-widest uppercase mb-4">[DATA_PROCESSED]</span>
              <span className="font-bebas text-[120px] text-[var(--acid)] leading-none mb-2">{bmiData.score}</span>
              <span className="font-grotesk font-bold text-[24px] text-[var(--text-primary)] uppercase mb-12">{bmiData.category}</span>

              <div className="border-l-2 border-[var(--acid)] pl-6 mb-8">
                <h4 className="font-mono text-[11px] text-[var(--acid)] uppercase tracking-widest mb-2">KHAN&apos;S RECOMMENDATION</h4>
                <p className="font-inter text-[14px] text-[var(--text-secondary)] leading-relaxed">
                  {bmiData.recommendation}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center opacity-50">
              <Calculator className="w-12 h-12 text-[var(--text-muted)] mb-4" />
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
