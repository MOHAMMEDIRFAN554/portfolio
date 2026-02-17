import dotenv from 'dotenv';
import { createApp } from './app';
import { validateConfig } from './config/environment';
import { connectDatabase } from './config/database';
import { initializeMailer } from './utils/nodemailer';

dotenv.config();

async function main() {
  try {
    const config = validateConfig();
    await connectDatabase();
    initializeMailer(config);

    const app = createApp(config);
    const server = app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
      console.log(`Environment: ${config.nodeEnv}`);
    });

    process.on('SIGTERM', () => {
      console.log('SIGTERM received, shutting down gracefully');
      server.close(() => {
        console.log('Server closed');
        process.exit(0);
      });
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

main();
