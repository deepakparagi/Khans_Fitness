'use client';

import { useState } from 'react';
import { TextReveal } from '@/components/ui/TextReveal';
import { Dumbbell, Cpu } from 'lucide-react';
import { generateAIResponse } from '@/app/actions/ai';

type WorkoutPlan = {
  title: string;
  days: {
    day: string;
    name: string;
    focus: string;
    exercises: { name: string; sets: string; }[];
  }[];
};

export default function WorkoutGeneratorPage() {
  const [generating, setGenerating] = useState(false);
  const [plan, setPlan] = useState<WorkoutPlan | null>(null);

  const generatePlan = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setGenerating(true);
    setPlan(null);
    
    const formData = new FormData(e.currentTarget);
    const goal = formData.get('goal') as string;
    const level = formData.get('level') as string;
    const days = formData.get('days') as string;

    const systemPrompt = `You are the Khan Fitness AI Protocol Generator. Create a brutalist, highly effective workout plan.
You must output ONLY valid JSON, with no markdown formatting or backticks around it. The JSON must perfectly match this structure:
{
  "title": "A cool brutalist title for the plan",
  "days": [
    {
      "day": 1,
      "name": "Name of workout day",
      "focus": "Main muscle group",
      "exercises": [
        { "name": "Exercise name", "sets": "Sets x Reps" }
      ]
    }
  ]
}
Generate exactly ${days} days of workouts. Tailor the exercises to a ${level} level focused on ${goal}.`;

    try {
      const response = await generateAIResponse(`Generate a ${days}-day ${level} ${goal} protocol.`, systemPrompt);
      const jsonStr = response.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsedPlan = JSON.parse(jsonStr);
      setPlan(parsedPlan);
    } catch (error) {
      console.error('Failed to generate plan:', error);
      setPlan({
        title: "SYSTEM ERROR",
        days: [{ day: "1", name: "API CONNECTION FAILED", focus: "Error", exercises: [{name: "Check API Key", sets: "0x0"}] }]
      });
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="w-full min-h-[100svh] bg-[var(--bg)]">
      <section className="pt-32 pb-24 lg:pt-48 px-6 lg:px-12 2xl:px-24 w-full mx-auto flex flex-col lg:flex-row gap-16">
        
        {/* Left: Form */}
        <div className="w-full lg:w-[40%] flex flex-col">
          <div className="flex items-center gap-2 font-mono text-[11px] text-[var(--acid)] tracking-widest uppercase mb-8 border border-[var(--acid)] px-3 py-1 w-max">
            <Cpu className="w-4 h-4" />
            [WORKOUT_GEN]
          </div>
          <TextReveal>
            <h1 className="font-bebas text-[clamp(32px,6vw,80px)] leading-[0.85] tracking-[-0.02em] uppercase text-[var(--text-primary)] mb-12">
              GENERATE <span className="text-[var(--acid)]">PROTOCOL</span>
            </h1>
          </TextReveal>

          <form onSubmit={generatePlan} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] text-[var(--text-secondary)] uppercase tracking-widest">Goal</label>
              <select name="goal" className="bg-[var(--surface)] border border-[var(--border)] p-4 font-mono text-[12px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--acid)] transition-colors appearance-none">
                <option value="strength">Maximum Strength</option>
                <option value="hypertrophy">Hypertrophy (Muscle Gain)</option>
                <option value="fatloss">Fat Loss</option>
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] text-[var(--text-secondary)] uppercase tracking-widest">Level</label>
                <select name="level" className="bg-[var(--surface)] border border-[var(--border)] p-4 font-mono text-[12px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--acid)] transition-colors appearance-none">
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] text-[var(--text-secondary)] uppercase tracking-widest">Days/Week</label>
                <select name="days" className="bg-[var(--surface)] border border-[var(--border)] p-4 font-mono text-[12px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--acid)] transition-colors appearance-none">
                  <option value="3">3 Days</option>
                  <option value="4">4 Days</option>
                  <option value="5">5 Days</option>
                </select>
              </div>
            </div>
            
            <button disabled={generating} className="bg-[var(--acid)] text-[var(--bg)] font-mono text-[12px] font-bold uppercase tracking-widest py-5 mt-4 hover:bg-white transition-colors disabled:opacity-50">
              {generating ? '[GENERATING_PROTOCOL...]' : 'GENERATE WORKOUT →'}
            </button>
          </form>
        </div>

        {/* Right: Results Panel */}
        <div className="w-full lg:w-[60%] border border-[var(--border)] bg-[var(--bg)] p-8 lg:p-12 min-h-[500px]">
          {generating ? (
            <div className="h-full flex flex-col items-center justify-center">
              <div className="font-mono text-[var(--acid)] tracking-widest animate-pulse">[PROCESSING_BIOMETRICS]</div>
            </div>
          ) : plan ? (
            <div className="animate-in fade-in duration-500">
              <div className="font-mono text-[11px] text-[var(--text-muted)] tracking-widest uppercase mb-4">[PROTOCOL_READY]</div>
              <h2 className="font-bebas text-[48px] text-[var(--text-primary)] uppercase leading-none mb-8">{plan.title}</h2>
              
              <div className="flex flex-col border-t border-[var(--border)]">
                {plan.days.map((day, i) => (
                  <div key={i} className="py-6 border-b border-[var(--border)] group">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-[11px] text-[var(--acid)]">DAY {day.day}</span>
                        <span className="font-grotesk font-bold text-[18px] text-[var(--text-primary)] uppercase">{day.name}</span>
                      </div>
                      <span className="font-mono text-[10px] text-[var(--text-secondary)] border border-[var(--border)] px-2 py-1">{day.focus}</span>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {day.exercises.map((ex, j) => (
                        <div key={j} className="flex justify-between items-center bg-[var(--surface)] p-3 border border-[var(--border)]">
                          <span className="font-inter text-[13px] text-[#CCC]">{ex.name}</span>
                          <span className="font-mono text-[11px] text-[var(--acid)]">{ex.sets}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
             <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
              <Dumbbell className="w-12 h-12 text-[var(--text-muted)] mb-4" />
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
