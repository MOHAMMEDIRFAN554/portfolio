'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Download } from 'lucide-react';
import { animate, stagger, createScope } from 'animejs';
import { ClockTicker } from '../animations/clock-ticker';
import { apiClient } from '@/lib/api-client';

export function Hero() {
  const scopeRef = useRef<HTMLDivElement>(null);
  const [resumeUrl, setResumeUrl] = useState('#');
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await apiClient.getResume();
        if (response.data && response.data.fileUrl) {
          setResumeUrl(response.data.fileUrl);
        }
      } catch (error) {
        console.error('Failed to fetch resume:', error);
      }
    };
    fetchResume();
  }, []);

  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (resumeUrl === '#' || isDownloading) return;

    setIsDownloading(true);
    try {
      const base64Data = resumeUrl.split(',')[1];
      const binaryData = atob(base64Data);
      const arrayBuffer = new ArrayBuffer(binaryData.length);
      const uint8Array = new Uint8Array(arrayBuffer);

      for (let i = 0; i < binaryData.length; i++) {
        uint8Array[i] = binaryData.charCodeAt(i);
      }

      const blob = new Blob([uint8Array], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = 'Mohammed_Irfan_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download processing failed:', err);
      window.open(resumeUrl, '_blank');
    } finally {
      setIsDownloading(false);
    }
  };

  useEffect(() => {
    if (!scopeRef.current) return;

    const scope = createScope({
      mediaQueries: {
        portrait: '(orientation: portrait)',
      }
    }).add(({ matches }: any) => {
      const isPortrait = matches.portrait;
      animate('.decorative-circle', {
        y: isPortrait ? 0 : [-50, 50, -50],
        x: isPortrait ? [-50, 50, -50] : 0,
        duration: 5000,
        loop: true,
        direction: 'alternate',
        easing: 'easeInOutQuad',
        delay: stagger(500)
      });
    });

    return () => {
      // Anime.js v4 scope might use scope.revert() or cleanup automatically
      // Checking if remove exists or if we should just discard
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section ref={scopeRef} className="min-h-screen pt-32 pb-20 px-6 flex items-center relative overflow-hidden">
      {/* Background gradient effects - Premium Dark theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="aura-primary absolute top-[-10%] left-[-10%] w-[60%] h-[60%] opacity-40" />
        <div className="aura-secondary absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] opacity-30" />

        {/* Decorative elements for Anime.js targets */}
        <div className="decorative-circle absolute top-1/4 left-1/4 w-96 h-96 border border-white/5 rounded-full" />
        <div className="decorative-circle absolute bottom-1/4 right-1/4 w-[500px] h-[500px] border border-white/5 rounded-full opacity-50" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-10"
        >
          <div className="absolute -top-20 -right-20 pointer-events-none">
            <ClockTicker />
          </div>
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-2"
          >
            <motion.h2
              className="text-secondary text-sm font-black uppercase tracking-[0.4em] font-outfit"
              variants={itemVariants}
            >
              Mohammed Irfan
            </motion.h2>
            <motion.h1
              variants={itemVariants}
              className="text-7xl sm:text-8xl lg:text-9xl font-black leading-[0.9] tracking-tighter uppercase italic font-outfit"
            >
              Full Stack <br />
              <span className="gradient-text-vibrant">Developer</span>
            </motion.h1>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-xl sm:text-2xl text-muted-foreground max-w-3xl leading-relaxed font-light"
          >
            Production-ready systems with secure authentication, multi-tenant architecture, and payment-integrated applications.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-6 pt-4"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-12 py-6 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-xs hover:shadow-[0_0_50px_rgba(255,255,255,0.2)] transition-all"
            >
              View Projects
            </motion.a>

            {resumeUrl !== '#' && (
              <motion.button
                onClick={handleDownload}
                disabled={isDownloading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-12 py-6 rounded-2xl glass border-white/10 text-white font-black uppercase tracking-widest text-xs hover:border-primary/50 hover:bg-white/5 transition-all inline-flex items-center gap-3 disabled:opacity-50"
              >
                {isDownloading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Download size={16} />
                )}
                {isDownloading ? 'Processing...' : 'Download Resume'}
              </motion.button>
            )}
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-50"
      >
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_10px_rgba(139,92,246,0.8)]"
          />
        </div>
      </motion.div>

    </section>
  );
}
