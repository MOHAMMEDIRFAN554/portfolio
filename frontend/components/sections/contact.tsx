'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Send, Mail, MapPin } from 'lucide-react';
import { apiClient } from '@/lib/api-client';

export function Contact() {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await apiClient.submitContact(formData.name, formData.email, formData.message);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('Failed to submit contact form', error);
    } finally {
      setIsLoading(false);
    }
  };

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
    <section id="contact" ref={ref} className="py-32 px-6 relative bg-[#121212]">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="space-y-16"
        >
          <div className="text-center flex flex-col items-center gap-4">
            <span className="text-secondary text-xs font-black uppercase tracking-[0.4em] font-outfit">Open for Collaboration</span>
            <h2 className="text-6xl sm:text-8xl font-black tracking-tighter uppercase italic font-outfit leading-none">
              Get In <span className="gradient-text-vibrant">Touch</span>
            </h2>
            <p className="text-white/40 font-light text-lg max-w-2xl mx-auto italic">
              "Great things are built through collaboration. Let's create something extraordinary together."
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              {[
                { icon: Mail, label: 'Email', value: 'irfan@example.com', href: 'mailto:irfan@example.com', color: 'text-violet-400' },
                { icon: MapPin, label: 'Location', value: 'India', href: '#', color: 'text-cyan-400' },
                { icon: Send, label: 'Status', value: 'Available for hire', href: '#', color: 'text-emerald-400' },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.a
                    key={i}
                    href={item.href}
                    variants={itemVariants}
                    className="flex items-center gap-6 p-8 rounded-[2rem] glass border-white/5 group hover:border-primary/30 transition-all duration-500"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-primary transition-colors">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] font-outfit">{item.label}</h3>
                      <p className="text-lg font-black text-white tracking-tight italic font-outfit">{item.value}</p>
                    </div>
                  </motion.a>
                );
              })}
            </div>

            {/* Contact Form */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-3 glass-card p-10 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32" />

              <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/5 text-white placeholder:text-white/20 focus:border-primary focus:ring-4 focus:ring-primary/20 focus:outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                      className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/5 text-white placeholder:text-white/20 focus:border-primary focus:ring-4 focus:ring-primary/20 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell me about your project..."
                    className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/5 text-white placeholder:text-white/20 focus:border-primary focus:ring-4 focus:ring-primary/20 focus:outline-none transition-all resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-6 rounded-[2rem] bg-white text-black font-black tracking-[0.2em] hover:bg-primary hover:text-white transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed uppercase text-[10px]"
                >
                  {isLoading ? 'Dispatched...' : 'Send Message'}
                </motion.button>

                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium text-center"
                  >
                    🚀 Message dispatched! I'll get back to you shortly.
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>

  );
}
