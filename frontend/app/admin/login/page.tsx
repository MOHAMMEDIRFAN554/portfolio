'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail } from 'lucide-react';
import { apiClient } from '@/lib/api-client';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await apiClient.login(email, password);
      router.push('/admin/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.08)_0%,transparent_70%)]" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
          className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px]"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="glass-card rounded-[2.5rem] p-12 space-y-10 border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16" />

          {/* Header */}
          <div className="text-center space-y-4">
            <motion.div
              className="w-16 h-16 rounded-2xl glass-card border-primary/20 flex items-center justify-center mx-auto glow-violet"
              whileHover={{ scale: 1.05 }}
            >
              <Lock className="w-8 h-8 text-primary" />
            </motion.div>
            <div className="space-y-2">
              <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic">
                Secure <span className="text-primary">Access</span>
              </h1>
              <p className="text-xs font-bold text-white/30 uppercase tracking-[0.2em]">Systems Terminal v1.0</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-xs font-black text-white/40 uppercase tracking-[0.2em] ml-1">Identity</label>
                <div className="relative group">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-primary transition-colors" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="w-full pl-16 pr-8 py-5 rounded-2xl bg-white/5 border border-white/5 text-white placeholder:text-white/10 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all"
                    placeholder="admin@irfan.tech"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black text-white/40 uppercase tracking-[0.2em] ml-1">Protocol</label>
                <div className="relative group">
                  <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-primary transition-colors" />
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    className="w-full pl-16 pr-8 py-5 rounded-2xl bg-white/5 border border-white/5 text-white placeholder:text-white/10 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-widest text-center"
              >
                {error}
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-6 rounded-2xl bg-primary text-white font-black uppercase tracking-[0.2em] text-xs shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Decrypting...' : 'Initiate Session'}
            </motion.button>
          </form>

          {/* Demo info */}
          <div className="pt-8 border-t border-white/5 space-y-4">
            <p className="text-[10px] font-black text-white/20 text-center uppercase tracking-widest">Override Codes</p>
            <div className="flex justify-center gap-6 font-mono text-[10px] text-white/40">
              <span className="hover:text-primary transition-colors cursor-help">UID: admin@portfolio.com</span>
              <span className="hover:text-primary transition-colors cursor-help">PWD: password123</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12 text-[10px] font-black text-white/20 uppercase tracking-[0.4em]"
        >
          © {new Date().getFullYear()} // SYS_AUTH_CORE // MI
        </motion.p>
      </motion.div>
    </div>

  );
}
