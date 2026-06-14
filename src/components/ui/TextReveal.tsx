'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

export function TextReveal({ 
  children, 
  className = "", 
  delay = 0,
  stagger = 0.1 
}: { 
  children: React.ReactNode; 
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current) return;

    // Get all immediate children (which should be wrapped lines)
    const lines = containerRef.current.children;

    gsap.fromTo(lines, 
      { 
        y: '100%', 
        opacity: 0 
      },
      {
        y: '0%',
        opacity: 1,
        duration: 0.8,
        stagger: stagger,
        delay: delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );
  }, [delay, stagger]);

  return (
    <div ref={containerRef} className={`overflow-y-clip pt-8 -mt-8 pb-4 flex flex-col ${className}`}>
      {children}
    </div>
  );
}

// A simple utility to wrap lines/words so they can be animated independently
export function SplitText({ text, type = 'chars', className = '' }: { text: string, type?: 'chars' | 'words' | 'lines', className?: string }) {
  if (type === 'chars') {
    return (
      <span className={`inline-flex flex-wrap ${className}`}>
        {text.split('').map((char, i) => (
          <span key={i} className="inline-block" style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}>
            {char}
          </span>
        ))}
      </span>
    );
  }

  if (type === 'words') {
    return (
      <span className={`inline-flex flex-wrap gap-[0.25em] ${className}`}>
        {text.split(' ').map((word, i) => (
          <span key={i} className="inline-block overflow-hidden">
            <span className="inline-block translate-y-0 opacity-100">{word}</span>
          </span>
        ))}
      </span>
    );
  }

  // Lines requires manual \n in the string
  return (
    <span className={`flex flex-col ${className}`}>
      {text.split('\n').map((line, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <span className="inline-block translate-y-0 opacity-100">{line}</span>
        </span>
      ))}
    </span>
  );
}
