'use client';

import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { ProjectForm } from '@/components/admin/project-form';

export default function NewProjectPage() {
    return (
        <div className="min-h-screen bg-[#121212] selection:bg-primary/30 pb-20">
            <div className="pt-32 px-6">
                <div className="container mx-auto max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-12"
                    >
                        <div className="space-y-6">
                            <Link
                                href="/admin/dashboard"
                                className="group inline-flex items-center gap-2 text-white/40 hover:text-white transition-all text-[10px] font-black uppercase tracking-[0.2em] font-mono"
                            >
                                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                                MI // BACK_TO_COMMAND
                            </Link>

                            <div className="space-y-2">
                                <h1 className="text-5xl font-black tracking-tighter text-white uppercase italic">
                                    New <span className="text-primary">Asset</span>
                                </h1>
                                <p className="text-[10px] text-white/20 font-bold uppercase tracking-[0.4em]">Registering new unit into fleet</p>
                            </div>
                        </div>

                        <ProjectForm />
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
