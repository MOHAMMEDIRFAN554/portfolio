import { IResume } from '../../models/resume.model';
import { ResumeRepository } from './resume.repository';

export interface CreateResumeInput {
  base64Data: string;
}

export class ResumeService {
  private repository = new ResumeRepository();

  async getLatestResume(): Promise<IResume | null> {
    return this.repository.findLatest();
  }

  async uploadResume(data: CreateResumeInput): Promise<IResume> {
    // Only one active resume allowed
    await this.repository.deleteAll();
    return this.repository.create({ fileUrl: data.base64Data });
  }

  async deleteResume(id: string): Promise<void> {
    // We don't really use ID if we delete all on upload, but for completeness:
    // This is optional if we always overwrite
  }
}
