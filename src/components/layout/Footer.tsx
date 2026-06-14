'use client';

import Link from 'next/link';
import { BRAND } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="bg-[var(--bg)] border-t border-[var(--border)] relative z-10">
      {/* Top Strip */}
      <div className="w-full bg-[var(--acid)] py-4 overflow-hidden border-b border-[var(--bg)]">
        <div className="whitespace-nowrap flex items-center justify-center space-x-4">
          <span className="font-bebas text-40px text-black uppercase tracking-wider leading-none">
            KHAN&apos;S FITNESS — ಖಾನ್ಸ್ ಫಿಟ್ನೆಸ್
          </span>
        </div>
      </div>

      <div className="w-full mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Column */}
          <div className="flex flex-col gap-6">
            <h3 className="font-bebas text-2xl text-[var(--text-primary)] tracking-widest">SYSTEM_INFO</h3>
            <p className="font-mono text-xs text-[var(--text-secondary)] leading-relaxed">
              Gadag-Betageri&apos;s premier unisex fitness facility since 2015. Expert training, AI-powered programming, and a community that engineers results.
            </p>
            <div className="flex flex-col gap-2 font-mono text-[11px] text-[var(--text-muted)]">
              <p>LAT: 15.4325° N</p>
              <p>LON: 75.6358° E</p>
            </div>
          </div>

          {/* Programs Links */}
          <div className="flex flex-col gap-6">
            <h3 className="font-bebas text-2xl text-[var(--text-primary)] tracking-widest">PROTOCOLS</h3>
            <ul className="flex flex-col gap-3">
              {['About', 'Plans', 'Trainers', 'Transformations', 'Contact'].map(link => (
                <li key={link}>
                  <Link href={`/${link.toLowerCase()}`} className="font-mono text-[12px] text-[var(--text-muted)] hover:text-[var(--acid)] transition-colors uppercase tracking-widest">
                    /{link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* AI Tools Links */}
          <div className="flex flex-col gap-6">
            <h3 className="font-bebas text-2xl text-[var(--text-primary)] tracking-widest">AI_MODULES</h3>
            <ul className="flex flex-col gap-3">
              {[
                { label: 'BMI Calculator', path: '/ai/bmi' },
                { label: 'Workout Generator', path: '/ai/workout' },
                { label: 'Diet Planner', path: '/ai/diet' },
                { label: 'Health Calculators', path: '/ai/calculators' },
                { label: 'AI Chat Coach', path: '/ai/chat' }
              ].map(link => (
                <li key={link.label}>
                  <Link href={link.path} className="font-mono text-[12px] text-[var(--text-muted)] hover:text-[var(--acid)] transition-colors uppercase tracking-widest">
                    /{link.label.replace(' ', '_')}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-6">
            <h3 className="font-bebas text-2xl text-[var(--text-primary)] tracking-widest">LOC_DATA</h3>
            <ul className="flex flex-col gap-4">
              <li className="font-mono text-[12px] text-[var(--text-secondary)] uppercase flex flex-col items-start gap-2">
                <div>
                  <span className="block text-[var(--acid)] mb-1">HQ_ADDRESS:</span>
                  {BRAND.address}
                </div>
                <Link 
                  href="https://maps.app.goo.gl/BiosExiz7XEDNcof8" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 mt-1 border border-[var(--border)] text-[9px] hover:border-[var(--acid)] hover:text-[var(--acid)] transition-colors"
                >
                  VIEW ON MAPS ↗
                </Link>
              </li>
              <li className="font-mono text-[12px] text-[var(--text-secondary)] uppercase">
                <span className="block text-[var(--acid)] mb-1">COMMS:</span>
                {BRAND.phone} <br />
                {BRAND.email}
              </li>
              <li className="font-mono text-[12px] text-[var(--text-secondary)] uppercase">
                <span className="block text-[var(--acid)] mb-1">UPTIME:</span>
                Mon-Sat: {BRAND.hours.weekday} <br />
                Sun: {BRAND.hours.sunday}
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-6 border-t border-[var(--border)] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-[11px] text-[var(--text-muted)] uppercase tracking-widest text-center md:text-left">
            [© 2026 KHAN&apos;S FITNESS · GADAG-BETAGERI, KARNATAKA]
          </p>
          <p className="font-mono text-[11px] text-[var(--text-muted)] uppercase tracking-widest">
            DESIGNED BY DEEPCIPHER STUDIO_
          </p>
        </div>
      </div>
    </footer>
  );
}
