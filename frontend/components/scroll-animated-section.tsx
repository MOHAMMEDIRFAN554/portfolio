'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface ScrollAnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
}

export function ScrollAnimatedSection({ children, className = '' }: ScrollAnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -50]);

  return (
    <motion.div
      ref={ref}
      style={{
        opacity,
        scale,
        y,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
