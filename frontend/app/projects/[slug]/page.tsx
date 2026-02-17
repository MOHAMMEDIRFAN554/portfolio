'use client';

import { useEffect, useState, use } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import Link from 'next/link';
import { apiClient } from '@/lib/api-client';

interface ProjectDetail {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription?: string;
  overview: string;
  problemStatement?: string;
  solutionApproach?: string;
  architectureDetails?: string;
  challenges?: string;
  results?: string;
  role?: string;
  category?: string;
  timeline?: string;
  techStack: { name: string; icon: string }[];
  images: string[];
  liveUrl?: string;
  githubUrl?: string;
  projectType: 'case-study' | 'basic';
  createdAt: string;
}

export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projRes = await apiClient.getProjectBySlug(slug);
        setProject(projRes.data);
      } catch (error) {
        console.error('Failed to fetch data in ProjectPage:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/20">
        <Navbar />
        <div className="container mx-auto px-6 py-32 text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full mx-auto" />
        </div>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/20">
        <Navbar />
        <div className="container mx-auto px-6 py-32 text-center">
          <h1 className="text-3xl font-bold mb-4">Project not found</h1>
          <Link href="/" className="text-primary hover:underline">
            Return to home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#121212] selection:bg-primary/30">
      <Navbar />

      {/* Project Header */}
      <section className="pt-40 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-primary/10 via-transparent to-transparent opacity-50 blur-3xl" />

        <div className="container mx-auto max-w-5xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <Link href="/" className="group inline-flex items-center gap-2 text-white/40 hover:text-white transition-all text-sm font-bold uppercase tracking-widest font-mono">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              MI // BACK_TO_FLEET
            </Link>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] bg-primary/10 text-primary border border-primary/20">
                  {project.projectType.replace('-', ' ')}
                </span>
                <span className="text-white/20 font-mono text-xs">/ {new Date(project.createdAt).getFullYear()}</span>
              </div>
              <h1 className="text-6xl sm:text-8xl font-black tracking-tighter text-white uppercase italic leading-[0.9]">
                {project.title}
              </h1>
              <p className="text-2xl text-muted-foreground font-light max-w-3xl leading-relaxed">
                {project.shortDescription}
              </p>
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-3">
              {project.techStack.map(tech => (
                <div
                  key={tech.name}
                  className="px-6 py-3 rounded-2xl glass-card text-xs font-bold text-white uppercase tracking-widest flex items-center gap-3 border-white/5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(139,92,246,0.5)]" />
                  {tech.name}
                </div>
              ))}
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-6 pt-4">
              {project.liveUrl && (
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-4 px-10 py-5 rounded-2xl bg-primary text-white font-bold tracking-tight shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] transition-all uppercase text-sm"
                >
                  <ExternalLink size={18} />
                  Live Deployment
                </motion.a>
              )}
              {project.githubUrl && (
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-4 px-10 py-5 rounded-2xl glass-card text-white font-bold tracking-tight border-white/5 hover:border-primary/50 transition-all uppercase text-sm"
                >
                  <Github size={18} />
                  Source Repository
                </motion.a>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hero Image */}
      {project.images.length > 0 && (
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative aspect-[21/9] rounded-[3rem] overflow-hidden glass-card p-6 border-white/5"
            >
              <div className="w-full h-full rounded-[2rem] overflow-hidden bg-white/5">
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                />
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Project content */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="grid lg:grid-cols-3 gap-20">
            <div className="lg:col-span-2 space-y-16">
              {/* Overview Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <h2 className="text-4xl font-bold text-white tracking-tighter uppercase italic">The Vision</h2>
                <p className="text-xl text-muted-foreground font-light leading-relaxed whitespace-pre-wrap">
                  {project.overview}
                </p>
              </motion.div>

              {project.projectType === 'case-study' ? (
                <div className="grid gap-16 pt-16 border-t border-white/5">
                  {[
                    { title: 'The Problem', content: project.problemStatement },
                    { title: 'The Strategy', content: project.solutionApproach },
                    { title: 'Architecture Decisions', content: project.architectureDetails },
                    { title: 'Technical Challenges', content: project.challenges },
                    { title: 'The Results', content: project.results },
                  ].filter(item => item.content).map((item, i) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="space-y-6"
                    >
                      <h3 className="text-2xl font-bold text-white uppercase italic tracking-tighter">/ {item.title}</h3>
                      <p className="text-muted-foreground font-light text-lg leading-relaxed whitespace-pre-wrap">{item.content}</p>
                    </motion.div>
                  ))}
                </div>
              ) : (
                /* Basic Project View - Just use fullDescription if available, or overview */
                project.fullDescription && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="pt-16 border-t border-white/5"
                  >
                    <p className="text-muted-foreground font-light text-lg leading-relaxed whitespace-pre-wrap">
                      {project.fullDescription}
                    </p>
                  </motion.div>
                )
              )}
            </div>

            <aside className="space-y-12">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="glass-card p-10 rounded-[2.5rem] border-white/5 space-y-8 sticky top-32"
              >
                <div className="space-y-6">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Metadata</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-white/5">
                      <span className="text-xs text-white/40 uppercase tracking-widest font-bold">Role</span>
                      <span className="text-sm text-white font-medium">{project.role || 'Lead Engineer'}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-white/5">
                      <span className="text-xs text-white/40 uppercase tracking-widest font-bold">Category</span>
                      <span className="text-sm text-white font-medium">{project.category || 'Full Stack'}</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-xs text-white/40 uppercase tracking-widest font-bold">Timeline</span>
                      <span className="text-sm text-white font-medium">{project.timeline || 'Q1 2024'}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
                  <p className="text-xs text-primary/80 leading-relaxed font-medium text-center">
                    Available for similar architectural challenges.
                  </p>
                </div>
              </motion.div>
            </aside>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-20 rounded-[4rem] text-center space-y-8 relative overflow-hidden border-white/5"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-cyan-500/10 opacity-30" />
            <h2 className="text-5xl sm:text-7xl font-black tracking-tighter text-white uppercase italic relative z-10 leading-[0.9]">
              Let's build <br /> <span className="text-primary">The Future</span>
            </h2>
            <Link
              href="/#contact"
              className="inline-block px-12 py-6 rounded-full bg-white text-black font-black uppercase tracking-[0.2em] text-xs hover:scale-105 transition-transform relative z-10"
            >
              Start Project
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>

  );
}
