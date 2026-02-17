import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function testConnection() {
    try {
        const mongoUri = process.env.MONGODB_URI;
        console.log('Testing MongoDB connection...');
        console.log(`URI length: ${mongoUri?.length}`);

        if (!mongoUri) {
            throw new Error('MONGODB_URI is not defined');
        }

        await mongoose.connect(mongoUri);
        console.log('Successfully connected to MongoDB!');
        await mongoose.disconnect();
    } catch (error) {
        console.error('Connection failed:', error);
    }
}

testConnection();
