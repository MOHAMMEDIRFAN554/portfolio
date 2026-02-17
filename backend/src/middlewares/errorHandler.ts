import { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export function errorHandler(
  error: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error('Error:', error);

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      error: error.message
    });
  }

  res.status(500).json({
    error: 'Internal server error'
  });
}
