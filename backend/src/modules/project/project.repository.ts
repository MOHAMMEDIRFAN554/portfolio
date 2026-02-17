import { Project, IProject } from '../../models/project.model';
import { CreateProjectInput } from './project.service';

export class ProjectRepository {
    async findAll(filter: any = {}): Promise<IProject[]> {
        return Project.find(filter).sort({ featured: -1, createdAt: -1 });
    }

    async findBySlug(slug: string, filter: any = {}): Promise<IProject | null> {
        return Project.findOne({ slug, ...filter });
    }

    async findById(id: string): Promise<IProject | null> {
        return Project.findById(id);
    }

    async create(data: any): Promise<IProject> {
        const project = new Project(data);
        return project.save();
    }

    async update(id: string, data: any): Promise<IProject | null> {
        return Project.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id: string): Promise<IProject | null> {
        return Project.findByIdAndDelete(id);
    }

    async exists(slug: string, excludeId?: string): Promise<boolean> {
        const filter: any = { slug };
        if (excludeId) {
            filter._id = { $ne: excludeId };
        }
        const project = await Project.findOne(filter);
        return !!project;
    }
}
