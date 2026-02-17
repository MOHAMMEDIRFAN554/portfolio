import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import authRoutes from './modules/auth/auth.routes';
import projectRoutes from './modules/project/project.routes';
import contactRoutes from './modules/contact/contact.routes';
import resumeRoutes from './modules/resume/resume.routes';
import settingsRoutes from './modules/settings/settings.routes';
import { errorHandler } from './middlewares/errorHandler';
import { AppConfig } from './config/environment';

export function createApp(config: AppConfig): express.Application {
  const app = express();

  app.set('config', config);

  app.use(helmet());
  app.use(cors({
    origin: config.frontendUrl,
    credentials: true
  }));
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ limit: '10mb', extended: true }));
  app.use(cookieParser());

  // Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/projects', projectRoutes);
  app.use('/api/contact', contactRoutes);
  app.use('/api/resume', resumeRoutes);
  app.use('/api/settings', settingsRoutes);

  // Health check
  app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
  });

  // Error handler
  app.use(errorHandler);

  return app;
}
