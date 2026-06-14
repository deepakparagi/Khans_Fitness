'use client';

import { useState } from 'react';
import { TextReveal } from '@/components/ui/TextReveal';
import { MapPin, Phone, Mail, Clock, MessageCircle, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { BRAND } from '@/lib/constants';
import { generateWhatsAppLink } from '@/lib/utils';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const email = formData.get('email') as string;
    const goal = formData.get('goal') as string;
    const message = formData.get('message') as string;

    const text = `*New Form Submission - Khan's Fitness*%0A%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Email:* ${email || 'N/A'}%0A*Goal:* ${goal || 'N/A'}%0A*Message:* ${message || 'N/A'}`;
    
    window.open(`https://wa.me/919964591846?text=${text}`, '_blank');

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="w-full bg-[var(--bg)]">
      <section className="relative pt-[144px] pb-[100px] px-6 lg:px-12 2xl:px-24 w-full mx-auto h-[100svh] min-h-[100svh] flex flex-col justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/hero/804834.jpg"
            alt="Contact Us"
            fill
            className="object-cover opacity-30 grayscale transition-opacity duration-300"
            quality={90}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/50 to-transparent" />
        </div>
        
        {/* Header */}
        <div className="relative z-10 mb-16 flex flex-col items-center text-center">
          <div className="font-mono text-[11px] text-[var(--acid)] tracking-widest uppercase mb-8 border border-[var(--acid)] px-3 py-1 inline-block">
            [GET IN TOUCH]
          </div>
          <TextReveal stagger={0.15} className="items-center">
            <h1 className="font-bebas text-[clamp(36px,8vw,130px)] leading-[0.85] tracking-[-0.02em] uppercase flex flex-col items-center drop-shadow-2xl">
              <span className="text-[var(--text-primary)]">START YOUR</span>
              <span className="text-[var(--acid)]">JOURNEY</span>
            </h1>
          </TextReveal>
        </div>
      </section>

      {/* Content Section */}
      <section className="pb-[100px] px-6 lg:px-12 2xl:px-24 w-full mx-auto">
        {/* 2-Col Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* LEFT: Form */}
          <div className="flex flex-col">
            <h3 className="font-grotesk font-bold text-[22px] text-[var(--text-primary)] uppercase mb-8 border-b border-[var(--border)] pb-4">
              DATA TRANSMISSION
            </h3>

            {submitted ? (
              <div className="bg-[var(--surface)] border border-[var(--acid)] p-12 flex flex-col items-center text-center">
                <div className="font-mono text-[14px] text-[var(--acid)] uppercase mb-4 tracking-widest">
                  [DATA_RECEIVED]
                </div>
                <p className="font-inter text-[var(--text-secondary)]">
                  Channel open. Our team will initiate contact within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[10px] text-[var(--text-secondary)] uppercase tracking-widest">Name *</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      className="bg-[var(--surface)] border border-[var(--border)] p-4 font-mono text-[12px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--acid)] transition-colors"
                      placeholder="ENTER NAME"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[10px] text-[var(--text-secondary)] uppercase tracking-widest">Phone *</label>
                    <input 
                      type="tel" 
                      name="phone"
                      required
                      className="bg-[var(--surface)] border border-[var(--border)] p-4 font-mono text-[12px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--acid)] transition-colors"
                      placeholder="ENTER PHONE"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[10px] text-[var(--text-secondary)] uppercase tracking-widest">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    className="bg-[var(--surface)] border border-[var(--border)] p-4 font-mono text-[12px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--acid)] transition-colors"
                    placeholder="ENTER EMAIL"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[10px] text-[var(--text-secondary)] uppercase tracking-widest">Fitness Goal</label>
                  <select name="goal" className="bg-[var(--surface)] border border-[var(--border)] p-4 font-mono text-[12px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--acid)] transition-colors appearance-none">
                    <option value="">SELECT PROTOCOL</option>
                    <option value="Mass Reduction">Mass Reduction</option>
                    <option value="Hypertrophy">Hypertrophy</option>
                    <option value="Baseline Optimization">Baseline Optimization</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[10px] text-[var(--text-secondary)] uppercase tracking-widest">Message</label>
                  <textarea 
                    name="message"
                    rows={4}
                    className="bg-[var(--surface)] border border-[var(--border)] p-4 font-mono text-[12px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--acid)] transition-colors resize-none"
                    placeholder="ENTER MESSAGE (OPTIONAL)"
                  />
                </div>

                <button 
                  type="submit"
                  className="bg-[var(--acid)] text-[var(--bg)] font-mono text-[12px] font-bold uppercase tracking-widest py-5 mt-4 hover:bg-[var(--text-primary)] transition-colors flex items-center justify-center gap-2"
                >
                  SEND MESSAGE <ArrowUpRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          {/* RIGHT: Info Rows */}
          <div className="flex flex-col">
            
            {/* Header Image */}
            <div className="relative w-full h-[240px] mb-8">
              <Image 
                src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&q=80"
                alt="Gym Equipment"
                fill
                className="object-cover dark:grayscale-[20%] grayscale-0 transition-[filter] duration-300"
                quality={90}
              />
            </div>

            <h3 className="font-grotesk font-bold text-[22px] text-[var(--text-primary)] uppercase mb-8 border-b border-[var(--border)] pb-4">
              HQ LOGISTICS
            </h3>

            <div className="flex flex-col">
              
              {/* Row 1 */}
              <div className="group flex items-start gap-6 py-8 border-l border-[var(--border)] pl-8 hover:border-[var(--acid)] transition-colors">
                <MapPin className="w-6 h-6 text-[var(--acid)] shrink-0" />
                <div className="flex flex-col">
                  <span className="font-mono text-[11px] text-[var(--text-secondary)] uppercase tracking-widest mb-2">Visit Us</span>
                  <span className="font-inter text-[14px] text-[var(--text-primary)] leading-relaxed max-w-sm mb-3">{BRAND.address}</span>
                  <a href={BRAND.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] text-[var(--acid)] uppercase tracking-widest hover:text-[var(--text-primary)] transition-colors">
                    Get Directions →
                  </a>
                </div>
              </div>

              {/* Row 2 */}
              <div className="group flex items-start gap-6 py-8 border-l border-[var(--border)] pl-8 hover:border-[var(--acid)] transition-colors">
                <Phone className="w-6 h-6 text-[var(--acid)] shrink-0" />
                <div className="flex flex-col">
                  <span className="font-mono text-[11px] text-[var(--text-secondary)] uppercase tracking-widest mb-2">Call Us</span>
                  <span className="font-inter text-[14px] text-[var(--text-primary)] leading-relaxed mb-3">{BRAND.phone}</span>
                  <a href={`tel:${BRAND.phone}`} className="font-mono text-[10px] text-[var(--acid)] uppercase tracking-widest hover:text-[var(--text-primary)] transition-colors">
                    Call Now →
                  </a>
                </div>
              </div>

              {/* Row 3 */}
              <div className="group flex items-start gap-6 py-8 border-l border-[var(--border)] pl-8 hover:border-[var(--acid)] transition-colors">
                <Mail className="w-6 h-6 text-[var(--acid)] shrink-0" />
                <div className="flex flex-col">
                  <span className="font-mono text-[11px] text-[var(--text-secondary)] uppercase tracking-widest mb-2">Email Us</span>
                  <a href={`mailto:${BRAND.email}`} className="font-inter text-[14px] text-[var(--text-primary)] leading-relaxed hover:text-[var(--acid)] transition-colors">
                    {BRAND.email}
                  </a>
                </div>
              </div>

              {/* Row 4 */}
              <div className="group flex items-start gap-6 py-8 border-l border-[var(--border)] pl-8 hover:border-[var(--acid)] transition-colors">
                <Clock className="w-6 h-6 text-[var(--acid)] shrink-0" />
                <div className="flex flex-col">
                  <span className="font-mono text-[11px] text-[var(--text-secondary)] uppercase tracking-widest mb-2">Working Hours</span>
                  <span className="font-inter text-[14px] text-[var(--text-primary)] leading-relaxed">Mon-Sat: {BRAND.hours.weekday}</span>
                  <span className="font-inter text-[14px] text-[var(--text-secondary)]">Sunday: {BRAND.hours.sunday}</span>
                </div>
              </div>

              {/* Row 5 */}
              <div className="group flex items-start gap-6 py-8 border-l border-[var(--border)] pl-8 hover:border-[var(--acid)] transition-colors">
                <MessageCircle className="w-6 h-6 text-[var(--acid)] shrink-0" />
                <div className="flex flex-col">
                  <span className="font-mono text-[11px] text-[var(--text-secondary)] uppercase tracking-widest mb-2">WhatsApp</span>
                  <span className="font-inter text-[14px] text-[var(--text-primary)] leading-relaxed mb-3">Instant replies during working hours</span>
                  <a href={generateWhatsAppLink('Hello Khan\'s Fitness')} target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] text-[var(--acid)] uppercase tracking-widest hover:text-[var(--text-primary)] transition-colors">
                    Chat Now →
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
