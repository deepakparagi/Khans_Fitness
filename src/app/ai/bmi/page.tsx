'use client';

import { useState } from 'react';
import { TextReveal } from '@/components/ui/TextReveal';
import { Calculator } from 'lucide-react';

interface BMIResult {
  bmi: number;
  bmr: number;
  tdee: number;
  idealMin: number;
  idealMax: number;
  category: 'UNDERWEIGHT' | 'OPTIMAL' | 'OVERWEIGHT' | 'OBESE';
  color: string;
  recommendation: string;
}

export default function BMIPage() {
  const [bmiData, setBmiData] = useState<BMIResult | null>(null);

  const calculateBMI = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const heightCm = Number(formData.get('height'));
    const weightKg = Number(formData.get('weight'));
    const age = Number(formData.get('age'));
    const gender = formData.get('gender') as 'male' | 'female';
    const activity = formData.get('activity') as 'sedentary' | 'light' | 'moderate' | 'active' | 'veryActive';

    if (heightCm > 0 && weightKg > 0 && age > 0) {
      const heightM = heightCm / 100;
      const bmi = weightKg / (heightM * heightM);
      
      // Mifflin-St Jeor BMR
      const bmr = gender === 'male'
        ? (10 * weightKg) + (6.25 * heightCm) - (5 * age) + 5
        : (10 * weightKg) + (6.25 * heightCm) - (5 * age) - 161;

      const activityMultipliers = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        active: 1.725,
        veryActive: 1.9,
      };

      const tdee = bmr * activityMultipliers[activity];
      const idealMin = Math.round(18.5 * (heightM * heightM));
      const idealMax = Math.round(24.9 * (heightM * heightM));

      let category: 'UNDERWEIGHT' | 'OPTIMAL' | 'OVERWEIGHT' | 'OBESE' = 'OPTIMAL';
      let color = '#CCFF00'; // var(--acid)
      let recommendation = '';

      if (bmi < 18.5) {
        category = 'UNDERWEIGHT';
        color = '#4FC3F7';
        recommendation = "Caloric surplus protocol required. Target +300-500 kcal above TDEE. Prioritize compound lifts 4x/week with Khan Sir's strength program.";
      } else if (bmi >= 18.5 && bmi < 25) {
        category = 'OPTIMAL';
        color = 'var(--acid)';
        recommendation = "You're in the performance zone. Maintain with TDEE calories. Focus on body recomposition — build muscle while staying lean.";
      } else if (bmi >= 25 && bmi < 30) {
        category = 'OVERWEIGHT';
        color = '#FFC107';
        recommendation = `Implement a 400-500 kcal daily deficit from your TDEE of ${Math.round(tdee)} kcal. 4-5 cardio sessions/week + strength training. Results in 12-16 weeks.`;
      } else {
        category = 'OBESE';
        color = '#FF2D2D';
        recommendation = "Critical intervention required. Begin with 3x/week low-impact cardio. Create 500 kcal deficit. Book a free trial with Khan Sir immediately.";
      }

      setBmiData({
        bmi: Number(bmi.toFixed(1)),
        bmr: Math.round(bmr),
        tdee: Math.round(tdee),
        idealMin,
        idealMax,
        category,
        color,
        recommendation,
      });
    }
  };

  // Map BMI value to pointer position (range 15 to 40)
  const getPointerPercentage = (bmiVal: number) => {
    const minBmi = 15;
    const maxBmi = 40;
    const pct = ((bmiVal - minBmi) / (maxBmi - minBmi)) * 100;
    return Math.min(100, Math.max(0, pct));
  };

  return (
    <div className="w-full min-h-[100svh] bg-[var(--bg)]">
      <section className="pt-32 pb-24 lg:pt-48 px-6 lg:px-12 2xl:px-24 w-full mx-auto flex flex-col lg:flex-row gap-16">
        
        {/* Left: Form */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <div className="flex items-center gap-2 font-mono text-[11px] text-[var(--acid)] tracking-widest uppercase mb-8 border border-[var(--acid-border)] bg-[var(--acid-dim)] px-3 py-1 w-max">
            <Calculator className="w-4 h-4" />
            [BMI_MODULE]
          </div>
          <TextReveal>
            <h1 className="font-bebas text-[clamp(32px,7vw,90px)] leading-[0.85] tracking-[-0.02em] uppercase text-[var(--text-primary)] mb-12">
              CALCULATE <span className="text-[var(--acid)]">METRICS</span>
            </h1>
          </TextReveal>

          <form onSubmit={calculateBMI} className="flex flex-col gap-6">
            {/* Gender Selection */}
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] text-[var(--text-secondary)] uppercase tracking-widest">Gender</label>
              <div className="flex gap-6 mt-1">
                <label className="flex items-center gap-2 font-mono text-[12px] text-[var(--text-primary)] cursor-pointer">
                  <input type="radio" name="gender" value="male" defaultChecked className="accent-[var(--acid)]" />
                  MALE
                </label>
                <label className="flex items-center gap-2 font-mono text-[12px] text-[var(--text-primary)] cursor-pointer">
                  <input type="radio" name="gender" value="female" className="accent-[var(--acid)]" />
                  FEMALE
                </label>
              </div>
            </div>

            {/* Height & Weight */}
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] text-[var(--text-secondary)] uppercase tracking-widest">Height (cm)</label>
                <input required type="number" name="height" placeholder="175" className="bg-[var(--surface)] border border-[var(--border)] p-4 font-mono text-[12px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--acid)] transition-colors" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] text-[var(--text-secondary)] uppercase tracking-widest">Weight (kg)</label>
                <input required type="number" name="weight" placeholder="70" className="bg-[var(--surface)] border border-[var(--border)] p-4 font-mono text-[12px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--acid)] transition-colors" />
              </div>
            </div>

            {/* Age & Activity Level */}
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] text-[var(--text-secondary)] uppercase tracking-widest">Age (years)</label>
                <input required type="number" name="age" min="10" max="100" defaultValue="25" placeholder="25" className="bg-[var(--surface)] border border-[var(--border)] p-4 font-mono text-[12px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--acid)] transition-colors" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] text-[var(--text-secondary)] uppercase tracking-widest">Activity Level</label>
                <div className="relative">
                  <select name="activity" defaultValue="moderate" className="w-full bg-[var(--surface)] border border-[var(--border)] p-4 font-mono text-[12px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--acid)] transition-colors appearance-none">
                    <option value="sedentary">Sedentary (desk job, no exercise)</option>
                    <option value="light">Lightly Active (1-3 days/week)</option>
                    <option value="moderate">Moderately Active (3-5 days/week)</option>
                    <option value="active">Very Active (6-7 days/week)</option>
                    <option value="veryActive">Extra Active (physical job + gym)</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-[var(--text-secondary)]">▼</div>
                </div>
              </div>
            </div>
            
            <button className="bg-[var(--acid)] text-[var(--bg)] font-mono text-[12px] font-bold uppercase tracking-widest py-5 mt-4 hover:bg-[var(--text-primary)] hover:text-[var(--bg)] transition-colors">
              EXECUTE CALCULATION →
            </button>
          </form>
        </div>

        {/* Right: Results Panel */}
        <div className="w-full lg:w-1/2 bg-[var(--surface)] border border-[var(--border)] p-8 lg:p-12 flex flex-col justify-center min-h-[400px]">
          {bmiData ? (
            <div className="flex flex-col animate-in fade-in zoom-in duration-500">
              <span className="font-mono text-[11px] text-[var(--text-muted)] tracking-widest uppercase mb-4">[DATA_PROCESSED]</span>
              
              {/* BMI Output */}
              <span 
                className="font-bebas text-[96px] leading-none mb-2"
                style={{ color: bmiData.color }}
              >
                {bmiData.bmi}
              </span>
              <span 
                className="font-grotesk font-bold text-[24px] uppercase mb-8"
                style={{ color: bmiData.color }}
              >
                {bmiData.category}
              </span>

              {/* Visual Gradient Bar with pointer */}
              <div className="relative w-full h-4 mb-3 border border-[var(--border)]" style={{ background: 'linear-gradient(to right, #4FC3F7, #CCFF00, #FFC107, #FF2D2D)' }}>
                <div 
                  className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-black transition-all duration-500 shadow-lg"
                  style={{ left: `calc(${getPointerPercentage(bmiData.bmi)}% - 8px)` }}
                />
              </div>

              {/* Bar labels */}
              <div className="relative w-full h-6 mb-8 font-mono text-[9px] text-[var(--text-secondary)]">
                <span className="absolute left-0">15.0</span>
                <span className="absolute" style={{ left: '14%', transform: 'translateX(-50%)' }}>18.5</span>
                <span className="absolute" style={{ left: '40%', transform: 'translateX(-50%)' }}>25.0</span>
                <span className="absolute" style={{ left: '60%', transform: 'translateX(-50%)' }}>30.0</span>
                <span className="absolute right-0">40.0</span>
              </div>

              {/* 3-Column Metrics Row */}
              <div className="grid grid-cols-3 gap-4 border-y border-[var(--border)] py-6 mb-8 text-left">
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase mb-1">BMR</span>
                  <span className="font-mono text-[13px] text-[var(--acid)] font-bold">{bmiData.bmr} kcal/day</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase mb-1">TDEE</span>
                  <span className="font-mono text-[13px] text-[var(--text-primary)] font-bold">{bmiData.tdee} kcal/day</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase mb-1">Ideal Weight</span>
                  <span className="font-mono text-[13px] text-[var(--text-primary)] font-bold">{bmiData.idealMin}–{bmiData.idealMax} kg</span>
                </div>
              </div>

              {/* Recommendation Block */}
              <div className="border-l-2 border-[var(--acid)] pl-5">
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
