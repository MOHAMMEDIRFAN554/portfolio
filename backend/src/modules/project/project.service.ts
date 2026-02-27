import { IProject } from '../../models/project.model';
import { AppError } from '../../middlewares/errorHandler';
import { ProjectRepository } from './project.repository';

export interface CreateProjectInput {
  title: string;
  slug: string;
  shortDescription: string;
  projectType: 'case-study' | 'basic';
  overview: string;
  problemStatement?: string;
  solutionApproach?: string;
  architectureDetails?: string;
  challenges?: string;
  results?: string;
  role?: string;
  category?: string;
  timeline?: string;
  techStack: { name: string; icon: string }[];
  githubUrl?: string;
  liveUrl?: string;
  images?: string[];
  featured?: boolean;
  status?: 'published' | 'draft';
}

export class ProjectService {
  private repository = new ProjectRepository();

  async uploadImages(base64Images: string[]): Promise<string[]> {
    return base64Images;
  }

  async getAllProjects(isAdmin: boolean = false): Promise<IProject[]> {
    const filter = isAdmin ? {} : { status: 'published' };
    return this.repository.findAll(filter);
  }

  async getProjectBySlug(slug: string): Promise<IProject> {
    const project = await this.repository.findBySlug(slug, { status: 'published' });
    if (!project) {
      throw new AppError(404, 'Project not found');
    }
    return project;
  }

  async createProject(data: CreateProjectInput): Promise<IProject> {
    const exists = await this.repository.exists(data.slug);
    if (exists) {
      throw new AppError(409, 'Project slug already exists');
    }

    return this.repository.create(data);
  }

  async updateProject(id: string, data: Partial<CreateProjectInput>): Promise<IProject> {
    if (data.slug) {
      const exists = await this.repository.exists(data.slug, id);
      if (exists) {
        throw new AppError(409, 'Project slug already exists');
      }
    }

    const project = await this.repository.update(id, data);
    if (!project) {
      throw new AppError(404, 'Project not found');
    }
    return project;
  }

  async deleteProject(id: string): Promise<void> {
    const project = await this.repository.delete(id);
    if (!project) {
      throw new AppError(404, 'Project not found');
    }
  }

  async toggleFeatured(id: string): Promise<IProject> {
    const project = await this.repository.findById(id);
    if (!project) {
      throw new AppError(404, 'Project not found');
    }
    project.featured = !project.featured;
    return project.save();
  }
}
