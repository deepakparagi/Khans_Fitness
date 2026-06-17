import { TextReveal } from '@/components/ui/TextReveal';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ParallaxImage } from '@/components/ui/ParallaxImage';
import { PremiumCard } from '@/components/ui/PremiumCard';
import { Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const PLANS = [
  {
    id: 'weight-loss',
    name: 'Weight Loss Training',
    features: [
      'Expert trainer guidance',
      'Weight loss focused workouts',
      'Cardio training',
      'Strength conditioning',
      'Progress tracking',
      'Gym access',
    ],
    pricing: [
      { label: 'New Admission', price: 1800 },
      { label: 'Monthly', price: 1600 },
      { label: '3 Months', price: 4500 },
    ],
    badge: 'Most Popular',
    featured: true,
  },
  {
    id: 'weight-gain',
    name: 'Weight Gain Training',
    features: [
      'Muscle building programs',
      'Strength training',
      'Personalized workout guidance',
      'Progressive overload training',
      'Gym access',
      'Trainer support',
    ],
    pricing: [
      { label: 'New Admission', price: 1200 },
      { label: 'Monthly', price: 1100 },
      { label: '3 Months', price: 3000 },
    ],
    badge: null,
    featured: false,
  },
];

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Membership Plans | Khan's Fitness Gadag",
  description: "Explore our membership tiers. From monthly to annual plans, select the protocol that fits your performance goals. Couple packages available.",
};

export default function PlansPage() {
  return (
    <div className="w-full bg-[var(--bg)]">
      
      <section className="relative mt-[64px] pt-[80px] pb-[100px] px-6 lg:px-12 2xl:px-24 w-full mx-auto h-[calc(100svh-64px)] min-h-[calc(100svh-64px)] flex flex-col justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <ParallaxImage speed={0.12} className="w-full h-[120%] -top-[10%]">
            <Image 
              src="/images/hero/3139894.jpg"
              alt="Plans & Pricing"
              fill
              className="object-cover grayscale transition-opacity duration-300 hero-bg-image"
              quality={90}
              priority
            />
          </ParallaxImage>
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/50 to-transparent" />
        </div>
        
        {/* Header */}
        <div className="relative z-10 mb-16 flex flex-col items-center text-center">
          <div className="font-mono text-[11px] text-[var(--acid)] tracking-widest uppercase mb-8 border border-[var(--acid-border)] bg-[var(--acid-dim)] px-3 py-1 inline-block">
            [SYS_INF: MEMBERSHIP_TIERS]
          </div>
          <TextReveal stagger={0.15} className="items-center">
            <h1 className="font-bebas text-[clamp(36px,8vw,130px)] leading-[0.85] tracking-[-0.02em] uppercase flex flex-col items-center drop-shadow-2xl">
              <span className="text-[var(--text-primary)]">SELECT YOUR</span>
              <span className="text-[var(--acid)]">PROTOCOL</span>
            </h1>
          </TextReveal>
          <ScrollReveal delay={0.4}>
            <p className="font-inter text-[16px] text-[var(--text-secondary)] mt-8 max-w-2xl leading-relaxed">
              Choose the protocol that fits your performance goals. Every tier includes full access to our facility and the AI fitness optimization network. Couple memberships available — ask at the desk.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Content Section */}
      <section className="pb-[100px] px-6 lg:px-12 2xl:px-24 w-full mx-auto">
        {/* Banner Image */}
        <div className="relative w-full h-[200px] mb-16 flex items-center justify-center">
          <Image 
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&q=80"
            alt="Advanced Fitness Facility"
            fill
            className="object-cover brightness-[0.35] transition-[filter] duration-300"
            quality={90}
          />
          <span className="relative z-10 font-mono text-[13px] text-[var(--acid)] tracking-[4px] uppercase text-center px-4">
            GADAG&apos;S MOST ADVANCED FITNESS FACILITY
          </span>
        </div>

        {/* 2-Col Plan Layout */}
        <ScrollReveal yOffset={40}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {PLANS.map((plan) => (
              <PremiumCard 
                key={plan.id}
                isOptimal={plan.featured}
                className="h-full"
              >
                {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--acid)] text-[var(--bg)] font-mono text-[10px] uppercase tracking-widest px-3 py-1 whitespace-nowrap">
                  {plan.badge}
                </div>
              )}

              <div className="mb-8 border-b border-[var(--border)] pb-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-grotesk font-bold text-[22px] text-[var(--text-primary)] uppercase tracking-wide">
                    {plan.name}
                  </h3>
                </div>
                
                <div className="flex flex-col gap-4">
                  {plan.pricing.map((p, idx) => (
                    <div key={idx} className="flex items-center justify-between border-b border-[var(--border)]/30 border-dashed pb-2 last:border-b-0 last:pb-0">
                      <span className="font-mono text-[12px] text-[var(--text-secondary)] uppercase tracking-wider">
                        {p.label}
                      </span>
                      <div className="flex items-baseline gap-0.5">
                        <span className="font-sans text-[18px] text-[var(--acid)] font-light select-none">
                          ₹
                        </span>
                        <span className="font-bebas text-[32px] leading-none text-[var(--acid)]">
                          {p.price.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <ul className="flex flex-col gap-4 flex-1 mb-10">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[var(--acid)] shrink-0 mt-0.5" />
                    <span className="font-inter text-[14px] text-[var(--text-secondary)] leading-relaxed">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link href="/contact" className="w-full bg-[var(--acid)] text-[var(--bg)] font-mono text-[12px] uppercase tracking-widest py-4 hover:bg-[var(--text-primary)] transition-colors duration-300 mt-auto text-center block">
                INITIALIZE →
              </Link>
            </PremiumCard>
          ))}
        </div>
      </ScrollReveal>

        {/* Disclaimer Section */}
        <div className="mt-16 max-w-2xl mx-auto border border-[var(--border)] bg-[var(--surface)] p-6 relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--bg)] px-3 font-mono text-[10px] text-[var(--red)] uppercase tracking-widest whitespace-nowrap">
            [SYS_ALERT: TERMS & CONDITIONS]
          </div>
          <ul className="space-y-3">
            <li className="font-inter text-[13px] text-[var(--text-secondary)] flex items-start gap-3 leading-relaxed">
              <span className="text-[var(--red)] font-mono select-none mt-0.5">•</span>
              <span>Fees once paid are non-refundable and non-transferable.</span>
            </li>
            <li className="font-inter text-[13px] text-[var(--text-secondary)] flex items-start gap-3 leading-relaxed">
              <span className="text-[var(--red)] font-mono select-none mt-0.5">•</span>
              <span>Membership duration will not be extended for holidays, closures, or special circumstances.</span>
            </li>
          </ul>
        </div>

        {/* Bottom Note */}
        <div className="mt-12 text-center">
          <p className="font-mono text-[11px] text-[var(--text-muted)] tracking-widest uppercase">
            [SYS_NOTE: REGISTRATION REQUIRED · NO HIDDEN FEES · CANCEL ANYTIME · COUPLE PACKAGES AVAILABLE]
          </p>
        </div>

      </section>
    </div>
  );
}
