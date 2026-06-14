'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/components/ThemeProvider';

const NAV_LINKS = [
  { label: 'HOME', href: '/' },
  { label: 'ABOUT', href: '/about' },
  { label: 'PLANS', href: '/plans' },
  { label: 'TRAINERS', href: '/trainers' },
  { label: 'TRANSFORMATIONS', href: '/transformations' },
  { label: 'AI TOOLS', href: '/ai' },
  { label: 'CONTACT', href: '/contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full h-[64px] z-[100] transition-all duration-300 ${
          isScrolled 
            ? 'bg-[var(--nav-bg)] backdrop-blur-md border-b border-[var(--border)]' 
            : 'bg-[var(--nav-bg)] lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none border-b border-[var(--border)] lg:border-transparent'
        }`}
      >
        <div className="h-full px-6 lg:px-12 mx-auto flex items-center justify-between">
          
          {/* LEFT: Logo */}
          <div className="flex-1 flex justify-start">
            <Link href="/" className="flex items-center group" data-cursor="magnetic">
              <Image 
                src="/logo.png" 
                alt="Khan's Fitness Logo" 
                width={160} 
                height={50} 
                className="w-auto h-12 object-contain"
                priority
              />
            </Link>
          </div>

          {/* CENTER: Desktop Nav */}
          <div className="hidden xl:flex flex-auto justify-center">
            <nav className="flex items-center gap-6">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    data-cursor-text="GO"
                    className="relative px-3 py-2 group overflow-hidden"
                  >
                    {/* Hover background sweep */}
                    <span className={`absolute inset-0 bg-[var(--acid)] transition-transform duration-300 origin-left ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                    
                    <span className={`relative z-10 font-mono text-[11px] uppercase tracking-widest transition-colors duration-300 ${isActive ? 'text-[var(--bg)]' : 'text-[var(--text-primary)] group-hover:text-[var(--bg)]'}`}>
                      [{link.label}]
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* RIGHT: CTA */}
          <div className="hidden xl:flex flex-1 items-center justify-end gap-6">
            <Link 
              href="/ai" 
              className="font-mono text-[11px] text-[var(--acid)] uppercase tracking-widest hover:underline underline-offset-4"
              data-cursor="magnetic"
            >
              ACCESS_AI
            </Link>
            
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'none',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-muted)',
                flexShrink: 0,
              }}
              className="theme-toggle-btn"
              data-cursor="magnetic"
            >
              {theme === 'dark'
                ? <Sun size={18} color="var(--text-muted)" />
                : <Moon size={18} color="var(--text-muted)" />
              }
            </button>

            <Link 
              href="/plans"
              className="bg-[var(--acid)] text-[var(--bg)] font-mono text-[11px] uppercase tracking-widest px-6 py-3 hover:bg-[var(--text-primary)] transition-colors"
              data-cursor="magnetic"
            >
              INITIALIZE
            </Link>
          </div>

          {/* MOBILE TOGGLE & THEME */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="p-2"
            >
              {theme === 'dark'
                ? <Sun size={20} color="var(--text-muted)" />
                : <Moon size={20} color="var(--text-muted)" />
              }
            </button>
            <button 
              className="text-[var(--acid)] p-2"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE FULL SCREEN MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: '0%' }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[200] bg-[var(--bg)] flex flex-col justify-center px-6"
          >
            <button 
              className="absolute top-6 right-6 text-[var(--text-primary)] p-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="w-8 h-8" />
            </button>

            <nav className="flex flex-col gap-4">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.2, duration: 0.5, ease: "easeOut" }}
                >
                  <Link
                    href={link.href}
                    className="font-bebas text-[clamp(28px,8vw,72px)] text-[var(--text-primary)] hover:text-[var(--acid)] leading-none uppercase break-words"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
