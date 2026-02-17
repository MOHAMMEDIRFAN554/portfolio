import jwt from 'jsonwebtoken';

export interface TokenPayload {
  adminId: string;
}

export function generateAccessToken(adminId: string, secret: string, expiresIn: string): string {
  return jwt.sign({ adminId }, secret, { expiresIn });
}

export function generateRefreshToken(adminId: string, secret: string, expiresIn: string): string {
  return jwt.sign({ adminId }, secret, { expiresIn });
}

export function verifyAccessToken(token: string, secret: string): TokenPayload | null {
  try {
    return jwt.verify(token, secret) as TokenPayload;
  } catch {
    return null;
  }
}

export function verifyRefreshToken(token: string, secret: string): TokenPayload | null {
  try {
    return jwt.verify(token, secret) as TokenPayload;
  } catch {
    return null;
  }
}
