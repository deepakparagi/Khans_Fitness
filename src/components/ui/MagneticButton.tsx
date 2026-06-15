'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { cn } from '@/lib/utils'; // Make sure we have a utils file

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  magneticPull?: number;
}

export function MagneticButton({ children, className, magneticPull = 10, ...props }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!buttonRef.current || !wrapperRef.current) return;

    const button = buttonRef.current;
    
    // Create quick setters for performance with premium, heavy easing
    const xTo = gsap.quickTo(button, "x", { duration: 0.8, ease: "power4.out" });
    const yTo = gsap.quickTo(button, "y", { duration: 0.8, ease: "power4.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const hX = rect.left + rect.width / 2;
      const hY = rect.top + rect.height / 2;
      
      const distanceX = e.clientX - hX;
      const distanceY = e.clientY - hY;
      
      // Calculate pull relative to size
      const pullX = (distanceX / rect.width) * magneticPull;
      const pullY = (distanceY / rect.height) * magneticPull;

      xTo(pullX);
      yTo(pullY);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    const wrapper = wrapperRef.current;
    wrapper.addEventListener('mousemove', handleMouseMove);
    wrapper.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      wrapper.removeEventListener('mousemove', handleMouseMove);
      wrapper.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [magneticPull]);

  return (
    <div ref={wrapperRef} className="inline-block w-full md:w-auto" data-cursor="magnetic">
      <button
        ref={buttonRef}
        className={cn("relative transition-colors", className)}
        {...props}
      >
        {children}
      </button>
    </div>
  );
}
