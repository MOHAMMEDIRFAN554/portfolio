import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt';

export interface AuthenticatedRequest extends Request {
  adminId?: string;
}

export function authMiddleware() {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const config = req.app.get('config');
    const secret = config?.jwtAccessSecret;

    if (!secret) {
      console.error('JWT Access Secret not found in app config');
      return res.status(500).json({ error: 'Internal server error' });
    }

    const token = req.cookies?.accessToken;

    if (!token) {
      console.warn(`Unauthorized access attempt to ${req.originalUrl} - No token provided`);
      return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    const payload = verifyAccessToken(token, secret);
    if (!payload) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }

    req.adminId = payload.adminId;
    next();
  };
}
