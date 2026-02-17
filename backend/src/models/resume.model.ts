import mongoose, { Schema, Document } from 'mongoose';

export interface IResume extends Document {
  fileUrl: string;
  uploadedAt: Date;
}

const resumeSchema = new Schema<IResume>(
  {
    fileUrl: { type: String, required: true }
  },
  { timestamps: { createdAt: 'uploadedAt', updatedAt: false } }
);

export const Resume = mongoose.model<IResume>('Resume', resumeSchema);
