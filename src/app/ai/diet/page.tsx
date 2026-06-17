'use client';

import { useState } from 'react';
import { TextReveal } from '@/components/ui/TextReveal';
import { UtensilsCrossed } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { generateAIResponse } from '@/app/actions/ai';
import { safeParseJSON } from '@/lib/utils';

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
    const gender = formData.get('gender') as string;
    const age = formData.get('age') as string;
    const height = formData.get('height') as string;
    const weight = formData.get('weight') as string;
    const activity = formData.get('activity') as string;
    const allergies = (formData.get('allergies') as string) || 'None';
    
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

      const userPrompt = `Biometric Profile:
- Gender: ${gender}
- Age: ${age} years old
- Height: ${height} cm
- Weight: ${weight} kg
- Activity Level: ${activity}
- Allergies/Exclusions: ${allergies}

Nutritional Requirements:
- Primary Objective: ${objective}
- Dietary Preference: ${preference}
- Meals per Day: ${mealsDay}

Calculate and return the JSON protocol.`;
      
      const response = await generateAIResponse(userPrompt, systemPrompt);
      const parsedPlan = safeParseJSON(response);
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
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Dark Header
    doc.setFillColor(15, 15, 15);
    doc.rect(0, 0, pageWidth, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.text("KHAN'S FITNESS", 20, 22);
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("NUTRITIONAL PROTOCOL // AI GENERATED", 20, 32);
    
    // Title
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text(plan.title.toUpperCase(), 20, 60);
    
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 65, pageWidth - 20, 65);
    
    let yPos = 80;
    
    plan.meals.forEach((meal) => {
      // Clean spacing issues from AI
      const cleanFood = meal.food.replace(/\s+/g, ' ').trim();
      
      // Auto-wrap text
      const splitFood = doc.splitTextToSize(cleanFood, pageWidth - 40);
      const mealHeight = 20 + (splitFood.length * 6);
      
      if (yPos + mealHeight > 280) {
        doc.addPage();
        yPos = 30;
      }
      
      // Meal Name (Left)
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(meal.name.toUpperCase(), 20, yPos);
      
      // Macros (Right Aligned)
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(120, 120, 120);
      doc.text(meal.macros, pageWidth - 20, yPos, { align: "right" });
      
      yPos += 8;
      
      // Food Items (Wrapped)
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.setTextColor(40, 40, 40);
      doc.text(splitFood, 20, yPos);
      
      yPos += (splitFood.length * 6) + 10;
      
      // Separator
      doc.setDrawColor(230, 230, 230);
      doc.line(20, yPos, pageWidth - 20, yPos);
      yPos += 10;
    });
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text("EXECUTE PROTOCOL IMMEDIATELY.", 20, yPos + 10);
    
    // Footer with Page Numbers
    const pageCount = (doc as any).internal.getNumberOfPages();
    for(let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text(`[ KHAN'S FITNESS SYSTEM ] - PAGE ${i} OF ${pageCount}`, pageWidth / 2, 290, { align: 'center' });
    }

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
                <label className="font-mono text-[10px] text-[var(--text-secondary)] uppercase tracking-widest">Gender</label>
                <select name="gender" className="bg-[var(--surface)] border border-[var(--border)] p-4 font-mono text-[12px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--acid)] transition-colors appearance-none">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] text-[var(--text-secondary)] uppercase tracking-widest">Age (years)</label>
                <input required type="number" name="age" min="10" max="100" defaultValue="25" placeholder="25" className="bg-[var(--surface)] border border-[var(--border)] p-4 font-mono text-[12px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--acid)] transition-colors" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] text-[var(--text-secondary)] uppercase tracking-widest">Height (cm)</label>
                <input required type="number" name="height" placeholder="175" defaultValue="175" className="bg-[var(--surface)] border border-[var(--border)] p-4 font-mono text-[12px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--acid)] transition-colors" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] text-[var(--text-secondary)] uppercase tracking-widest">Weight (kg)</label>
                <input required type="number" name="weight" placeholder="70" defaultValue="70" className="bg-[var(--surface)] border border-[var(--border)] p-4 font-mono text-[12px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--acid)] transition-colors" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] text-[var(--text-secondary)] uppercase tracking-widest">Activity Level</label>
                <select name="activity" defaultValue="moderate" className="bg-[var(--surface)] border border-[var(--border)] p-4 font-mono text-[12px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--acid)] transition-colors appearance-none text-left w-full">
                  <option value="sedentary">Sedentary (desk job)</option>
                  <option value="light">Lightly Active</option>
                  <option value="moderate">Moderately Active</option>
                  <option value="active">Very Active</option>
                  <option value="veryActive">Extra Active</option>
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
                <label className="font-mono text-[10px] text-[var(--text-secondary)] uppercase tracking-widest">Allergies / Exclusions</label>
                <input type="text" name="allergies" placeholder="e.g. Peanut, Lactose (or None)" className="bg-[var(--surface)] border border-[var(--border)] p-4 font-mono text-[12px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--acid)] transition-colors" />
              </div>
            </div>
            
            <button disabled={generating} className="bg-[var(--acid)] text-[var(--bg)] font-mono text-[12px] font-bold uppercase tracking-widest py-5 mt-4 hover:bg-white transition-colors disabled:opacity-50">
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
