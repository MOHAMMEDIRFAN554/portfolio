import express from 'express';
import { ContactController } from './contact.controller';
import { contactLimiter } from '../../middlewares/rateLimiter';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = express.Router();
const contactController = new ContactController();

router.post('/', contactLimiter, (req, res) => contactController.submitContact(req, res));

const protectedAuth = authMiddleware();
router.get('/', protectedAuth, (req, res) => contactController.getAllMessages(req, res));
router.patch('/:id', protectedAuth, (req, res) => contactController.markAsRead(req, res));

export default router;
