import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  slug: string;
  shortDescription: string;
  projectType: 'case-study' | 'basic';

  overview: string;
  problemStatement?: string;
  solutionApproach?: string;
  architectureDetails?: string;
  challenges?: string;
  results?: string;

  role?: string;
  category?: string;
  timeline?: string;

  techStack: {
    name: string;
    icon: string;
  }[];

  githubUrl?: string;
  liveUrl?: string;
  images: string[];

  featured: boolean;
  status: 'published' | 'draft';
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    shortDescription: { type: String, required: true },
    projectType: { type: String, enum: ['case-study', 'basic'], default: 'basic' },

    overview: { type: String, required: true },
    problemStatement: { type: String },
    solutionApproach: { type: String },
    architectureDetails: { type: String },
    challenges: { type: String },
    results: { type: String },

    role: { type: String },
    category: { type: String },
    timeline: { type: String },

    techStack: [
      {
        name: { type: String, required: true },
        icon: { type: String, required: true }
      }
    ],

    githubUrl: { type: String },
    liveUrl: { type: String },
    images: [{ type: String }],

    featured: { type: Boolean, default: false },
    status: { type: String, enum: ['published', 'draft'], default: 'published' }
  },
  { timestamps: true }
);

export const Project = mongoose.model<IProject>('Project', projectSchema);
