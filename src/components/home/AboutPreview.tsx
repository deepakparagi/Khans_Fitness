'use client';

import { TextReveal } from '@/components/ui/TextReveal';

import Image from 'next/image';

export function AboutPreview() {
  return (
    <section className="w-full min-h-[100svh] bg-[var(--acid)] text-[var(--bg)] border-y border-[var(--border)] flex flex-col lg:flex-row">
      
      {/* Left Content (55%) */}
      <div className="w-full lg:w-[55%] flex flex-col lg:border-r border-[var(--border)]">
        {/* Top Heading Strip */}
        <div className="px-6 lg:px-12 2xl:px-24 py-16 border-b border-[var(--border)]">
          <TextReveal>
            <h2 className="font-bebas text-[clamp(32px,8vw,100px)] leading-[0.85] tracking-[-0.02em] uppercase">
              ENGINEERED FOR MAXIMUM OUTPUT
            </h2>
          </TextReveal>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 flex-1">
          
          <div className="p-6 lg:p-10 flex flex-col justify-center border-b border-[var(--border)] md:border-r">
            <h3 className="font-grotesk font-bold text-[18px] uppercase mb-4">
              MODERN EQUIPMENT
            </h3>
            <p className="font-inter text-[14px] opacity-80 leading-relaxed">
              Top-notch, well-maintained machines for cardio and heavy weight lifting. Members never wait long — equipment is always available and in peak condition.
            </p>
          </div>

          <div className="p-6 lg:p-10 flex flex-col justify-center border-b border-[var(--border)]">
            <h3 className="font-grotesk font-bold text-[18px] uppercase mb-4">
              EXPERT TRAINERS
            </h3>
            <p className="font-inter text-[14px] opacity-80 leading-relaxed">
              Khan Sir and Sonu Sir are exceptionally knowledgeable and attentive to form, ensuring every exercise is executed correctly.
            </p>
          </div>

          <div className="p-6 lg:p-10 flex flex-col justify-center border-b border-[var(--border)] md:border-b-0 md:border-r">
            <h3 className="font-grotesk font-bold text-[18px] uppercase mb-4">
              AI PROTOCOLS
            </h3>
            <p className="font-inter text-[14px] opacity-80 leading-relaxed">
              Cutting-edge algorithmic programming tailored precisely to your biomechanical data and transformation goals. No guesswork, just results.
            </p>
          </div>

          <div className="p-6 lg:p-10 flex flex-col justify-center">
            <h3 className="font-grotesk font-bold text-[18px] uppercase mb-4">
              UNISEX FACILITY
            </h3>
            <p className="font-inter text-[14px] opacity-80 leading-relaxed">
              A highly respectful, disciplined environment welcoming both men and women. We focus purely on performance and community support.
            </p>
          </div>

        </div>
      </div>

      {/* Right Image (45%) */}
      <div className="w-full lg:w-[45%] h-[480px] lg:h-auto relative">
        <Image 
          src="/images/Web/1.png"
          alt="Gym Atmosphere"
          fill
          className="object-cover"
          quality={90}
        />
      </div>

    </section>
  );
}
