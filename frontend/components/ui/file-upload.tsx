'use client';

import React, { useState, useRef } from 'react';
import { Upload, X, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './button';

interface FileUploadProps {
    onUpload: (base64: string) => void;
    accept?: string;
    maxSize?: number; // in MB
    label?: string;
    subLabel?: string;
    loading?: boolean;
}

export function FileUpload({
    onUpload,
    accept = "image/*,application/pdf",
    maxSize = 10,
    label = "Upload Asset",
    subLabel = "Binary Payload Transmission",
    loading = false
}: FileUploadProps) {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            validateAndProcessFile(selectedFile);
        }
    };

    const validateAndProcessFile = (file: File) => {
        setError(null);

        // Size validation
        if (file.size > maxSize * 1024 * 1024) {
            setError(`File size exceeds ${maxSize}MB limit.`);
            return;
        }

        setFile(file);

        // Preview for images
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }

        // Convert to base64 for main callback
        const reader = new FileReader();
        reader.onloadend = () => {
            onUpload(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const clearFile = (e: React.MouseEvent) => {
        e.stopPropagation();
        setFile(null);
        setPreview(null);
        setError(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="w-full">
            <div
                onClick={() => fileInputRef.current?.click()}
                className={`relative group cursor-pointer h-32 rounded-[2rem] border-2 border-dashed transition-all flex flex-col items-center justify-center gap-2 overflow-hidden
          ${file
                        ? 'border-primary/50 bg-primary/5'
                        : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20'
                    }
          ${error ? 'border-red-500/50 bg-red-500/5' : ''}
        `}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept={accept}
                    className="hidden"
                />

                <AnimatePresence mode="wait">
                    {loading ? (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center gap-2"
                        >
                            <div className="animate-spin w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-primary">Synchronizing...</span>
                        </motion.div>
                    ) : file ? (
                        <motion.div
                            key="file"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="flex flex-col items-center gap-2"
                        >
                            {preview ? (
                                <div className="w-12 h-12 rounded-lg overflow-hidden border border-white/10 ring-2 ring-primary/20">
                                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                </div>
                            ) : (
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary ring-2 ring-primary/20">
                                    <FileText size={24} />
                                </div>
                            )}
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-black uppercase tracking-widest text-white truncate max-w-[150px]">
                                    {file.name}
                                </span>
                                <button
                                    onClick={clearFile}
                                    className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-white/50 hover:text-white transition-colors"
                                >
                                    <X size={12} />
                                </button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center gap-3"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/20 group-hover:text-primary transition-colors border border-white/5 group-hover:border-primary/20">
                                <Upload size={24} />
                            </div>
                            <div className="text-center">
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 group-hover:text-white transition-colors">
                                    {label}
                                </p>
                                <p className="text-[8px] font-bold uppercase tracking-[0.1em] text-white/20 mt-1">
                                    {subLabel}
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {error && (
                    <div className="absolute bottom-2 left-0 right-0 px-4">
                        <p className="text-[8px] font-black uppercase tracking-widest text-red-400 text-center flex items-center justify-center gap-1">
                            <AlertCircle size={10} />
                            {error}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
