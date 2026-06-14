import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Khan's Fitness Gadag-Betageri",
  description: "Get in touch with Khan's Fitness. Start your journey with our expert trainers. Hatalgeri Rd, Vidya Nagar, Gadag-Betageri. Call +91 99645 91846.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
