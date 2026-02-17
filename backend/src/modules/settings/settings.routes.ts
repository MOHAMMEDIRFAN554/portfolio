import { Router } from 'express';
import { SettingsController } from './settings.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();
const controller = new SettingsController();

const auth = authMiddleware();

router.get('/', controller.getAllSettings);
router.post('/', auth, controller.updateSettings);

export default router;
