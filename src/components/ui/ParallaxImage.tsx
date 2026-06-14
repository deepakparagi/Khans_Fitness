'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function ParallaxImage({ src, alt, className }: ParallaxImageProps) {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        yPercent: 40,
        ease: "none",
        scrollTrigger: {
          trigger: imageRef.current.parentElement,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }
  }, []);

  return (
    <Image 
      ref={imageRef}
      src={src}
      alt={alt}
      fill
      className={`object-cover z-0 scale-110 ${className || ''}`}
      quality={90}
      priority
    />
  );
}
