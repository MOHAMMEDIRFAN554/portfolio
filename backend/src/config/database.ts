import mongoose from 'mongoose';

export async function connectDatabase() {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MONGODB_URI is not defined');
    }

    await mongoose.connect(mongoUri, {
      retryWrites: true,
      w: 'majority'
    });

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
}

export function disconnectDatabase() {
  return mongoose.disconnect();
}
