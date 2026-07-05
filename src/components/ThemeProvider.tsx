'use client'
import { createContext, useContext, ReactNode } from 'react'

interface ThemeCtx {
  theme: 'dark' | 'light'
  toggle: () => void
}

const Ctx = createContext<ThemeCtx>({ theme: 'dark', toggle: () => {} })

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <Ctx.Provider value={{ theme: 'dark', toggle: () => {} }}>
      {children}
    </Ctx.Provider>
  )
}

export const useTheme = () => useContext(Ctx)
