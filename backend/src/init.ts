import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { Admin } from './models/admin.model';

dotenv.config();

async function initializeDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio');
    console.log('Connected to MongoDB');

    // Check if admin exists
    const existingAdmin = await Admin.findOne({ email: process.env.ADMIN_EMAIL });

    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 10);

    const admin = new Admin({
      email: process.env.ADMIN_EMAIL || 'admin@example.com',
      passwordHash: hashedPassword,
    });

    await admin.save();
    console.log('Admin user created successfully');
    console.log(`Email: ${admin.email}`);

    process.exit(0);
  } catch (error) {
    console.error('Failed to initialize database:', error);
    process.exit(1);
  }
}

initializeDatabase();
