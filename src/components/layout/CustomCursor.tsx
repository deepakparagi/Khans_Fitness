'use client';

import { useEffect, useRef, useState } from 'react';

export function CustomCursor() {
  const circleRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const crosshairRef = useRef<SVGSVGElement>(null);

  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const [isHoveringMagnetic, setIsHoveringMagnetic] = useState(false);
  const [cursorText, setCursorText] = useState('');

  // Mouse positions
  const mouse = useRef({ x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0 });
  const circlePos = useRef({ x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0 });
  const dotPos = useRef({ x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0 });

  useEffect(() => {
    // Hide default cursor
    document.documentElement.style.cursor = 'none';

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    window.addEventListener('mousemove', onMouseMove);

    let rafId: number;

    const render = () => {
      // Lerp factors
      const circleLerp = 0.08;
      const dotLerp = 0.22;

      // Calculate new positions
      circlePos.current.x += (mouse.current.x - circlePos.current.x) * circleLerp;
      circlePos.current.y += (mouse.current.y - circlePos.current.y) * circleLerp;
      
      dotPos.current.x += (mouse.current.x - dotPos.current.x) * dotLerp;
      dotPos.current.y += (mouse.current.y - dotPos.current.y) * dotLerp;

      // Apply transforms
      if (circleRef.current) {
        circleRef.current.style.transform = `translate3d(${circlePos.current.x}px, ${circlePos.current.y}px, 0)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0)`;
      }

      rafId = requestAnimationFrame(render);
    };

    render();

    // Hover event listeners
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check for magnetic elements
      const magneticEl = target.closest('[data-cursor="magnetic"]');
      if (magneticEl) {
        setIsHoveringMagnetic(true);
      } else {
        setIsHoveringMagnetic(false);
      }

      // Check for links/buttons
      const linkEl = target.closest('a, button');
      if (linkEl) {
        setIsHoveringLink(true);
        // Determine text based on element content or default to VIEW
        const actionText = linkEl.getAttribute('data-cursor-text') || 'VIEW';
        setCursorText(actionText);
      } else {
        setIsHoveringLink(false);
      }

      // Check for images
      const imgEl = target.closest('img, [data-cursor="image"]');
      if (imgEl && !linkEl) { // Prefer link hover state if both exist
        setIsHoveringImage(true);
      } else {
        setIsHoveringImage(false);
      }
    };

    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(rafId);
      document.documentElement.style.cursor = 'auto';
    };
  }, []);

  // Determine circle classes based on state
  let circleSize = 'w-[48px] h-[48px] border border-[rgba(204,255,0,0.5)] bg-transparent';
  let dotVisibility = 'opacity-100';

  if (isHoveringMagnetic) {
    circleSize = 'w-[80px] h-[80px] border-transparent bg-[var(--acid)] opacity-15';
    dotVisibility = 'opacity-0';
  } else if (isHoveringLink || isHoveringImage) {
    circleSize = 'w-[64px] h-[64px] border border-[var(--acid)] bg-[var(--bg)] bg-opacity-40 backdrop-blur-sm';
    dotVisibility = 'opacity-0';
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* The main circle */}
      <div 
        ref={circleRef}
        className={`absolute top-0 left-0 -ml-[50%] -mt-[50%] flex items-center justify-center rounded-full transition-all duration-300 ease-out ${circleSize}`}
        style={{ transformOrigin: 'center center' }}
      >
        {/* Text for links */}
        <div 
          ref={textRef}
          className={`font-mono text-[10px] font-bold text-[var(--bg)] transition-opacity duration-200 ${isHoveringLink && !isHoveringImage ? 'opacity-100' : 'opacity-0'}`}
        >
          {cursorText}
        </div>

        {/* Crosshair for images */}
        <svg 
          ref={crosshairRef}
          className={`absolute text-[var(--acid)] w-6 h-6 transition-opacity duration-200 ${isHoveringImage ? 'opacity-100' : 'opacity-0'}`}
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5"
        >
          <path d="M12 2v20M2 12h20" />
        </svg>
      </div>

      {/* The small dot */}
      <div 
        ref={dotRef}
        className={`absolute top-0 left-0 w-[6px] h-[6px] -ml-[3px] -mt-[3px] rounded-full bg-[var(--acid)] transition-opacity duration-200 ${dotVisibility}`}
      />
    </div>
  );
}
