'use client'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type Theme = 'dark' | 'light'

interface ThemeCtx {
  theme: Theme
  toggle: () => void
}

const Ctx = createContext<ThemeCtx>({ theme: 'dark', toggle: () => {} })

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark')
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('kf-theme') as Theme | null
    const sys = window.matchMedia('(prefers-color-scheme:light)').matches
      ? 'light' : 'dark'
    const initial = stored ?? sys
    setTheme(initial)
    document.documentElement.setAttribute('data-theme', initial)
    setReady(true)
  }, [])

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    localStorage.setItem('kf-theme', next)
    document.documentElement.setAttribute('data-theme', next)
  }

  return (
    <Ctx.Provider value={{ theme, toggle }}>
      <div style={{ opacity: ready ? 1 : 0, transition: 'opacity 0.15s ease' }}>
        {children}
      </div>
    </Ctx.Provider>
  )
}

export const useTheme = () => useContext(Ctx)
