'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Mail, href: 'mailto:irfan@example.com', label: 'Email' },
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
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <footer className="py-20 px-6 bg-[#121212] border-t border-white/5">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          <div className="grid md:grid-cols-4 gap-12">
            <div className="md:col-span-2 space-y-6">
              <h3 className="text-3xl font-bold tracking-tighter text-white">
                Mohammed <span className="text-primary">Irfan</span>
              </h3>
              <p className="text-muted-foreground font-light text-lg max-w-xs leading-relaxed">
                Full Stack Engineer specializing in production-ready systems and high-fidelity interfaces.
              </p>
              <div className="flex gap-4">
                {socialLinks.map(link => {
                  const Icon = link.icon;
                  return (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      whileHover={{ y: -4, scale: 1.1 }}
                      className="w-12 h-12 rounded-2xl glass-card flex items-center justify-center text-white/50 hover:text-primary transition-colors"
                    >
                      <Icon size={20} />
                    </motion.a>
                  );
                })}
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-xs font-bold text-white/40 uppercase tracking-[0.2em]">Quick Links</h4>
              <nav className="flex flex-col gap-4">
                {['Home', 'About', 'Tech', 'Projects', 'Contact'].map(link => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    className="text-white/60 hover:text-primary transition-colors font-medium tracking-tight"
                  >
                    {link}
                  </a>
                ))}
              </nav>
            </div>

            <div className="space-y-6">
              <h4 className="text-xs font-bold text-white/40 uppercase tracking-[0.2em]">Services</h4>
              <div className="flex flex-col gap-4 text-white/60 font-medium tracking-tight">
                <span>Web Architecture</span>
                <span>API Engineering</span>
                <span>UI/UX Design</span>
                <span>DevOps</span>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-sm text-white/30 font-medium font-mono">
              © {currentYear} // SYSTEM_ENGINEERED_BY_MI
            </p>
            <div className="flex gap-8 text-xs font-bold text-white/20 uppercase tracking-widest">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>

  );
}
