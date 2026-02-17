import { Admin, IAdmin } from '../../models/admin.model';

export class AuthRepository {
    async findByEmail(email: string): Promise<IAdmin | null> {
        return Admin.findOne({ email });
    }

    async findById(id: string): Promise<IAdmin | null> {
        return Admin.findById(id);
    }

    async updateRefreshToken(adminId: string, refreshTokenHash?: string): Promise<void> {
        await Admin.findByIdAndUpdate(adminId, { refreshTokenHash });
    }

    async findOne(filter: any): Promise<IAdmin | null> {
        return Admin.findOne(filter);
    }
}
