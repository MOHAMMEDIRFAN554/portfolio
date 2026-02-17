'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { apiClient } from '@/lib/api-client';

interface Project {
  _id: string;
  title: string;
  shortDescription: string;
  techStack: { name: string; icon: string }[];
  projectType: 'case-study' | 'basic';
  slug: string;
  githubUrl?: string;
  liveUrl?: string;
  images: string[];
}

export function AllProjects() {
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await apiClient.getProjects();
        setAllProjects(response.data);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = filter === 'all'
    ? allProjects
    : allProjects.filter(p => p.projectType === filter);

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section id="all-projects" ref={ref} className="py-32 px-6 bg-[#121212]">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-24 flex flex-col gap-8"
        >
          <div className="flex flex-col gap-4">
            <span className="text-secondary text-xs font-black uppercase tracking-[0.4em] font-outfit">The Ecosystem</span>
            <h2 className="text-6xl sm:text-8xl font-black tracking-tighter uppercase italic font-outfit leading-none">
              Other <span className="gradient-text-vibrant">Initiatives</span>
            </h2>
          </div>

          <div className="flex gap-4 flex-wrap">
            {['all', 'case-study', 'basic'].map(f => (
              <motion.button
                key={f}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(f)}
                className={`px-8 py-3 rounded-xl font-black tracking-[0.2em] transition-all text-[10px] uppercase border ${filter === f
                  ? 'bg-white text-black border-white shadow-[0_0_30px_rgba(255,255,255,0.2)]'
                  : 'glass text-white/40 hover:text-white border-white/5'
                  }`}
              >
                {f === 'all' ? 'Entire Fleet' : f === 'case-study' ? 'Deep Dives' : 'Core Tools'}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full" />
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map(project => (
                <motion.div
                  layout
                  variants={itemVariants}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="group glass hover:border-primary/30 transition-all duration-700 overflow-hidden relative rounded-[2.5rem]"
                >
                  <div className="p-10 space-y-10">
                    <div className="space-y-6">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary font-outfit">
                          {project.projectType.replace('-', ' ')}
                        </span>
                        <span className="text-white/5 font-black text-[10px] font-outfit">REV // 26</span>
                      </div>
                      <h3 className="text-3xl font-black text-white group-hover:text-primary transition-colors uppercase italic tracking-tighter font-outfit leading-none">
                        {project.title}
                      </h3>
                      <p className="text-white/30 font-light text-sm line-clamp-2 leading-relaxed italic">
                        {project.shortDescription}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map(tech => (
                        <span key={tech.name} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-[9px] font-black text-white/30 uppercase tracking-widest group-hover:text-white/60 transition-colors">
                          {tech.name}
                        </span>
                      ))}
                    </div>

                    <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                      <div className="flex gap-6">
                        {project.githubUrl && (
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-white/20 hover:text-white transition-colors">
                            <Github size={16} />
                          </a>
                        )}
                        {project.liveUrl && (
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-white/20 hover:text-white transition-colors">
                            <ExternalLink size={16} />
                          </a>
                        )}
                      </div>
                      <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-white transition-all group/link font-outfit"
                      >
                        ANALYZE
                        <ArrowRight size={12} className="group-hover/link:translate-x-2 transition-transform duration-500" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>

  );
}
