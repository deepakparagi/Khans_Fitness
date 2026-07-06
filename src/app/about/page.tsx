import { TextReveal } from '@/components/ui/TextReveal';
import { Dumbbell, Activity, Zap, Heart } from 'lucide-react';
import Image from 'next/image';

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Khan's Fitness | Gadag-Betageri Unisex Gym",
  description: "Gadag-Betageri's premier unisex training facility since 2015. Transform your body with personalized programs, expert trainers, and top-notch equipment.",
};

const FEATURES = [
  { id: '01', name: 'MODERN EQUIPMENT', tags: '[BIO-MECHANICAL]', desc: 'Top-notch, well-maintained machines for cardio and heavy weight lifting. Members never wait long — equipment is always available and in peak condition.' },
  { id: '02', name: 'EXPERT TRAINERS', tags: '[ELITE COACHES]', desc: 'Khan Sir and Sonu Sir are exceptionally knowledgeable and attentive to form, ensuring every exercise is executed correctly. 80+ members have specifically praised our trainers.' },
  { id: '03', name: 'UNISEX FACILITY', tags: '[EQUAL ACCESS]', desc: 'Khan\'s Fitness welcomes men and women equally, with dedicated workout spaces, separate restrooms, and special batch timings for women members.' },
  { id: '04', name: 'CLEAN & SPACIOUS', tags: '[HYGIENE: MAX]', desc: 'Hygienic, well-sanitised, and thoughtfully laid out to avoid overcrowding. Members consistently highlight the clean environment as a standout feature.' },
  { id: '05', name: 'PERSONALISED PLANS', tags: '[CUSTOM PROTOCOL]', desc: 'Every member receives a tailor-made diet plan and workout modifications designed around their body type, fitness level, and specific goals.' },
  { id: '06', name: 'COUPLE MEMBERSHIPS', tags: '[ACCOUNTABILITY]', desc: 'Special packages available for couples — train together and stay accountable. Dynamic programs for general fitness, muscle building, and weight loss.' },
];

const HARDWARE = [
  { title: 'STRENGTH ZONE', icon: Dumbbell, desc: 'Heavy weight lifting section with full free weights.', tags: ['SQUAT RACKS', 'OLYMPIC BARS', 'DUMBBELLS'] },
  { title: 'CARDIO ZONE', icon: Activity, desc: 'Dedicated cardio section with top-tier equipment.', tags: ['TREADMILLS', 'ROW-CYCLING UNITS', 'ELLIPTICALS'] },
  { title: 'FUNCTIONAL AREA', icon: Zap, desc: 'Spacious, non-crowded workout floor for agility and power.', tags: ['KETTLEBELLS', 'BATTLE ROPES', 'PLYO BOXES'] },
  { title: 'FACILITIES', icon: Heart, desc: 'Premium support infrastructure for members.', tags: ['PERSONAL TRAINING BAYS', 'SEPARATE RESTROOMS', 'SANITIZATION STATIONS'] },
];

