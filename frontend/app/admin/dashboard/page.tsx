'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/navbar';
import { LogOut, Plus, Trash2, Eye, Upload, FileText, Settings as SettingsIcon } from 'lucide-react';
import { apiClient } from '@/lib/api-client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FileUpload } from '@/components/ui/file-upload';

interface Project {
  _id: string;
  title: string;
  slug: string;
  projectType: string;
  featured: boolean;
  status: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('projects');

  const [resumeUrlInput, setResumeUrlInput] = useState('');
  const [resumeFileName, setResumeFileName] = useState('');
  const [currentResume, setCurrentResume] = useState<any>(null);
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [isUploadingResume, setIsUploadingResume] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [projRes, msgRes, resumeRes, settingsRes] = await Promise.all([
          apiClient.getProjects(),
          apiClient.getContactMessages(),
          apiClient.getResume().catch(() => ({ data: null })),
          apiClient.getSettings().catch(() => ({ data: {} }))
        ]);
        setProjects(projRes.data);
        setMessages(msgRes.data);
        setCurrentResume(resumeRes.data);
        setSettings(settingsRes.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      await apiClient.logout();
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await apiClient.deleteProject(id);
        setProjects(projects.filter(p => p._id !== id));
      } catch (error) {
        console.error('Failed to delete project:', error);
      }
    }
  };

  const handleToggleFeatured = async (id: string) => {
    try {
      await apiClient.toggleFeatured(id);
      setProjects(projects.map(p =>
        p._id === id ? { ...p, featured: !p.featured } : p
      ));
    } catch (error) {
      console.error('Failed to toggle featured:', error);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      await apiClient.markMessageAsRead(id);
      setMessages(messages.map(m => m._id === id ? { ...m, read: true } : m));
    } catch (error) {
      console.error('Failed to mark message as read:', error);
    }
  };

  const handleResumeSubmit = async () => {
    if (!resumeUrlInput || !resumeFileName) {
      alert('Please provide both URL and Version Identity');
      return;
    }
    try {
      await apiClient.uploadResume(resumeUrlInput);
      alert('Resume updated successfully');
      setResumeUrlInput('');
      setResumeFileName('');
      const response = await apiClient.getResume();
      setCurrentResume(response.data);
    } catch (error) {
      console.error('Failed to update resume:', error);
    }
  };

  const handleDeleteResume = async (id: string) => {
    if (confirm('Are you sure you want to delete this resume?')) {
      try {
        await apiClient.deleteResume(id);
        setCurrentResume(null);
      } catch (error) {
        console.error('Failed to delete resume:', error);
      }
    }
  };

  const handleUpdateSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingSettings(true);
    try {
      await apiClient.updateSettings(settings);
      alert('Settings updated successfully');
    } catch (error) {
      console.error('Failed to update settings:', error);
      alert('Failed to update settings');
    } finally {
      setIsSavingSettings(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] selection:bg-primary/30">
      <Navbar />

      <div className="pt-40 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-primary/10 via-transparent to-transparent opacity-50 blur-3xl" />

        <div className="container mx-auto max-w-6xl relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-16"
          >
            <div>
              <h1 className="text-5xl font-black tracking-tighter text-white uppercase italic mb-2">
                Central <span className="text-primary">Command</span>
              </h1>
              <p className="text-xs font-bold text-white/30 uppercase tracking-[0.2em] font-mono">
                MI // SYSTEM_ORCHESTRATION_LAYER
              </p>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
              <motion.button
                onClick={handleLogout}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 md:flex-none inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl glass-card text-white/50 hover:text-red-400 hover:border-red-400/30 transition-all font-bold uppercase text-[10px] tracking-widest border-white/5"
              >
                <LogOut size={16} />
                Terminate Session
              </motion.button>
            </div>
          </motion.div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 p-1.5 rounded-[2rem] bg-white/5 border border-white/5 w-fit mb-12">
            {['projects', 'messages', 'resume', 'settings'].map(tab => (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-3 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.2em] transition-all relative ${activeTab === tab
                  ? 'bg-primary text-white shadow-[0_0_20px_rgba(139,92,246,0.3)]'
                  : 'text-white/40 hover:text-white'
                  }`}
              >
                {tab}
                {tab === 'messages' && messages.filter(m => !m.read).length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[8px] flex items-center justify-center text-white border-2 border-[#121212]">
                    {messages.filter(m => !m.read).length}
                  </span>
                )}
              </motion.button>
            ))}
          </div>

          <main className="space-y-12">
            {/* Projects Tab */}
            {activeTab === 'projects' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-bold text-white uppercase tracking-tighter italic">Fleet Assets</h2>
                    <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest">{projects.length} Total Units</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => router.push('/admin/dashboard/projects/new')}
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-[10px] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all"
                  >
                    <Plus size={16} />
                    Deploy Asset
                  </motion.button>
                </div>

                {isLoading ? (
                  <div className="flex items-center justify-center py-32">
                    <div className="w-12 h-12 rounded-full border-t-2 border-primary animate-spin" />
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {projects.map((project, i) => (
                      <motion.div
                        key={project._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="p-6 rounded-[2rem] glass-card border-white/5 hover:border-primary/30 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 group relative overflow-hidden"
                      >
                        <div className="flex items-center gap-6">
                          <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                            {project.projectType === 'case-study' ? '🚀' : '📦'}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{project.title}</h3>
                            <div className="flex items-center gap-4 mt-1">
                              <span className="text-[10px] font-black uppercase tracking-widest text-white/30">{project.projectType}</span>
                              <span className="w-1 h-1 rounded-full bg-white/10" />
                              <span className={`text-[10px] font-black uppercase tracking-widest ${project.status === 'published' ? 'text-emerald-400' : 'text-amber-400'
                                }`}>{project.status}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 w-full sm:w-auto">
                          <button
                            onClick={() => handleToggleFeatured(project._id)}
                            className={`flex-1 sm:flex-none p-4 rounded-2xl transition-all border ${project.featured
                              ? 'bg-amber-500/10 border-amber-500/20 text-amber-500'
                              : 'bg-white/5 border-white/5 text-white/20 hover:text-white'
                              }`}
                            title="Feature"
                          >
                            <Plus size={18} className={project.featured ? 'rotate-45' : ''} />
                          </button>
                          <button
                            onClick={() => router.push(`/admin/dashboard/projects/${project._id}`)}
                            className="flex-1 sm:flex-none p-4 rounded-2xl bg-white/5 border border-white/5 text-white/20 hover:text-white hover:border-primary/30 transition-all"
                            title="Edit"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(project._id)}
                            className="flex-1 sm:flex-none p-4 rounded-2xl bg-white/5 border border-white/5 text-white/20 hover:text-red-500 hover:border-red-500/30 transition-all"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Messages Tab */}
            {activeTab === 'messages' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-bold text-white uppercase tracking-tighter italic">Signal Streams</h2>
                    <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest">{messages.length} Incoming Transmissions</p>
                  </div>
                </div>

                <div className="grid gap-6">
                  {messages.length === 0 ? (
                    <div className="py-32 text-center space-y-4 glass-card rounded-[3rem] border-dashed border-white/10">
                      <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
                        <div className="w-3 h-3 rounded-full bg-primary animate-ping" />
                      </div>
                      <h3 className="text-xl font-bold text-white uppercase italic tracking-tighter">Monitoring Incoming Streams</h3>
                      <p className="text-[10px] text-white/20 font-bold uppercase tracking-[0.2em]">Signal detection active. No results recorded.</p>
                    </div>
                  ) : (
                    messages.map((msg, i) => (
                      <motion.div
                        key={msg._id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className={`p-8 rounded-[2.5rem] glass-card border-white/5 transition-all relative overflow-hidden ${!msg.read ? 'border-primary/20 glow-violet' : ''
                          }`}
                      >
                        <div className="flex flex-col md:flex-row justify-between gap-6">
                          <div className="space-y-4 flex-1">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-xl font-bold text-white">
                                {msg.name.charAt(0)}
                              </div>
                              <div>
                                <h3 className="font-bold text-white">{msg.name}</h3>
                                <p className="text-[10px] text-white/30 uppercase tracking-widest">{msg.email}</p>
                              </div>
                            </div>
                            <p className="text-white/60 text-sm leading-relaxed">{msg.message}</p>
                            <p className="text-[10px] text-white/10 font-mono italic">
                              REC_TIMESTAMP: {new Date(msg.createdAt).toLocaleString()}
                            </p>
                          </div>
                          <div className="flex items-start">
                            {!msg.read && (
                              <button
                                onClick={() => handleMarkAsRead(msg._id)}
                                className="px-6 py-3 rounded-2xl bg-primary text-white text-[10px] font-black uppercase tracking-widest shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:scale-105 transition-all"
                              >
                                Decrypt & Archive
                              </button>
                            )}
                            {msg.read && (
                              <span className="px-6 py-3 rounded-2xl bg-white/5 text-white/20 text-[10px] font-black uppercase tracking-widest border border-white/5">
                                Archived
                              </span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </motion.div>
            )}

            {/* Resume Tab */}
            {activeTab === 'resume' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-12"
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-bold text-white uppercase tracking-tighter italic">Resume Repository</h2>
                    <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest">Binary Payload Management</p>
                  </div>
                </div>

                <div className="glass-card p-12 rounded-[3.5rem] border-white/5 space-y-10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-[100px] -mr-32 -mt-32" />

                  <div className="grid md:grid-cols-2 gap-12 relative z-10">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-white uppercase italic tracking-tighter">Current Deployment</h3>
                        <p className="text-sm text-white/40 leading-relaxed">Modify the active resume version by uploading a new binary asset.</p>
                      </div>

                      <FileUpload
                        label="Transmit New Payload"
                        subLabel="Base64 Resume Upload"
                        accept="application/pdf"
                        loading={isUploadingResume}
                        onUpload={async (base64) => {
                          setIsUploadingResume(true);
                          try {
                            await apiClient.uploadResume(base64);
                            alert('Resume uploaded and committed successfully');
                            const res = await apiClient.getResume();
                            setCurrentResume(res.data);
                          } catch (err: any) {
                            console.error('Failed to commit resume:', err);
                            alert(err.response?.data?.error || 'Failed to upload resume');
                          } finally {
                            setIsUploadingResume(false);
                          }
                        }}
                      />
                    </div>

                    <div className="space-y-6">
                      <div className="p-8 rounded-[2rem] bg-white/5 border border-white/5 space-y-4">
                        <h4 className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Deployment Status</h4>
                        <p className="text-sm text-white/60 leading-relaxed">
                          The resume is stored directly as a base64 encoded binary in the system repository.
                          Upload a new PDF to overwrite the current version.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-10 border-t border-white/5">
                    {currentResume ? (
                      <div className="flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/5">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/20">
                            📄
                          </div>
                          <div>
                            <p className="text-xs font-bold text-white uppercase tracking-widest italic">ACTIVE_RESUME_BINARY</p>
                            <p className="text-[10px] text-white/20 uppercase tracking-[0.2em]">
                              Last Commit: {new Date(currentResume.uploadedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <a
                            href={currentResume.fileUrl}
                            download="Resume_Preview.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-xl bg-white/5 text-white/50 hover:text-white hover:bg-white/10 transition-all border border-white/5"
                            title="Preview Payload"
                          >
                            <Eye size={16} />
                          </a>
                          <button
                            onClick={() => handleDeleteResume(currentResume._id)}
                            className="p-3 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all border border-red-500/10"
                            title="Terminate Payload"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center p-6 text-white/20 uppercase text-[10px] font-black tracking-widest">
                        No Active Payload Detected
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-12"
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-bold text-white uppercase tracking-tighter italic">System Configuration</h2>
                    <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest">Global Environment Overrides</p>
                  </div>
                </div>

                <div className="glass-card p-12 rounded-[3.5rem] border-white/5 space-y-10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -mr-32 -mt-32" />

                  <div className="space-y-8 relative z-10">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-primary">
                        <SettingsIcon size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white uppercase italic tracking-tighter">System Environment</h3>
                        <p className="text-xs text-white/40 leading-relaxed uppercase tracking-widest">Global Configuration</p>
                      </div>
                    </div>

                    <div className="p-12 rounded-[2.5rem] bg-white/5 border border-dashed border-white/10 text-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto text-white/20">
                        <SettingsIcon size={32} />
                      </div>
                      <p className="text-white/40 text-sm uppercase tracking-widest font-bold italic">
                        No configurable system overrides active
                      </p>
                      <p className="text-[10px] text-white/10 uppercase tracking-[0.2em]">
                        All binary assets are now handled via internal Base64 orchestration
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
