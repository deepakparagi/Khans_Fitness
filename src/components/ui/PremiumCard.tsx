'use client';

import { motion } from 'framer-motion';

interface PremiumCardProps {
  children: React.ReactNode;
  className?: string;
  isOptimal?: boolean;
}

export function PremiumCard({ children, className = "", isOptimal = false }: PremiumCardProps) {
  return (
    <motion.div
      whileHover={{ 
        scale: 1.02,
        y: -5,
        transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] } // Custom luxury ease
      }}
      className={`relative flex flex-col p-8 border transition-shadow duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] ${
        isOptimal 
          ? 'border-[2px] border-[var(--acid)] dark:bg-[#0D1500] bg-[#E8FF80]' 
          : 'border-[var(--border)] bg-[var(--surface)]'
      } ${className}`}
    >
      {children}
    </motion.div>
  );
}