export default function AboutPage() {
  return (
    <div className="w-full bg-[var(--bg)]">
      
      {/* Hero Section */}
      <section className="relative w-full min-h-[calc(100svh-72px)] flex items-center justify-center mt-[72px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/hero/about_page_hero.png"
            alt="About Khan's Fitness"
            fill
            className="object-cover grayscale transition-opacity duration-300 hero-bg-image"
            quality={90}
            priority
          />
          <div className="absolute inset-0 bg-[var(--hero-overlay-bg)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/30 to-transparent" />
        </div>
        
        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl">
          <div className="font-mono text-[11px] text-[var(--tag-text)] tracking-widest uppercase mb-8 border border-[var(--acid-border)] px-4 py-1.5 bg-[var(--acid-dim)] backdrop-blur-sm">
            [SYS_INF: CORE_CAPABILITIES]
          </div>
          
          <TextReveal stagger={0.15}>
            <h1 className="font-bebas text-[clamp(36px,10vw,140px)] leading-[0.85] tracking-[-0.02em] uppercase flex flex-col text-[var(--text-primary)] drop-shadow-2xl">
              <span>UNLEASH</span>
              <span className="text-[var(--acid)]">YOUR TRUE</span>
              <span>POTENTIAL</span>
            </h1>
          </TextReveal>
          
          <p className="font-inter text-[var(--text-primary)]/80 mt-8 max-w-2xl text-[16px] leading-relaxed hidden md:block drop-shadow-md">
            Khan&apos;s Fitness is Gadag-Betageri&apos;s premier unisex training facility, established in 2015. We engineer protocols specific to your body and goals.
          </p>
        </div>
      </section>

      {/* Intro Details Section */}
      <section className="py-[100px] px-6 lg:px-12 2xl:px-24 w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="flex flex-col gap-8">
            <h2 className="font-grotesk font-bold text-[28px] text-[var(--text-primary)] uppercase">
              The Standard of Excellence
            </h2>
            <p className="font-inter text-[16px] text-[var(--text-secondary)] leading-relaxed">
              What started as a vision to bring world-class fitness infrastructure to North Karnataka has grown into the region&apos;s most trusted performance gym — rated 4.7 stars by over 500 members.
            </p>
            <p className="font-inter text-[16px] text-[var(--text-secondary)] leading-relaxed">
              Under the leadership of Mohammed Khan (Khan Sir) and Sonu Sir, the facility has transformed hundreds of lives through personalised workout programs, tailor-made diet plans, and hands-on coaching that prioritises perfect form over ego.
            </p>
          </div>
          
          <div className="flex flex-col gap-4 font-mono text-[12px] text-[var(--text-secondary)] info-panel p-8 border border-[var(--border)]">
            <div className="flex items-start gap-4 border-b border-[var(--border)] pb-4">
              <span className="text-[var(--tag-text)] w-24 shrink-0">ESTABLISHED</span>
              <span className="text-[var(--text-primary)]">2015</span>
            </div>
            <div className="flex items-start gap-4 border-b border-[var(--border)] pb-4">
              <span className="text-[var(--tag-text)] w-24 shrink-0">TYPE</span>
              <span className="text-[var(--text-primary)]">Unisex (Men + Women)</span>
            </div>
            <div className="flex items-start gap-4 border-b border-[var(--border)] pb-4">
              <span className="text-[var(--tag-text)] w-24 shrink-0">LOCATION</span>
              <span className="text-[var(--text-primary)]">Hatalgeri Rd, near Sai Baba Temple</span>
            </div>
            <div className="flex items-start gap-4 border-b border-[var(--border)] pb-4">
              <span className="text-[var(--tag-text)] w-24 shrink-0">RATING</span>
              <span className="text-[var(--text-primary)]">4.7 ★ (502+ Google reviews)</span>
            </div>
            <div className="flex items-start gap-4 border-b border-[var(--border)] pb-4">
              <span className="text-[var(--tag-text)] w-24 shrink-0">HOURS</span>
              <span className="text-[var(--text-primary)] flex flex-col">
                <span>Mon–Sat: 6:00 AM – 10:00 PM</span>
                <span>Sun: Closed</span>
              </span>
            </div>
            <div className="flex items-start gap-4 mt-2">
              <span className="text-[var(--tag-text)] shrink-0 uppercase tracking-widest">[MEMBERSHIP]</span>
              <span className="text-[var(--text-primary)]">Registration required before floor access</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature List (Row format) */}
      <section className="border-b border-[var(--border)] bg-[var(--bg2)]">
        <div className="flex flex-col">
          {FEATURES.map((feature) => (
            <div 
              key={feature.id} 
              className="group relative flex flex-col md:flex-row md:items-center justify-between border-b border-[var(--border)] p-6 lg:p-8 overflow-hidden transition-colors bg-transparent"
            >
              <div className="absolute inset-0 bg-[var(--acid)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] z-0" />
              
              <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-4 md:gap-16 w-full px-0 lg:px-12 2xl:px-24">
                <div className="font-mono text-[11px] text-[var(--text-muted)] group-hover:text-[var(--bg)] transition-colors duration-300 w-8">
                  {feature.id}
                </div>
                
                <div className="flex-1">
                  <h3 className="font-grotesk font-bold text-[20px] text-[var(--text-primary)] group-hover:text-[var(--bg)] transition-colors duration-300 uppercase">
                    {feature.name}
                  </h3>
                  <p className="font-inter text-[14px] text-[var(--text-secondary)] group-hover:text-[var(--bg)] transition-colors duration-300 mt-2 max-w-lg">
                    {feature.desc}
                  </p>
                </div>

                <div className="font-mono text-[10px] text-[var(--text-muted)] group-hover:text-[var(--bg)] transition-colors duration-300 tracking-widest hidden lg:block">
                  {feature.tags}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3-Image Mosaic */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-1 p-1 bg-[var(--bg)]">
        <div className="relative h-[600px]">
          <Image 
            src="/images/gallery/IMG_1839.jpg"
            alt="Gym Training"
            fill
            className="object-cover dark:grayscale-[20%] grayscale-0 transition-[filter] duration-300"
            quality={80}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="grid grid-rows-2 gap-1 h-[600px]">
          <div className="relative w-full h-full">
            <Image 
              src="/images/gallery/IMG_2550.jpg"
              alt="Weights"
              fill
              className="object-cover dark:grayscale-[20%] grayscale-0 transition-[filter] duration-300"
              quality={80}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="relative w-full h-full">
            <Image 
              src="/images/gallery/IMG_2839.jpg"
              alt="Equipment"
              fill
              className="object-cover dark:grayscale-[20%] grayscale-0 transition-[filter] duration-300"
              quality={80}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="bg-[var(--acid)] text-[var(--bg)] border-b border-[var(--border)]">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-[var(--bg)] border-[var(--bg)]">
          {[
            { num: '500+', label: 'MEMBERS' },
            { num: '10+', label: 'YEARS' },
            { num: '4+', label: 'TRAINERS' },
            { num: '98%', label: 'SATISFACTION' },
          ].map((stat, i) => (
            <div key={i} className="p-8 lg:p-16 flex flex-col items-center justify-center text-center">
              <span className="font-bebas text-[clamp(48px,5vw,72px)] leading-none mb-2">{stat.num}</span>
              <span className="font-mono text-[11px] font-bold uppercase tracking-widest">[{stat.label}]</span>
            </div>
          ))}
        </div>
      </section>

      {/* Hardware & Machinery Grid */}
      <section className="py-[100px] px-6 lg:px-12 2xl:px-24 w-full mx-auto bg-[var(--bg2)]">
        <div className="mb-20">
          <div className="font-mono text-[11px] text-[var(--tag-text)] tracking-widest uppercase mb-12">
            [SYS_INF: INFRASTRUCTURE]
          </div>
          <TextReveal>
            <h2 className="font-bebas text-[clamp(32px,8vw,100px)] leading-[0.85] tracking-[-0.02em] uppercase text-[var(--text-primary)]">
              HARDWARE & MACHINERY
            </h2>
          </TextReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--border)] border border-[var(--border)]">
          {HARDWARE.map((hw, i) => {
            const Icon = hw.icon;
            return (
              <div key={i} className="bg-[var(--surface)] p-8 lg:p-12 group hover:bg-[var(--surface2)] transition-colors duration-300">
                <Icon className="w-8 h-8 text-[var(--acid)] mb-8" />
                <h3 className="font-grotesk font-bold text-[22px] text-[var(--text-primary)] uppercase mb-4">
                  {hw.title}
                </h3>
                <p className="font-inter text-[14px] text-[var(--text-secondary)] mb-8 leading-relaxed">
                  {hw.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {hw.tags.map(tag => (
                    <span key={tag} className="font-mono text-[10px] text-[var(--tag-text)] border border-[var(--border)] px-2 py-1 uppercase tracking-widest bg-[var(--surface)]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
