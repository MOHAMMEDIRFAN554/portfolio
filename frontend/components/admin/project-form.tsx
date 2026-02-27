'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus,
    Trash2,
    Save,
    ArrowLeft,
    Globe,
    Github,
    Layout,
    Info,
    CheckCircle2,
    AlertCircle,
    X,
    Upload,
    Image as ImageIcon
} from 'lucide-react';
import { FileUpload } from '@/components/ui/file-upload';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

const projectSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    slug: z.string().min(3, 'Slug must be at least 3 characters'),
    shortDescription: z.string().optional().or(z.literal('')),
    fullDescription: z.string().optional().or(z.literal('')),
    overview: z.string().optional().or(z.literal('')),
    problemStatement: z.string().optional().or(z.literal('')),
    solutionApproach: z.string().optional().or(z.literal('')),
    architectureDetails: z.string().optional().or(z.literal('')),
    challenges: z.string().optional().or(z.literal('')),
    results: z.string().optional().or(z.literal('')),
    role: z.string().optional(),
    category: z.string().optional(),
    timeline: z.string().optional(),
    projectType: z.enum(['basic', 'case-study']),
    techStack: z.array(z.object({
        name: z.string().min(1),
        icon: z.string().min(1)
    })).min(1, 'Add at least one technology'),
    images: z.array(z.string()).optional().default([]),
    githubUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
    liveUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
    featured: z.boolean().default(false),
    status: z.enum(['draft', 'published']).default('draft'),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

interface ProjectFormProps {
    initialData?: any;
    projectId?: string;
}

