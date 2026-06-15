'use client'
import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'

export default function PageTransition({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const overlayRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const prevPath = useRef(pathname)

  useEffect(() => {
    if (!overlayRef.current || !textRef.current) return
    if (prevPath.current === pathname) return

    prevPath.current = pathname

    const tl = gsap.timeline()
    tl.set(overlayRef.current, { yPercent: 100, display: 'flex' })
    tl.to(overlayRef.current, {
      yPercent: 0,
      duration: 0.5,
      ease: 'power3.inOut',
    })
    tl.to(
      textRef.current,
      { opacity: 1, duration: 0.2 },
      '-=0.1'
    )
    tl.to(overlayRef.current, {
      yPercent: -100,
      duration: 0.5,
      ease: 'power3.inOut',
      delay: 0.1,
    })
    tl.set(overlayRef.current, { display: 'none', yPercent: 100 })
  }, [pathname])

  return (
    <>
      <div
        ref={overlayRef}
        style={{
          position: 'fixed',
          inset: 0,
          background: '#CCFF00',
          zIndex: 9999,
          display: 'none',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        <div
          ref={textRef}
          style={{
            fontFamily: 'var(--font-jetbrains)',
            fontSize: '12px',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            color: '#080808',
            opacity: 0,
          }}
        >
          INITIALIZING_SYSTEM...
        </div>
      </div>
      {children}
    </>
  )
}
