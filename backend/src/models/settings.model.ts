import mongoose, { Schema, Document } from 'mongoose';

export interface ISettings extends Document {
    key: string;
    value: string;
    description?: string;
}

const settingsSchema = new Schema<ISettings>(
    {
        key: { type: String, required: true, unique: true },
        value: { type: String, required: true },
        description: { type: String }
    },
    { timestamps: true }
);

export const Settings = mongoose.model<ISettings>('Settings', settingsSchema);