export function ProjectForm({ initialData, projectId }: ProjectFormProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUploadingImages, setIsUploadingImages] = useState(false);
    const [newTech, setNewTech] = useState('');
    const [newImage, setNewImage] = useState('');
    const [settings, setSettings] = useState<Record<string, string>>({});

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await apiClient.getSettings();
                setSettings(response.data);
            } catch (error) {
                console.error('Failed to fetch settings in ProjectForm:', error);
            }
        };
        fetchSettings();
    }, []);

    const form = useForm<ProjectFormValues>({
        resolver: zodResolver(projectSchema),
        defaultValues: initialData || {
            title: '',
            slug: '',
            shortDescription: '',
            fullDescription: '',
            overview: '',
            problemStatement: '',
            solutionApproach: '',
            architectureDetails: '',
            challenges: '',
            results: '',
            role: '',
            category: '',
            timeline: '',
            projectType: 'basic',
            techStack: [],
            images: [],
            githubUrl: '',
            liveUrl: '',
            featured: false,
            status: 'draft',
        },
    });

    const onSubmit = async (values: ProjectFormValues) => {
        setIsSubmitting(true);
        try {
            if (projectId) {
                await apiClient.updateProject(projectId, values);
                toast.success('Project updated successfully');
            } else {
                await apiClient.createProject(values);
                toast.success('Project created successfully');
            }
            router.push('/admin/dashboard');
            router.refresh();
        } catch (error: any) {
            toast.error(error.response?.data?.error || 'Something went wrong');
        } finally {
            setIsSubmitting(false);
        }
    };

    const addTech = () => {
        if (newTech && !form.getValues('techStack').some(t => t.name === newTech)) {
            // Default icon is just the name lowercase for now, or user can edit
            form.setValue('techStack', [...form.getValues('techStack'), { name: newTech, icon: newTech.toLowerCase() }]);
            setNewTech('');
        }
    };

    const removeTech = (techName: string) => {
        form.setValue('techStack', form.getValues('techStack').filter(t => t.name !== techName));
    };

    const addImage = () => {
        if (newImage && !form.getValues('images').includes(newImage)) {
            form.setValue('images', [...form.getValues('images'), newImage]);
            setNewImage('');
        }
    };

    const removeImage = (url: string) => {
        form.setValue('images', form.getValues('images').filter(u => u !== url));
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, (errors) => {
                console.error('Form validation errors:', errors);
                toast.error('Please check the form for missing required fields');
            })} className="space-y-12">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        <section className="space-y-8">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                    <Info size={20} />
                                </div>
                                <h2 className="text-2xl font-bold text-white uppercase tracking-tighter italic">Core Information</h2>
                            </div>

                            <div className="grid gap-6">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Project Title</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="e.g. Neural Architecture Search"
                                                    {...field}
                                                    className="h-14 bg-white/5 border-white/5 rounded-2xl focus:border-primary/50 text-white"
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        if (!projectId) {
                                                            form.setValue('slug', e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''));
                                                        }
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="slug"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">URL ID (Slug)</FormLabel>
                                            <FormControl>
                                                <Input placeholder="neural-architecture-search" {...field} className="h-14 bg-white/5 border-white/5 rounded-2xl focus:border-primary/50 text-white font-mono text-xs" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="shortDescription"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Mission Summary (Short)</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Briefly describe the objective..."
                                                    {...field}
                                                    className="min-h-[100px] bg-white/5 border-white/5 rounded-2xl focus:border-primary/50 text-white resize-none"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="overview"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Mission Overview</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="The grand vision and core objective..."
                                                    {...field}
                                                    className="min-h-[150px] bg-white/5 border-white/5 rounded-2xl focus:border-primary/50 text-white resize-none"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {form.watch('projectType') === 'case-study' ? (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="space-y-6"
                                    >
                                        <FormField
                                            control={form.control}
                                            name="problemStatement"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Problem Statement</FormLabel>
                                                    <FormControl>
                                                        <Textarea placeholder="What was the core challenge?" {...field} className="min-h-[150px] bg-white/5 border-white/5 rounded-2xl focus:border-primary/50 text-white resize-none" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="solutionApproach"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Solution Approach</FormLabel>
                                                    <FormControl>
                                                        <Textarea placeholder="How did you tackle it?" {...field} className="min-h-[150px] bg-white/5 border-white/5 rounded-2xl focus:border-primary/50 text-white resize-none" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="architectureDetails"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Architecture Details</FormLabel>
                                                    <FormControl>
                                                        <Textarea placeholder="Describe the technical setup..." {...field} className="min-h-[200px] bg-white/5 border-white/5 rounded-2xl focus:border-primary/50 text-white resize-none font-mono text-xs" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="challenges"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Technical Challenges</FormLabel>
                                                    <FormControl>
                                                        <Textarea placeholder="Roadblocks encountered..." {...field} className="min-h-[150px] bg-white/5 border-white/5 rounded-2xl focus:border-primary/50 text-white resize-none" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="results"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Impact & Results</FormLabel>
                                                    <FormControl>
                                                        <Textarea placeholder="Metrics, performance, and outcomes..." {...field} className="min-h-[150px] bg-white/5 border-white/5 rounded-2xl focus:border-primary/50 text-white resize-none" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </motion.div>
                                ) : (
                                    <FormField
                                        control={form.control}
                                        name="fullDescription"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Complete Description</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Detailed breakdown of the project..."
                                                        {...field}
                                                        className="min-h-[300px] bg-white/5 border-white/5 rounded-2xl focus:border-primary/50 text-white resize-none"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )}
                            </div>
                        </section>

                        <section className="space-y-8">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                                    <Layout size={20} />
                                </div>
                                <h2 className="text-2xl font-bold text-white uppercase tracking-tighter italic">Technical Stack & Media</h2>
                            </div>

                            <div className="space-y-8">
                                <FormItem>
                                    <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Technologies</FormLabel>
                                    <div className="flex gap-2">
                                        <Input
                                            value={newTech}
                                            onChange={(e) => setNewTech(e.target.value)}
                                            placeholder="e.g. Rust, PyTorch, Kubernetes"
                                            className="bg-white/5 border-white/5 rounded-2xl focus:border-primary/50 text-white h-12"
                                            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())}
                                        />
                                        <Button type="button" onClick={addTech} variant="secondary" className="h-12 rounded-2xl px-6 bg-white/10 hover:bg-white/20 text-white">
                                            Add
                                        </Button>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-4">
                                        <AnimatePresence>
                                            {form.watch('techStack').map((tech) => (
                                                <motion.span
                                                    key={tech.name}
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.8 }}
                                                    className="px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 text-white text-xs font-bold flex items-center gap-2 group"
                                                >
                                                    <span className="opacity-50 text-[10px] font-mono">{tech.icon}</span>
                                                    {tech.name}
                                                    <button type="button" onClick={() => removeTech(tech.name)}>
                                                        <X size={14} className="text-white/20 group-hover:text-red-400 transition-colors" />
                                                    </button>
                                                </motion.span>
                                            ))}
                                        </AnimatePresence>
                                    </div>
                                    <FormMessageMap name="techStack" form={form} />
                                </FormItem>

                                <FormItem>
                                    <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Visual Assets (Direct Upload)</FormLabel>
                                    <FileUpload
                                        label="Transmit New Binary Asset"
                                        subLabel="Base64 Image Upload"
                                        loading={isUploadingImages}
                                        onUpload={async (base64) => {
                                            setIsUploadingImages(true);
                                            try {
                                                const res = await apiClient.uploadImages([base64]);
                                                const url = res.data[0];
                                                if (!form.getValues('images').includes(url)) {
                                                    form.setValue('images', [...form.getValues('images'), url]);
                                                }
                                            } catch (err) {
                                                console.error('Failed to upload image:', err);
                                                alert('Failed to upload image');
                                            } finally {
                                                setIsUploadingImages(false);
                                            }
                                        }}
                                    />

                                    <div className="flex gap-2 mt-6">
                                        <Input
                                            value={newImage}
                                            onChange={(e) => setNewImage(e.target.value)}
                                            placeholder="Or paste external URL..."
                                            className="bg-white/5 border-white/5 rounded-2xl focus:border-primary/50 text-white h-12"
                                            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addImage())}
                                        />
                                        <Button type="button" onClick={addImage} variant="secondary" className="h-12 rounded-2xl px-6 bg-white/10 hover:bg-white/20 text-white">
                                            Add
                                        </Button>
                                    </div>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                                        <AnimatePresence>
                                            {form.watch('images').map((url) => (
                                                <motion.div
                                                    key={url}
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.8 }}
                                                    className="relative aspect-video rounded-2xl overflow-hidden glass-card group border-white/5"
                                                >
                                                    <img src={url} alt="Preview" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all" />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeImage(url)}
                                                        className="absolute top-2 right-2 p-2 rounded-xl bg-black/50 text-white/50 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    </div>
                                    <FormMessageMap name="images" form={form} />
                                </FormItem>
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <aside className="space-y-8">
                        <div className="glass-card p-10 rounded-[2.5rem] border-white/5 space-y-10 sticky top-32">
                            <section className="space-y-6">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Status & Logistics</h4>

                                <div className="space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="projectType"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Asset Class</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="h-12 bg-white/5 border-white/5 rounded-2xl text-white">
                                                            <SelectValue placeholder="Select type" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className="bg-[#1a1a1a] border-white/5 text-white rounded-2xl">
                                                        <SelectItem value="basic">Deployment (Project)</SelectItem>
                                                        <SelectItem value="case-study">Deep Dive (Case Study)</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="status"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Deployment Status</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="h-12 bg-white/5 border-white/5 rounded-2xl text-white">
                                                            <SelectValue placeholder="Select status" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className="bg-[#1a1a1a] border-white/5 text-white rounded-2xl">
                                                        <SelectItem value="draft">In Development (Draft)</SelectItem>
                                                        <SelectItem value="published">Production (Published)</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="space-y-4 pt-4 border-t border-white/5">
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Project Metadata</h4>
                                        <FormField
                                            control={form.control}
                                            name="role"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Role</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="e.g. Lead Engineer" {...field} className="h-12 bg-white/5 border-white/5 rounded-2xl focus:border-primary/50 text-white text-xs" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="category"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Category</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="e.g. Full Stack" {...field} className="h-12 bg-white/5 border-white/5 rounded-2xl focus:border-primary/50 text-white text-xs" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="timeline"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Timeline</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="e.g. Q1 2024" {...field} className="h-12 bg-white/5 border-white/5 rounded-2xl focus:border-primary/50 text-white text-xs" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <FormField
                                        control={form.control}
                                        name="featured"
                                        render={({ field }) => (
                                            <FormItem className="flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/5">
                                                <div className="space-y-0.5">
                                                    <FormLabel className="text-sm font-bold text-white uppercase italic tracking-tighter">Promote Asset</FormLabel>
                                                    <FormDescription className="text-xs text-white/30 uppercase tracking-widest font-mono">Set as featured project</FormDescription>
                                                </div>
                                                <FormControl>
                                                    <Switch
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                        className="data-[state=checked]:bg-primary"
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </section>

                            <section className="space-y-6">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400">External Links</h4>
                                <div className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="githubUrl"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="relative group">
                                                    <Github className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-primary transition-colors" />
                                                    <Input placeholder="GitHub Source" {...field} className="h-12 pl-12 bg-white/5 border-white/5 rounded-2xl text-xs text-white" />
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="liveUrl"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="relative group">
                                                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-cyan-400 transition-colors" />
                                                    <Input placeholder="Live Deployment" {...field} className="h-12 pl-12 bg-white/5 border-white/5 rounded-2xl text-xs text-white" />
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </section>

                            <div className="pt-6">
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full h-16 rounded-2xl bg-primary text-white font-black uppercase tracking-[0.2em] text-xs shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] transition-all"
                                >
                                    {isSubmitting ? (
                                        'Finalizing...'
                                    ) : (
                                        <>
                                            <Save className="mr-3 h-4 w-4" />
                                            Commit Change
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </aside>
                </div>
            </form>
        </Form>
    );
}

function FormMessageMap({ name, form }: { name: any, form: any }) {
    const error = form.formState.errors[name];
    if (!error) return null;
    return (
        <p className="text-[0.8rem] font-medium text-destructive mt-2">
            {error.message?.toString()}
        </p>
    );
}
