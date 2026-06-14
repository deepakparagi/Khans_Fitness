'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

interface ParallaxImageProps {
  children: React.ReactNode;
  className?: string;
  speed?: number; // 0.1 means 10% movement
}

export function ParallaxImage({ 
  children, 
  className = "", 
  speed = 0.1 
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !containerRef.current || !imageRef.current) return;

    // Calculate the pixels to move based on speed percentage
    const movement = containerRef.current.offsetHeight * speed;

    // Set initial state - scale the image slightly so it doesn't leave empty space when moved
    gsap.set(imageRef.current, {
      y: -movement,
      scale: 1 + (speed * 2) // Ensure it covers the container even when shifted
    });

    // Animate
    gsap.to(imageRef.current, {
      y: movement,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom", // when the top of the container hits the bottom of the viewport
        end: "bottom top",   // when the bottom of the container hits the top of the viewport
        scrub: true
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === containerRef.current) {
          t.kill();
        }
      });
    };
  }, [speed]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <div ref={imageRef} className="absolute inset-0 w-full h-full transform-gpu">
        {children}
      </div>
    </div>
  );
}
