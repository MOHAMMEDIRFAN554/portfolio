'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Database, Server, Zap } from 'lucide-react';

export function TechStack() {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const technologies = {
    Frontend: [
      { name: 'React', icon: '⚛️' },
      { name: 'TypeScript', icon: '📘' },
      { name: 'Next.js', icon: '▲' },
      { name: 'Tailwind CSS', icon: '🎨' },
      { name: 'Framer Motion', icon: '✨' },
      { name: 'Redux', icon: '🔴' },
    ],
    Backend: [
      { name: 'Node.js', icon: '🟩' },
      { name: 'Express', icon: '🚂' },
      { name: 'REST API', icon: '🔌' },
      { name: 'GraphQL', icon: '📊' },
      { name: 'Authentication', icon: '🔐' },
      { name: 'JWT', icon: '🎫' },
    ],
    Database: [
      { name: 'MongoDB', icon: '🍃' },
      { name: 'PostgreSQL', icon: '🐘' },
      { name: 'Redis', icon: '🔴' },
      { name: 'Firebase', icon: '🔥' },
      { name: 'Mongoose', icon: '📦' },
      { name: 'Prisma', icon: '🔶' },
    ],
    Tools: [
      { name: 'Git', icon: '📦' },
      { name: 'Docker', icon: '🐳' },
      { name: 'AWS', icon: '☁️' },
      { name: 'Vercel', icon: '▲' },
      { name: 'Figma', icon: '🎨' },
      { name: 'VS Code', icon: '💻' },
    ],
  };

  const categories = [
    { key: 'Frontend', icon: Code },
    { key: 'Backend', icon: Server },
    { key: 'Database', icon: Database },
    { key: 'Tools', icon: Zap },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="tech" ref={ref} className="py-32 px-6 bg-[#121212]">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-24 flex flex-col gap-4"
        >
          <span className="text-secondary text-xs font-black uppercase tracking-[0.4em] font-outfit">The Arsenal</span>
          <h2 className="text-6xl sm:text-8xl font-black tracking-tighter uppercase italic font-outfit leading-none">
            Core <span className="gradient-text-vibrant">Technologies</span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {[
            {
              category: 'Frontend',
              techs: [
                { name: 'Next.js', icon: '▲' },
                { name: 'React', icon: '⚛️' },
                { name: 'TailwindCSS', icon: '🎨' },
                { name: 'Framer Motion', icon: '✨' },
              ],
            },
            {
              category: 'Backend',
              techs: [
                { name: 'Node.js', icon: '🟩' },
                { name: 'Express', icon: '🚂' },
                { name: 'JWT Auth', icon: '🔐' },
                { name: 'Bcrypt', icon: '🔑' },
              ],
            },
            {
              category: 'Database',
              techs: [
                { name: 'MongoDB', icon: '🍃' },
                { name: 'Mongoose', icon: '📦' },
                { name: 'Aggregation', icon: '🔍' },
              ],
            },
            {
              category: 'Payments',
              techs: [
                { name: 'Stripe', icon: '💳' },
                { name: 'Razorpay', icon: '💰' },
              ],
            },
            {
              category: 'Deployment',
              techs: [
                { name: 'Docker', icon: '🐳' },
                { name: 'Vercel', icon: '▲' },
                { name: 'Render', icon: '🚀' },
                { name: 'Railway', icon: '🚂' },
              ],
            },
          ].map((group) => (
            <motion.div
              key={group.category}
              variants={itemVariants}
              className="glass p-10 space-y-8 rounded-[2.5rem] border-white/5 hover:border-primary/30 transition-all duration-700 group/card"
            >
              <h3 className="text-sm font-black text-white/40 uppercase tracking-[0.3em] font-outfit border-b border-white/5 pb-6 group-hover/card:text-primary transition-colors">
                {group.category}
              </h3>
              <div className="grid grid-cols-2 gap-6">
                {group.techs.map((tech) => (
                  <div key={tech.name} className="flex flex-col gap-2 group/item">
                    <span className="text-3xl grayscale group-hover/item:grayscale-0 transition-all duration-500 scale-100 group-hover/item:scale-110">
                      {tech.icon}
                    </span>
                    <span className="text-[10px] font-black text-white/20 uppercase tracking-widest group-hover/item:text-white transition-colors">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>

  );
}
