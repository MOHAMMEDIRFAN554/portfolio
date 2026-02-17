import { Request, Response } from 'express';
import { ProjectService } from './project.service';

export class ProjectController {
  private projectService = new ProjectService();

  async getAllProjects(req: Request, res: Response) {
    try {
      const projects = await this.projectService.getAllProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch projects' });
    }
  }

  async uploadImages(req: Request, res: Response) {
    try {
      const { images } = req.body;
      if (!Array.isArray(images)) {
        return res.status(400).json({ error: 'images must be an array of base64 strings' });
      }
      const urls = await this.projectService.uploadImages(images);
      res.json(urls);
    } catch (error: any) {
      res.status(500).json({ error: error.message || 'Failed to upload images' });
    }
  }

  async getProjectBySlug(req: Request, res: Response) {
    try {
      const { slug } = req.params;
      const project = await this.projectService.getProjectBySlug(slug);
      res.json(project);
    } catch (error: any) {
      const statusCode = error.statusCode || 500;
      res.status(statusCode).json({ error: error.message });
    }
  }

  async createProject(req: Request, res: Response) {
    try {
      const project = await this.projectService.createProject(req.body);
      res.status(201).json(project);
    } catch (error: any) {
      const statusCode = error.statusCode || 500;
      res.status(statusCode).json({ error: error.message });
    }
  }

  async updateProject(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const project = await this.projectService.updateProject(id, req.body);
      res.json(project);
    } catch (error: any) {
      const statusCode = error.statusCode || 500;
      res.status(statusCode).json({ error: error.message });
    }
  }

  async deleteProject(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.projectService.deleteProject(id);
      res.json({ message: 'Project deleted' });
    } catch (error: any) {
      const statusCode = error.statusCode || 500;
      res.status(statusCode).json({ error: error.message });
    }
  }

  async toggleFeatured(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const project = await this.projectService.toggleFeatured(id);
      res.json(project);
    } catch (error: any) {
      const statusCode = error.statusCode || 500;
      res.status(statusCode).json({ error: error.message });
    }
  }
}
