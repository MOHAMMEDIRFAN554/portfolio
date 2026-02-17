import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { Admin } from '../src/models/admin.model';
import dns from 'dns';

dns.setServers(['8.8.8.8', '8.8.4.4']);

dotenv.config();

async function createAdmin() {
    try {
        const mongoUri = process.env.MONGODB_URI;
        console.log(`URI found: ${!!mongoUri}`);
        if (!mongoUri) {
            throw new Error('MONGODB_URI is not defined in environment variables');
        }

        await mongoose.connect(mongoUri, { family: 4 });
        console.log('Connected to MongoDB');

        const email = 'irfm554@gmail.com';
        const password = 'Irfan@554';
        const hashedPassword = await bcrypt.hash(password, 10);

        const existingAdmin = await Admin.findOne({ email });

        if (existingAdmin) {
            console.log(`Updating existing admin: ${email}`);
            existingAdmin.passwordHash = hashedPassword;
            await existingAdmin.save();
            console.log('Admin password updated successfully');
        } else {
            console.log(`Creating new admin: ${email}`);
            const admin = new Admin({
                email,
                passwordHash: hashedPassword,
            });
            await admin.save();
            console.log('Admin user created successfully');
        }

        process.exit(0);
    } catch (error) {
        console.error('Failed to create admin user:', error);
        process.exit(1);
    }
}

createAdmin();
