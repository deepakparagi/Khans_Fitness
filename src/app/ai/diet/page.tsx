'use client';

import { useState } from 'react';
import { TextReveal } from '@/components/ui/TextReveal';
import { UtensilsCrossed } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { generateAIResponse } from '@/app/actions/ai';

type MealPlan = {
  title: string;
  meals: { name: string; food: string; macros: string; }[];
};

export default function DietPlannerPage() {
  const [generating, setGenerating] = useState(false);
  const [plan, setPlan] = useState<MealPlan | null>(null);

  const generatePlan = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const objective = formData.get('objective') as string;
    const preference = formData.get('preference') as string;
    const mealsDay = formData.get('mealsDay') as string;
    
    setGenerating(true);
    
    try {
      const systemPrompt = `You are an elite, brutalist AI fitness nutrition coach. Generate a highly optimized diet plan.
CRITICAL: You MUST respond ONLY with a raw JSON object. Do not include markdown formatting, backticks (\`\`\`), or any explanations.
JSON Format required:
{
  "title": "PROTOCOL TITLE (e.g. HYPERTROPHY PROTOCOL)",
  "meals": [
    { "name": "MEAL 01: NAME", "food": "comma separated specific foods", "macros": "P: Xg | C: Yg | F: Zg" }
  ]
}
The number of meals in the array MUST exactly match the user's requested meals per day.`;

      const userPrompt = `Objective: ${objective}. Dietary Preference: ${preference}. Meals per day: ${mealsDay}. Calculate and return the JSON protocol.`;
      
      const response = await generateAIResponse(userPrompt, systemPrompt);
      
      // Attempt to clean any potential markdown fences just in case
      const cleanResponse = response.replace(/```json/i, '').replace(/```/g, '').trim();
      const parsedPlan = JSON.parse(cleanResponse);
      setPlan(parsedPlan);
    } catch (error) {
      console.error(error);
      setPlan({
        title: "SYSTEM ERROR",
        meals: [
          { name: "ERROR", food: "Connection to Nutrition API failed or returned invalid data format.", macros: "P: 0g | C: 0g | F: 0g" }
        ]
      });
    } finally {
      setGenerating(false);
    }
  };

  const downloadPlan = () => {
    if (!plan) return;
    
    const doc = new jsPDF();
    
    doc.setFont("courier", "bold");
    doc.setFontSize(22);
    doc.text("KHAN'S FITNESS AI PROTOCOL", 20, 30);
    
    doc.setFont("courier", "normal");
    doc.setFontSize(14);
    doc.text(`PROTOCOL: ${plan.title}`, 20, 50);
    
    let yPos = 70;
    
    plan.meals.forEach(meal => {
      if (yPos > 260) {
        doc.addPage();
        yPos = 30;
      }
      
      doc.setFont("courier", "bold");
      doc.setFontSize(12);
      doc.text(meal.name, 20, yPos);
      yPos += 8;
      
      doc.setFont("courier", "normal");
      doc.text(`FOOD: ${meal.food}`, 20, yPos);
      yPos += 8;
      
      doc.setFont("courier", "normal");
      doc.setTextColor(100, 100, 100);
      doc.text(`MACROS: ${meal.macros}`, 20, yPos);
      doc.setTextColor(0, 0, 0);
      yPos += 15;
    });
    
    doc.setFont("courier", "bold");
    doc.text("EXECUTE PROTOCOL IMMEDIATELY.", 20, yPos + 10);

    doc.save(`KHAN_FITNESS_${plan.title.replace(/\s+/g, '_')}.pdf`);
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
              <select name="objective" className="bg-[var(--surface)] border border-[var(--border)] p-4 font-mono text-[12px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--acid)] transition-colors appearance-none">
                <option value="Fat Loss (Deficit)">Fat Loss (Deficit)</option>
                <option value="Muscle Gain (Surplus)">Muscle Gain (Surplus)</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] text-[var(--text-secondary)] uppercase tracking-widest">Dietary Preference</label>
                <select name="preference" className="bg-[var(--surface)] border border-[var(--border)] p-4 font-mono text-[12px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--acid)] transition-colors appearance-none">
                  <option value="Standard/Omnivore">Standard/Omnivore</option>
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Vegan">Vegan</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] text-[var(--text-secondary)] uppercase tracking-widest">Meals/Day</label>
                <select name="mealsDay" className="bg-[var(--surface)] border border-[var(--border)] p-4 font-mono text-[12px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--acid)] transition-colors appearance-none">
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
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <h2 className="font-bebas text-[48px] text-[var(--text-primary)] uppercase leading-none">{plan.title}</h2>
                <button 
                  onClick={downloadPlan}
                  className="font-mono text-[10px] text-[var(--bg)] bg-[var(--text-primary)] px-4 py-2 uppercase tracking-widest hover:bg-[var(--acid)] transition-colors shrink-0"
                >
                  DOWNLOAD PDF ↓
                </button>
              </div>
              
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
