import type { Metadata } from "next";
import "./globals.css";
import { SmoothScroller } from "@/components/layout/SmoothScroller";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { InitialLoader } from "@/components/layout/InitialLoader";
import Link from 'next/link';
import { MessageSquare } from 'lucide-react';
import { ThemeProvider } from '@/components/ThemeProvider';

export const metadata: Metadata = {
  title: "Khan's Fitness | ಖಾನ್ಸ್ ಫಿಟ್ನೆಸ್ — Gadag's Premier Gym",
  description: "Khan's Fitness — Gadag-Betageri's #1 unisex gym since 2015. 4.7★ rating, 500+ members, expert trainers Khan Sir & Sonu Sir. AI-powered workout and diet planning. Hatalgeri Rd, near Sai Baba Temple. Open Mon–Sat 6AM–10PM.",
  keywords: ["gym in gadag", "fitness center gadag", "khan's fitness", "personal trainer gadag", "weight loss gadag", "muscle building gadag karnataka"],
  openGraph: {
    title: "Khan's Fitness | Gadag's Premier Gym",
    description: "4.7★ rated unisex gym in Gadag-Betageri. Expert coaching, AI tools, proven transformations.",
    url: "https://khansfitness.in",
    siteName: "Khan's Fitness",
  }
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            try {
              var stored = localStorage.getItem('kf-theme');
              var system = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
              var theme = stored || system;
              document.documentElement.setAttribute('data-theme', theme);
            } catch(e) {}
          })();
        ` }} />
      </head>
      <body className="antialiased bg-[var(--bg)] text-[var(--text-primary)] font-inter">
        <ThemeProvider>
          <InitialLoader />
          <CustomCursor />
        <SmoothScroller>
          <Navbar />
          <PageTransition>
            <main className="w-full">
              {children}
            </main>
          </PageTransition>
          <Footer />

          {/* Floating AI Chat Button */}
          <Link 
            href="/ai/chat"
            className="fixed bottom-8 right-8 z-[90] w-14 h-14 bg-[var(--acid)] rounded-full flex items-center justify-center shadow-[0_0_20px_var(--acid-border)] hover:scale-110 transition-transform duration-300"
            aria-label="AI Chat Coach"
          >
            <MessageSquare className="w-6 h-6 text-[var(--bg)]" />
          </Link>
        </SmoothScroller>
        </ThemeProvider>
      </body>
    </html>
  );
}
