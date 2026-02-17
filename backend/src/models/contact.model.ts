import mongoose, { Schema, Document } from 'mongoose';

export interface IContact extends Document {
  name: string;
  email: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
}

const contactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const Contact = mongoose.model<IContact>('Contact', contactSchema);
