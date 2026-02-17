'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { apiClient } from '@/lib/api-client';

interface Project {
  _id: string;
  title: string;
  shortDescription: string;
  images: string[];
  techStack: { name: string; icon: string }[];
  projectType: 'case-study' | 'basic';
  slug: string;
  featured: boolean;
}

export function FeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projRes = await apiClient.getProjects();
        const featured = projRes.data.filter((p: Project) => p.featured);
        setProjects(featured);
      } catch (error) {
        console.error('Failed to fetch data in FeaturedProjects:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section id="projects" ref={ref} className="py-32 px-6 relative bg-[#121212]">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-24 flex flex-col gap-4"
        >
          <span className="text-secondary text-xs font-black uppercase tracking-[0.4em] font-outfit">Selected Works</span>
          <h2 className="text-6xl sm:text-8xl font-black tracking-tighter uppercase italic font-outfit leading-none">
            Featured <span className="gradient-text-vibrant">Projects</span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="space-y-24"
        >
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full" />
            </div>
          ) : projects.length > 0 ? (
            projects.map((project, i) => (
              <motion.div
                key={project.slug}
                variants={itemVariants}
                className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'lg:direction-rtl' : ''}`}
              >
                <div className={`space-y-8 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 font-outfit">
                        {project.projectType.replace('-', ' ')} // 0{i + 1}
                      </span>
                    </div>
                    <h3 className="text-5xl sm:text-7xl font-black tracking-tighter text-white uppercase italic leading-[0.85] font-outfit">
                      {project.title}
                    </h3>
                    <p className="text-lg text-white/40 font-light leading-relaxed max-w-lg">
                      {project.shortDescription}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map(tech => (
                      <div key={tech.name} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-[9px] font-black text-white/50 uppercase tracking-widest hover:border-primary/30 hover:text-white transition-all duration-300">
                        {tech.name}
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-6 pt-4">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="group inline-flex items-center gap-6 px-10 py-5 rounded-2xl bg-white text-black font-black tracking-widest hover:bg-primary hover:text-white transition-all duration-500 uppercase text-[10px]"
                    >
                      {project.projectType === 'case-study' ? 'Analyze Case' : 'Explore System'}
                      <ArrowRight className="group-hover:translate-x-3 transition-transform duration-500" size={14} />
                    </Link>
                  </div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`relative aspect-[16/10] rounded-[3rem] overflow-hidden glass border-white/5 p-4 group ${i % 2 === 1 ? 'lg:order-1' : ''}`}
                >
                  <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-[#1a1a1a] flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-1000">
                    {project.images && project.images[0] ? (
                      <img
                        src={project.images[0]}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                      />
                    ) : (
                      <span className="text-8xl opacity-10">🚀</span>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                  </div>
                </motion.div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-20 text-muted-foreground uppercase tracking-widest text-xs font-bold">
              No featured projects found
            </div>
          )}
        </motion.div>
      </div>
    </section>

  );
}
