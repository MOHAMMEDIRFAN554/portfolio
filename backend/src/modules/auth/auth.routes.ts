import express from 'express';
import { AuthController } from './auth.controller';
import { authLimiter } from '../../middlewares/rateLimiter';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = express.Router();
const authController = new AuthController();

router.post('/login', authLimiter, (req, res) => authController.login(req, res));
router.post('/refresh', (req, res) => authController.refresh(req, res));
router.post('/logout', authMiddleware(), (req, res) => authController.logout(req, res));

export default router;
