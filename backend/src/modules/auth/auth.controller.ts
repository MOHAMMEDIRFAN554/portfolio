import { Request, Response } from 'express';
import { AuthService, LoginInput } from './auth.service';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export class AuthController {
  private authService = new AuthService();

  async login(req: Request, res: Response) {
    try {
      const body = loginSchema.parse(req.body);
      const config = (req.app.get('config') as any);
      const isProduction = process.env.NODE_ENV === 'production' || process.env.RAILWAY_ENVIRONMENT_NAME === 'production';
      const tokens = await this.authService.login(body.email, body.password, config);

      res.cookie('accessToken', tokens.accessToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax',
        maxAge: 15 * 60 * 1000
      });

      res.cookie('refreshToken', tokens.refreshToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000
      });

      res.json({ message: 'Login successful' });
    } catch (error) {
      const statusCode = (error as any).statusCode || 400;
      res.status(statusCode).json({ error: (error as any).message || 'Login failed' });
    }
  }

  async refresh(req: Request, res: Response) {
    try {
      const refreshToken = req.cookies?.refreshToken;
      if (!refreshToken) {
        return res.status(401).json({ error: 'No refresh token' });
      }

      const config = (req.app.get('config') as any);
      const isProduction = process.env.NODE_ENV === 'production' || process.env.RAILWAY_ENVIRONMENT_NAME === 'production';
      const tokens = await this.authService.refreshTokens(refreshToken, config);

      res.cookie('accessToken', tokens.accessToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax',
        maxAge: 15 * 60 * 1000
      });

      res.cookie('refreshToken', tokens.refreshToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000
      });

      res.json({ message: 'Tokens refreshed' });
    } catch (error) {
      res.status(401).json({ error: 'Failed to refresh tokens' });
    }
  }

  async logout(req: Request, res: Response) {
    try {
      const adminId = (req as any).adminId;
      const config = (req.app.get('config') as any);
      await this.authService.logout(adminId);

      res.clearCookie('accessToken');
      res.clearCookie('refreshToken');
      res.json({ message: 'Logout successful' });
    } catch (error) {
      res.status(500).json({ error: 'Logout failed' });
    }
  }
}
