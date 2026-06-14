'use client';

import { useState } from 'react';
import { TextReveal } from '@/components/ui/TextReveal';
import { UtensilsCrossed } from 'lucide-react';

type MealPlan = {
  title: string;
  meals: { name: string; food: string; macros: string; }[];
};

export default function DietPlannerPage() {
  const [generating, setGenerating] = useState(false);
  const [plan, setPlan] = useState<MealPlan | null>(null);

  const generatePlan = (e: React.FormEvent) => {
    e.preventDefault();
    setGenerating(true);
    
    setTimeout(() => {
      setPlan({
        title: "HYPERTROPHY MACRO-PLAN",
        meals: [
          { name: "MEAL 01: INITIATION", food: "6 Whole Eggs, 100g Oats, Black Coffee", macros: "P: 45g | C: 60g | F: 30g" },
          { name: "MEAL 02: PRE-TRAINING", food: "200g Chicken Breast, 200g White Rice", macros: "P: 50g | C: 60g | F: 5g" },
          { name: "MEAL 03: POST-TRAINING", food: "2 Scoops Whey, 1 Banana", macros: "P: 50g | C: 30g | F: 2g" },
          { name: "MEAL 04: RECOVERY", food: "200g Lean Beef, Sweet Potato", macros: "P: 45g | C: 40g | F: 15g" }
        ]
      });
      setGenerating(false);
    }, 2000);
  };

  return (
    <div className="w-full min-h-[100svh] bg-[var(--bg)]">
      <section className="pt-32 pb-24 lg:pt-48 px-6 lg:px-12 2xl:px-24 w-full mx-auto flex flex-col lg:flex-row gap-16">
        
        {/* Left: Form */}
        <div className="w-full lg:w-[40%] flex flex-col">
          <div className="flex items-center gap-2 font-mono text-[11px] text-[var(--acid)] tracking-widest uppercase mb-8 border border-[var(--acid)] px-3 py-1 w-max">
            <UtensilsCrossed className="w-4 h-4" />
            [NUTRITION_GEN]
          </div>
          <TextReveal>
            <h1 className="font-bebas text-[clamp(32px,6vw,80px)] leading-[0.85] tracking-[-0.02em] uppercase text-[var(--text-primary)] mb-12">
              GENERATE <span className="text-[var(--acid)]">DIET PLAN</span>
            </h1>
          </TextReveal>

          <form onSubmit={generatePlan} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] text-[var(--text-secondary)] uppercase tracking-widest">Primary Objective</label>
              <select className="bg-[var(--surface)] border border-[var(--border)] p-4 font-mono text-[12px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--acid)] transition-colors appearance-none">
                <option value="cut">Fat Loss (Deficit)</option>
                <option value="bulk">Muscle Gain (Surplus)</option>
                <option value="maintain">Maintenance</option>
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] text-[var(--text-secondary)] uppercase tracking-widest">Dietary Preference</label>
                <select className="bg-[var(--surface)] border border-[var(--border)] p-4 font-mono text-[12px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--acid)] transition-colors appearance-none">
                  <option value="standard">Standard/Omnivore</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="vegan">Vegan</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] text-[var(--text-secondary)] uppercase tracking-widest">Meals/Day</label>
                <select className="bg-[var(--surface)] border border-[var(--border)] p-4 font-mono text-[12px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--acid)] transition-colors appearance-none">
                  <option value="3">3 Meals</option>
                  <option value="4">4 Meals</option>
                  <option value="5">5 Meals</option>
                </select>
              </div>
            </div>
            
            <button disabled={generating} className="bg-[var(--acid)] text-[#080808] font-mono text-[12px] font-bold uppercase tracking-widest py-5 mt-4 hover:bg-white transition-colors disabled:opacity-50">
              {generating ? '[CALCULATING_MACROS...]' : 'GENERATE PROTOCOL →'}
            </button>
          </form>
        </div>

        {/* Right: Results Panel */}
        <div className="w-full lg:w-[60%] border border-[var(--border)] bg-[var(--bg)] p-8 lg:p-12 min-h-[500px]">
          {generating ? (
            <div className="h-full flex flex-col items-center justify-center">
              <div className="font-mono text-[var(--acid)] tracking-widest animate-pulse">[PROCESSING_NUTRITIONAL_DATA]</div>
            </div>
          ) : plan ? (
            <div className="animate-in fade-in duration-500">
              <div className="font-mono text-[11px] text-[var(--text-muted)] tracking-widest uppercase mb-4">[PROTOCOL_READY]</div>
              <h2 className="font-bebas text-[48px] text-[var(--text-primary)] uppercase leading-none mb-8">{plan.title}</h2>
              
              <div className="flex flex-col gap-4">
                {plan.meals.map((meal: { name: string; food: string; macros: string }, i: number) => (
                  <div key={i} className="flex flex-col border border-[var(--border)] bg-[var(--surface)] p-5">
                    <span className="font-mono text-[11px] text-[var(--acid)] tracking-widest mb-2">{meal.name}</span>
                    <span className="font-inter text-[15px] text-[var(--text-primary)] mb-4">{meal.food}</span>
                    <span className="font-mono text-[10px] text-[var(--text-secondary)] border-t border-[var(--border)] pt-3 mt-auto">
                      {meal.macros}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
             <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
              <UtensilsCrossed className="w-12 h-12 text-[var(--text-muted)] mb-4" />
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
