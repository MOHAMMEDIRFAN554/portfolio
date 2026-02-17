import express from 'express';
import { ResumeController } from './resume.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = express.Router();
const resumeController = new ResumeController();

router.get('/', (req, res) => resumeController.getLatestResume(req, res));

const protectedAuth = authMiddleware();
router.post('/', protectedAuth, (req, res) => resumeController.uploadResume(req, res));
router.delete('/:id', protectedAuth, (req, res) => resumeController.deleteResume(req, res));

export default router;
