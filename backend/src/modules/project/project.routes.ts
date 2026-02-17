import express from 'express';
import { ProjectController } from './project.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = express.Router();
const projectController = new ProjectController();

router.get('/', (req, res) => projectController.getAllProjects(req, res));
router.get('/:slug', (req, res) => projectController.getProjectBySlug(req, res));

const protectedAuth = authMiddleware();
router.post('/upload-images', protectedAuth, (req, res) => projectController.uploadImages(req, res));
router.post('/', protectedAuth, (req, res) => projectController.createProject(req, res));
router.put('/:id', protectedAuth, (req, res) => projectController.updateProject(req, res));
router.delete('/:id', protectedAuth, (req, res) => projectController.deleteProject(req, res));
router.patch('/:id/toggle-featured', protectedAuth, (req, res) => projectController.toggleFeatured(req, res));

export default router;
