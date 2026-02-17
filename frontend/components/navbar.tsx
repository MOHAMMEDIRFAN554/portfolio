'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#' },
    { label: 'About', href: '#about' },
    { label: 'Tech', href: '#tech-stack' },
    { label: 'Projects', href: '#all-projects' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'py-4' : 'py-8'
        }`}
    >
      <div className="container mx-auto px-6">
        <div className={`flex items-center justify-between px-8 py-3 rounded-2xl transition-all duration-700 border ${isScrolled
          ? 'glass border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]'
          : 'bg-transparent border-transparent'
          }`}>
          <Link href="/" className="flex items-center gap-4 group">
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary transition-all duration-500">
              <span className="text-[10px] font-black text-white tracking-widest leading-none">MI</span>
            </div>
            <span className="hidden sm:inline font-black text-white tracking-tighter text-sm uppercase italic font-outfit">
              Mohammed <span className="text-white/20 group-hover:text-primary/50 transition-colors">Irfan</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-white transition-all relative group font-outfit"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-500 rounded-full" />
              </motion.a>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden lg:inline-block px-8 py-3 rounded-xl bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] hover:bg-primary hover:text-white transition-all"
            >
              Get in touch
            </motion.a>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-3 glass-card rounded-2xl text-white hover:glow-violet transition-all"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 w-full px-6 py-4"
          >
            <div className="glass-card rounded-[2rem] p-8 space-y-6">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-xl font-bold text-white/60 hover:text-white transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="block w-full py-4 text-center rounded-2xl bg-primary text-white font-bold"
              >
                Let's Talk
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
