'use client';

import { useState, useEffect, use } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { ProjectForm } from '@/components/admin/project-form';
import { apiClient } from '@/lib/api-client';

export default function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [project, setProject] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                // Need to get project by ID, but apiClient only has getProjectBySlug
                // I'll check all projects and find the one with this ID if no getProjectById exists
                // Or I can add getProjectById to apiClient
                const response = await apiClient.getProjects();
                const found = response.data.find((p: any) => p._id === id);
                if (found) {
                    setProject(found);
                } else {
                    setError('Project not found');
                }
            } catch (err) {
                setError('Failed to fetch project');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProject();
    }, [id]);

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
                                    Modify <span className="text-primary">Asset</span>
                                </h1>
                                <p className="text-[10px] text-white/20 font-bold uppercase tracking-[0.4em]">Optimizing core parameters // ID: {id}</p>
                            </div>
                        </div>

                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center py-40 gap-4">
                                <Loader2 className="w-10 h-10 text-primary animate-spin" />
                                <p className="text-xs font-black text-white/20 uppercase tracking-widest">Accessing records...</p>
                            </div>
                        ) : error ? (
                            <div className="text-center py-40">
                                <p className="text-red-400 font-bold uppercase tracking-widest">{error}</p>
                                <Link href="/admin/dashboard" className="text-primary hover:underline mt-4 inline-block">Return to dashboard</Link>
                            </div>
                        ) : (
                            <ProjectForm initialData={project} projectId={id} />
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
