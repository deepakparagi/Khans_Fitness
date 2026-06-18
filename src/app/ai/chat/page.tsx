'use client';

import { useState, useRef, useEffect } from 'react';
import { TextReveal } from '@/components/ui/TextReveal';
import { Terminal, ArrowUpRight } from 'lucide-react';
import { generateAIResponse } from '@/app/actions/ai';

export default function ChatPage() {
  const [messages, setMessages] = useState<{role: 'user'|'system', content: string}[]>([
    { role: 'system', content: 'KHAN_AI INITIALIZED. STATE YOUR OBJECTIVE.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    
    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setLoading(true);
    
    // Instant client-side check for simple greetings to guide user metrics
    const isGreeting = /^(hi|hello|hey|yo|greetings|start|hola|sup|chat|assistant|objective)(\s|[!.]|$)/i.test(userMessage);

    if (isGreeting) {
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          role: 'system', 
          content: 'ACKNOWLEDGED. PROVIDE YOUR CURRENT WEIGHT, HEIGHT, AND FITNESS GOAL. SPECIFY EXACT METRIC.'
        }]);
        setLoading(false);
      }, 500);
      return;
    }
    
    try {
      const systemPrompt = "You are the 'Khan Fitness System Interface', a highly advanced, brutalist, no-nonsense AI fitness coach. You give direct, data-driven, and highly optimized fitness advice. Do not use pleasantries. Keep your responses incredibly concise. Use uppercase for emphasis. Sound like a futuristic military/fitness AI. CRITICAL: DO NOT use any markdown formatting, asterisks (*), hashtags (#), or any other special formatting characters. Format your response as plain text using standard line breaks, dashes (-), or uppercase text for structure. RULE: IF THE USER HAS NOT YET SPECIFIED THEIR CURRENT WEIGHT, HEIGHT, AND FITNESS GOAL, YOU MUST NOT ANSWER ANY DETAILED QUESTIONS OR DESIGN PROGRAMS. INSTEAD, DEMAND THAT THEY PROVIDE THEIR WEIGHT, HEIGHT, AND FITNESS GOAL BEFORE PROCEEDING.";
      
      // Construct prompt with context history
      const historyContext = messages
        .map(msg => `${msg.role === 'user' ? 'USER' : 'SYSTEM'}: ${msg.content}`)
        .join('\n');
      const fullPrompt = `${historyContext}\nUSER: ${userMessage}`;

      const response = await generateAIResponse(fullPrompt, systemPrompt);
      
      setMessages(prev => [...prev, { 
        role: 'system', 
        content: response || 'TRANSMISSION ERROR. NO DATA RECEIVED.' 
      }]);
    } catch {
      setMessages(prev => [...prev, { 
        role: 'system', 
        content: 'SYSTEM FAILURE. API CONNECTION REFUSED OR INVALID KEY.' 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[100svh] bg-[var(--bg)] flex flex-col">
      <section className="pt-32 pb-12 px-6 lg:px-12 2xl:px-24 max-w-[1000px] mx-auto w-full flex-1 flex flex-col">
        
        {/* Header */}
        <div className="mb-12 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 font-mono text-[11px] text-[var(--acid)] tracking-widest uppercase mb-4 border border-[var(--acid)] px-3 py-1 inline-block">
            <Terminal className="w-4 h-4" />
            [AI_COACH]
          </div>
          <TextReveal>
            <h1 className="font-bebas text-[clamp(28px,6vw,70px)] leading-[0.85] tracking-[-0.02em] uppercase text-[var(--text-primary)]">
              SYSTEM <span className="text-[var(--acid)]">UPLINK</span>
            </h1>
          </TextReveal>
        </div>

        {/* Chat Window */}
        <div className="flex-1 border border-[var(--border)] bg-[var(--bg)] flex flex-col overflow-hidden min-h-[400px]">
          
          {/* Messages */}
          <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-6">
            {messages.map((msg, i) => (
              <div key={i} className={`flex flex-col max-w-[80%] ${msg.role === 'user' ? 'self-end items-end' : 'self-start items-start'}`}>
                <span className="font-mono text-[10px] text-[var(--text-muted)] mb-1 tracking-widest">
                  {msg.role === 'user' ? '[USER]' : '[SYSTEM]'}
                </span>
                <div className={`p-4 font-mono text-[12px] leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user' 
                    ? 'bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)]' 
                    : 'bg-[var(--acid)] text-black font-bold uppercase'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} className="border-t border-[var(--border)] bg-[var(--surface)] p-4 flex gap-4">
            <input 
              type="text" 
              value={input}
              onChange={e => setInput(e.target.value)}
              disabled={loading}
              className="flex-1 bg-transparent border-b border-[var(--border)] focus:border-[var(--acid)] font-mono text-[12px] text-[var(--text-primary)] px-2 py-3 focus:outline-none transition-colors disabled:opacity-50"
              placeholder={loading ? "PROCESSING..." : "ENTER DIRECTIVE..."}
            />
            <button 
              type="submit"
              disabled={loading}
              className="bg-[var(--acid)] text-black px-6 flex items-center justify-center hover:bg-white transition-colors disabled:opacity-50"
            >
              <ArrowUpRight className="w-5 h-5" />
            </button>
          </form>

        </div>

      </section>
    </div>
  );
}
