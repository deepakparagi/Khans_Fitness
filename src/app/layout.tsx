import type { Metadata } from "next";
import "./globals.css";
import SmoothScroller from "@/components/layout/SmoothScroller";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import PageTransition from "@/components/layout/PageTransition";
import { InitialLoader } from "@/components/layout/InitialLoader";
import { ThemeProvider } from '@/components/ThemeProvider';
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";

export const metadata: Metadata = {
  title: "Khan's Fitness | Gadag's Premier Gym | Est. 2015",
  description: "Khan's Fitness — Gadag-Betageri's #1 unisex gym since 2015. 4.7★ rating, 500+ members, expert trainers Khan Sir & Sonu Sir. AI-powered workout and diet planning. Hatalgeri Rd, near Sai Baba Temple. Open Mon–Sat 6AM–10PM.",
  keywords: ["gym in gadag", "fitness center gadag", "khan's fitness", "personal trainer gadag", "weight loss gadag", "muscle building gadag karnataka"],
  openGraph: {
    title: "Khan's Fitness | Gadag's Premier Gym",
    description: "4.7★ rated unisex gym in Gadag-Betageri. Expert coaching, AI tools, proven transformations.",
    url: "https://khansfitness.in",
    siteName: "Khan's Fitness",
  },
  icons: {
    icon: "/khans-fitness-official-logo.png",
    shortcut: "/khans-fitness-official-logo.png",
    apple: "/khans-fitness-official-logo.png",
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
    <html lang="en" className="scroll-smooth" data-theme="dark" suppressHydrationWarning>
      <head />
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

          {/* Floating WhatsApp Button */}
          <WhatsAppFloat />
        </SmoothScroller>
        </ThemeProvider>
      </body>
    </html>
  );
}
