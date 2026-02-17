'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useRef } from 'react';
import { createDraggable, createSpring } from 'animejs';

export function About() {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const draggableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!draggableRef.current) return;

    const draggable = createDraggable('.draggable-icon', {
      releaseEase: createSpring({
        stiffness: 120,
        damping: 6,
      })
    });

    return () => {
      // draggable.remove() or similar cleanup if available in v4
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section id="about" ref={ref} className="py-32 px-6 relative bg-[#121212]">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          <motion.div variants={itemVariants} className="space-y-12">
            <div className="flex flex-col gap-4">
              <span className="text-secondary text-xs font-black uppercase tracking-[0.4em] font-outfit">The Artisan</span>
              <h2 className="text-7xl sm:text-8xl font-black tracking-tighter uppercase italic font-outfit leading-none">
                About <span className="gradient-text-vibrant">Me</span>
              </h2>
            </div>

            <div className="space-y-8 text-lg text-white/40 font-light leading-relaxed">
              <p>
                As a <span className="text-white font-black italic">Full Stack Engineer</span>, I specialize in building high-performance, production-ready systems. My approach is rooted in an engineering-first mindset, prioritizing robust architecture, scalability, and security in every line of code.
              </p>

              <p>
                I thrive on <span className="text-white font-black italic">Backend Architecture</span>—crafting efficient APIs, optimizing database schemas (MongoDB), and ensuring seamless data flow across distributed systems.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Excellence', value: '100%', sub: 'Pure Quality' },
                { label: 'Efficiency', value: 'Fast', sub: 'Optimized' },
                { label: 'Security', value: 'Top', sub: 'Enterprise' },
                { label: 'Uptime', value: '99.9%', sub: 'Reliable' },
              ].map((stat) => (
                <div key={stat.label} className="glass border-white/5 p-8 rounded-[2rem] flex flex-col gap-1 group hover:border-primary/30 transition-all duration-500">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/20 group-hover:text-primary transition-colors">{stat.label}</span>
                  <span className="text-4xl font-black text-white font-outfit italic tracking-tighter">{stat.value}</span>
                  <span className="text-[9px] font-medium text-white/10 uppercase tracking-widest">{stat.sub}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="relative"
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden glass-card glow-violet flex items-center justify-center group">
              <motion.div
                animate={{
                  rotate: [0, 90, 180, 270, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 opacity-10 bg-gradient-to-tr from-primary via-secondary to-primary blur-2xl"
              />
              <div className="z-10 text-center space-y-4 draggable-icon cursor-grab active:cursor-grabbing">
                <div className="text-8xl filter drop-shadow-[0_0_20px_rgba(139,92,246,0.5)]">⚙️</div>
                <div className="text-muted-foreground font-mono text-sm tracking-widest opacity-50 group-hover:opacity-100 transition-opacity">
                  ENGINEERING_MINDSET
                </div>
              </div>
            </div>

            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary/20 rounded-full blur-3xl" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
          </motion.div>
        </motion.div>
      </div>
    </section>

  );
}
