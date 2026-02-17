import { Resume, IResume } from '../../models/resume.model';

export class ResumeRepository {
    async findLatest(): Promise<IResume | null> {
        return Resume.findOne().sort({ uploadedAt: -1 });
    }

    async create(data: { fileUrl: string }): Promise<IResume> {
        const resume = new Resume(data);
        return resume.save();
    }

    async deleteAll(): Promise<void> {
        await Resume.deleteMany({});
    }
}
