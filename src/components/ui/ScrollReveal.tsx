'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  yOffset?: number;
  duration?: number;
  delay?: number;
}

export function ScrollReveal({ 
  children, 
  className = "", 
  yOffset = 30, 
  duration = 1,
  delay = 0 
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!elementRef.current) return;

    gsap.fromTo(elementRef.current,
      { 
        y: prefersReducedMotion ? 0 : yOffset, 
        opacity: 0 
      },
      {
        y: 0,
        opacity: 1,
        duration: duration,
        delay: delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: elementRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === elementRef.current) {
          t.kill();
        }
      });
    };
  }, [yOffset, duration, delay]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}
