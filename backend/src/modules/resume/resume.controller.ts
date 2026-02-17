import { Request, Response } from 'express';
import { ResumeService } from './resume.service';

export class ResumeController {
  private resumeService = new ResumeService();

  async getLatestResume(req: Request, res: Response) {
    try {
      const resume = await this.resumeService.getLatestResume();
      if (!resume) {
        return res.json(null);
      }
      res.json(resume);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch resume' });
    }
  }

  async uploadResume(req: Request, res: Response) {
    try {
      const resume = await this.resumeService.uploadResume(req.body);
      res.status(201).json(resume);
    } catch (error: any) {
      res.status(500).json({ error: error.message || 'Failed to upload resume' });
    }
  }

  async deleteResume(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.resumeService.deleteResume(id);
      res.json({ message: 'Resume deleted' });
    } catch (error: any) {
      const statusCode = error.statusCode || 500;
      res.status(statusCode).json({ error: error.message });
    }
  }
}
