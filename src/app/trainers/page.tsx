

import { TextReveal } from '@/components/ui/TextReveal';
import { Star, Users, Clock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Expert Trainers | Khan's Fitness Gadag",
  description: "Meet the elite trainers at Khan's Fitness. Featuring Khan Sir, Sonu Sir, and our team of expert coaches in Gadag-Betageri.",
};

const TRAINERS = [
  {
    initials: 'IK',
    name: 'ISMAIL KHAN (KHAN SIR)',
    role: '[Head Trainer & Founder]',
    social: 'https://instagram.com/ismailkhan_khansfitness',
    rating: '4.9',
    clients: '200+',
    experience: '8+ years',
    desc: "Founder of Khan's Fitness and a certified fitness trainer with 8+ years of experience in Gadag. Khan Sir is exceptionally knowledgeable and attentive to form, ensuring every exercise is performed correctly. Known for his motivating energy and ability to design personalised programs for every body type, from beginners to competitive athletes.",
    tags: ['STRENGTH TRAINING', 'BODY TRANSFORMATION', 'SPORTS NUTRITION', 'FORM CORRECTION', 'PERSONALISED PROGRAMMING']
  },
  {
    initials: 'SS',
    name: 'SONU SIR',
    role: '[Senior Fitness Coach]',
    rating: '4.9',
    clients: '150+',
    experience: '5+ years',
    desc: "Sonu Sir is highly praised across 502 Google reviews for his supportive nature and dedication to guiding members through every workout properly. He specialises in weight loss transformations and functional training, with a strong focus on helping members stay consistent and motivated over the long term.",
    tags: ['WEIGHT LOSS', 'FUNCTIONAL TRAINING', 'FORM CORRECTION', 'MOTIVATION COACHING']
  },
  {
    initials: 'PS',
    name: 'PRIYA SHARMA',
    role: '[Yoga & Wellness Coach]',
    rating: '4.9',
    clients: '180+',
    experience: '6+ years',
    desc: "Certified yoga instructor specialising in power yoga, flexibility training, and women's fitness programs. Priya leads dedicated women's batch sessions and brings a mindfulness-first approach to physical conditioning.",
    tags: ['YOGA', 'FLEXIBILITY', 'MINDFULNESS', "WOMEN'S FITNESS"]
  },
  {
    initials: 'SK',
    name: 'SURESH KUMAR',
    role: '[Powerlifting Coach]',
    rating: '4.7',
    clients: '120+',
    experience: '7+ years',
    desc: "State-level powerlifting champion with extensive experience in competition preparation and advanced strength programming. Suresh handles athletes serious about performance gains.",
    tags: ['POWERLIFTING', 'MUSCLE BUILDING', 'COMPETITION PREP']
  }
];

export default function TrainersPage() {
  return (
    <div className="w-full bg-[var(--bg)]">
      <section className="relative mt-[72px] pt-[80px] pb-[100px] px-6 lg:px-12 2xl:px-24 w-full mx-auto h-[calc(100svh-72px)] min-h-[calc(100svh-72px)] flex flex-col justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/hero/4661155.jpg"
            alt="Our Trainers"
            fill
            className="object-cover grayscale transition-opacity duration-300 hero-bg-image"
            quality={90}
            priority
          />
          <div className="absolute inset-0 bg-[var(--hero-overlay-bg)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/30 to-transparent" />
        </div>
        
        {/* Header */}
        <div className="relative z-10 mb-16 flex flex-col items-center text-center">
          <div className="font-mono text-[11px] text-[var(--tag-text)] tracking-widest uppercase mb-8 border border-[var(--acid-border)] bg-[var(--acid-dim)] px-3 py-1 inline-block">
            [SYS_INF: OPTIMIZATION_TEAM]
          </div>
          <TextReveal stagger={0.15} className="items-center">
            <h1 className="font-bebas text-[clamp(32px,8vw,120px)] leading-[0.85] tracking-[-0.02em] uppercase flex flex-col items-center drop-shadow-2xl">
              <span className="text-[var(--text-primary)]">HUMAN OPTIMIZATION</span>
              <span className="text-[var(--acid)]">COACHES</span>
            </h1>
          </TextReveal>
        </div>
      </section>

      {/* Content Section */}
      <section className="pb-[100px] px-6 lg:px-12 2xl:px-24 w-full mx-auto">
        {/* Atmosphere Image */}
        <div className="relative w-full h-[280px] mb-16">
          <Image 
            src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1600&q=80"
            alt="Gym Atmosphere"
            fill
            className="object-cover brightness-[0.5] transition-[filter] duration-300"
            quality={90}
          />
        </div>

        {/* 4-Col Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRAINERS.map((trainer, i) => (
            <div 
              key={i}
              className="flex flex-col border border-[var(--border)] group hover:border-[var(--acid)] transition-colors duration-300"
            >
              {/* Top Half: Initials Block */}
              <div className="trainer-initials-block w-full aspect-square bg-[var(--initials-bg)] flex items-center justify-center overflow-hidden border-b border-[var(--border)]">
                <span className="font-bebas text-[120px] text-[var(--initials-text)] leading-none transform transition-transform duration-500 group-hover:scale-105">
                  {trainer.initials}
                </span>
              </div>

              {/* Bottom Half: Info */}
              <div className="bg-[var(--surface)] p-6 flex flex-col flex-1">
                <div className="mb-4">
                  <h3 className="font-grotesk font-bold text-[18px] text-[var(--text-primary)] uppercase tracking-wide leading-tight mb-1">
                    {trainer.name}
                  </h3>
                  <div className="font-mono text-[10px] text-[var(--acid)] uppercase tracking-widest">
                    {trainer.role}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <div className="flex items-center gap-1 font-mono text-[10px] text-[var(--text-secondary)]">
                    <Star className="w-3.5 h-3.5 text-[var(--acid)] fill-[var(--acid)]" />
                    {trainer.rating}
                  </div>
                  <div className="flex items-center gap-1 font-mono text-[10px] text-[var(--text-secondary)]">
                    <Users className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                    {trainer.clients}
                  </div>
                  <div className="flex items-center gap-1 font-mono text-[10px] text-[var(--text-secondary)]">
                    <Clock className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                    {trainer.experience}
                  </div>
                </div>

                <p className="font-inter text-[13px] text-[var(--text-secondary)] leading-relaxed mb-6">
                  {trainer.desc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {trainer.tags.map(tag => (
                    <span key={tag} className="font-mono text-[9px] text-[var(--text-secondary)] border border-[var(--border)] px-1.5 py-0.5 uppercase tracking-widest bg-[var(--bg)]">
                      {tag}
                    </span>
                  ))}
                </div>

                {trainer.social && (
                  <div className="mb-8">
                    <a href={trainer.social} target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] text-[var(--acid)] uppercase tracking-widest hover:text-[var(--text-primary)] transition-colors">
                      [INSTAGRAM PROFILE] ↗
                    </a>
                  </div>
                )}

                {/* CTA */}
                <Link 
                  href="/contact"
                  className="mt-auto font-mono text-[11px] text-[var(--acid)] uppercase tracking-widest hover:text-[var(--text-primary)] transition-colors"
                  data-cursor-text="CONTACT"
                >
                  INITIATE_CONTACT() →
                </Link>
              </div>
            </div>
          ))}
        </div>

      </section>
    </div>
  );
}
