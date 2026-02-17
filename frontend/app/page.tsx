'use client';

import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { TechStack } from '@/components/sections/tech-stack';
import { FeaturedProjects } from '@/components/sections/featured-projects';
import { AllProjects } from '@/components/sections/all-projects';
import { Contact } from '@/components/sections/contact';
import { Footer } from '@/components/footer';
import { ParticleBackground } from '@/components/particle-background';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#121212] relative">
      <ParticleBackground />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <Navbar />
        <Hero />
        <About />
        <TechStack />
        <FeaturedProjects />
        <AllProjects />
        <Contact />
        <Footer />
      </motion.div>
    </main>
  );
}
