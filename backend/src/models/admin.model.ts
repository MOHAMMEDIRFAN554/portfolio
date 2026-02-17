import mongoose, { Schema, Document } from 'mongoose';

export interface IAdmin extends Document {
  email: string;
  passwordHash: string;
  refreshTokenHash?: string;
  createdAt: Date;
  updatedAt: Date;
}

const adminSchema = new Schema<IAdmin>(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    refreshTokenHash: { type: String }
  },
  { timestamps: true }
);

export const Admin = mongoose.model<IAdmin>('Admin', adminSchema);
