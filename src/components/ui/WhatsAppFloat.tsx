'use client';

import { MessageCircle } from 'lucide-react';
import { generateWhatsAppLink } from '@/lib/utils';

export function WhatsAppFloat() {
  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <a
        href={generateWhatsAppLink("Hi, I'm interested in joining Khan's Fitness. Can you provide more details?")}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 bg-[var(--acid)] text-black hover:bg-white hover:scale-105 transition-all duration-300 shadow-2xl group"
        aria-label="Chat on WhatsApp"
        id="whatsapp-float-btn"
      >
        <MessageCircle className="w-7 h-7 group-hover:scale-110 transition-transform" />
        
        {/* Pulse ring */}
        <span className="absolute inset-0 border border-[var(--acid)] animate-ping opacity-20" />
      </a>
    </div>
  );
}
