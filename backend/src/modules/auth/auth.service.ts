import { AppError } from '../../middlewares/errorHandler';
import { hashPassword, comparePasswords } from '../../utils/bcrypt';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../../utils/jwt';
import { AuthRepository } from './auth.repository';

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export class AuthService {
  private repository = new AuthRepository();

  async login(email: string, password: string, config: any): Promise<AuthTokens> {
    const admin = await this.repository.findByEmail(email);
    if (!admin) {
      throw new AppError(401, 'Invalid credentials');
    }

    const isPasswordValid = await comparePasswords(password, admin.passwordHash);
    if (!isPasswordValid) {
      throw new AppError(401, 'Invalid credentials');
    }

    const accessToken = generateAccessToken(admin._id.toString(), config.jwtAccessSecret, config.jwtAccessExpiry);
    const refreshToken = generateRefreshToken(admin._id.toString(), config.jwtRefreshSecret, config.jwtRefreshExpiry);

    const refreshTokenHash = await hashPassword(refreshToken);
    await this.repository.updateRefreshToken(admin._id.toString(), refreshTokenHash);

    return { accessToken, refreshToken };
  }

  async refreshTokens(refreshToken: string, config: any): Promise<AuthTokens> {
    const payload = verifyRefreshToken(refreshToken, config.jwtRefreshSecret);
    if (!payload) {
      throw new AppError(401, 'Invalid refresh token');
    }

    const admin = await this.repository.findById(payload.adminId);
    if (!admin) {
      throw new AppError(401, 'Admin not found');
    }

    const isTokenValid = await comparePasswords(refreshToken, admin.refreshTokenHash || '');
    if (!isTokenValid) {
      throw new AppError(401, 'Invalid refresh token');
    }

    const newAccessToken = generateAccessToken(admin._id.toString(), config.jwtAccessSecret, config.jwtAccessExpiry);
    const newRefreshToken = generateRefreshToken(admin._id.toString(), config.jwtRefreshSecret, config.jwtRefreshExpiry);

    const newRefreshTokenHash = await hashPassword(newRefreshToken);
    await this.repository.updateRefreshToken(admin._id.toString(), newRefreshTokenHash);

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }

  async logout(adminId: string): Promise<void> {
    await this.repository.updateRefreshToken(adminId, undefined);
  }
}
