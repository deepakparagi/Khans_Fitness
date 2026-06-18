# Khan's Fitness
> **Premium AI-Powered Fitness Platform for Khan's Fitness, Gadag-Betageri.**

---

Khan's Fitness is a modern, state-of-the-art training facility located in Gadag-Betageri, Karnataka. This platform is designed and engineered to establish a premium digital presence for the brand—blending high-performance physical training with next-generation digital intelligence. 

The application integrates advanced AI tools, personalized fitness calculators, a custom workout coaching interface, and a dual-theme system (Dark & Light modes) mapped to a custom luxury Burgundy design language. Built for responsiveness, speed, and visual impact, the platform delivers a world-class experience across all desktop and mobile devices.

---

## Features

- **Premium Modern UI/UX:** High-contrast brutalist typography balanced with luxury micro-animations and smooth transitions.
- **Fully Responsive Design:** Tailored layouts optimized specifically for mobile, tablet, and ultra-wide screens.
- **AI Fitness Lab Hub:** Centralized interface housing cutting-edge cognitive tools:
  - **BMI Calculator:** Instant body mass calculation and status metrics.
  - **Fitness Assessment Tool:** Algorithmic calculation of bodily performance metrics.
  - **Workout Generator:** Personalized training programs created dynamically.
  - **Diet Planner:** Macro-based diet regimens built to individual nutritional guidelines.
  - **Health Calculators:** Target heart rate zones, 1RM strength metrics, and body fat estimators.
  - **AI Fitness Chat:** Real-time conversational interface with *Khan AI Coach* that requires core physical details for specialized guidance.
- **Trainer Showcase:** Detailed bio grids highlighting certified coaching staff (Khan Sir, Sonu Sir, and team).
- **Membership Plans:** Tiered, transparent subscription cards with direct integration to consultation triggers.
- **Transformation Gallery:** Case studies of successful weight loss and muscle building progressions.
- **Contact & Lead Generation:** Smooth form routing with direct WhatsApp validation actions.
- **Dark / Light Theme Support:** Double-themed system optimized for zero-flicker loading.
- **Performance Optimized:** Clean code structures compiling to highly efficient static routes.
- **SEO Friendly:** Rigorous semantic markup, JSON-LD metatags, and indexing layouts.

---

## Tech Stack

- **Core Framework:** Next.js (App Router, Turbopack compiling)
- **Programming Language:** TypeScript
- **User Interface:** React
- **Styling Layer:** Tailwind CSS & Custom CSS variables
- **Animations:** Framer Motion (page transitions & loaders) & GSAP (scroll-scrub animations)
- **Deployment Platform:** Vercel

---

## Project Structure

```bash
gym/
├── src/
│   ├── app/                # Next.js App Router (pages and server actions)
│   │   ├── actions/        # Server actions (AI API calls)
│   │   ├── ai/             # AI Tools pages
│   │   ├── about/          # About page
│   │   ├── plans/          # Membership tiers page
│   │   ├── trainers/       # Elite coaches page
│   │   └── layout.tsx      # App global layout (with pre-hydration theme scripts)
│   ├── components/         # Reusable React components
│   │   ├── home/           # Homepage components (Hero, CTA, etc.)
│   │   ├── layout/         # Layout components (Navbar, Footer, Scroller)
│   │   ├── ui/             # Reusable primitive UI buttons and cards
│   │   └── ThemeProvider   # Client context wrapping for dark/light states
│   ├── lib/                # Shared utilities and algorithmic logic
│   └── public/             # Static assets (Official branding logos, images)
```

---

## Installation & Setup

Ensure you have [Node.js](https://nodejs.org/) installed, then follow the instructions below:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/deepakparagi/Khans_Fitness.git
   cd Khans_Fitness
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env.local` file in the root directory (see [Environment Variables](#environment-variables)).

4. **Launch development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

---

## Environment Variables

Create a `.env.local` file at the project root to store credentials:

```env
# URL for SEO canonical configurations
NEXT_PUBLIC_SITE_URL=https://khansfitness.in

# OpenRouter / LLM integrations
OPENROUTER_API_KEY=your_openrouter_api_key_here
NEXT_PUBLIC_OPENROUTER_MODEL=openai/gpt-oss-120b:free
```

---

## Performance Targets

- **Fast Loading:** Strict optimization of visual assets and font bundles.
- **Mobile First:** Responsive layouts crafted with priority for mobile viewport composition.
- **Accessibility Focused:** Standard markup patterns and keyboard navigational compatibility.
- **SEO Optimized:** Title tags, unique identifiers, meta-descriptions, and structured data layouts.
- **Production Ready:** Free of syntax compiler warnings, static rendering failures, and hydration bugs.

---

## Deployment

The application is configured for continuous integration and immediate delivery via **Vercel**.

For local production builds:
```bash
# Build the optimized production bundle
npm run build

# Start the local production server
npm run start
```

---

## Design Philosophy

- **Luxury Fitness Branding:** Curated dark Espresso base, clean Cream surfaces, and vibrant Burgundy/Wine accents.
- **Premium Minimalism:** Balanced margins, tight borders, and ample negative space.
- **Brutalist Typography:** Heavy Bebas Neue titles combined with clean monospace labels to assert visual hierarchy.
- **High-End Gym Experience:** Visual designs that reflect a premium physical club environment.
- **AI-Powered Fitness Future:** Bridging hardware and software seamlessly.

---

## Developed By

### **DeepCipher Agency**
*Building premium AI products, modern web experiences, automation systems, and scalable digital solutions.*

- **Founder:** Deepak Danappa Paragi
- **Website:** *Coming Soon*

---

## Roadmap

- [ ] **AI Coach Updates:** Enhanced contextual training advice based on long-term stats.
- [ ] **Personalized Diet Engine:** Deep integration with regional nutritional catalogs.
- [ ] **Workout Tracking:** Live tracking logs for member workouts.
- [ ] **Member Dashboard:** Secure profiles to review metrics history.
- [ ] **Fitness Analytics:** Interactive progression metrics diagrams.
- [ ] **Mobile Application:** Dedicated native iOS/Android builds.
- [ ] **AI Voice Assistant:** Real-time hands-free coaching commands.

---

## License

Copyright © 2026 Khan's Fitness.

Designed & Developed by **DeepCipher Agency**.  
All Rights Reserved.
