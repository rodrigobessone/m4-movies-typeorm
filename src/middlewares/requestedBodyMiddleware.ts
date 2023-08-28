import { Request, Response, NextFunction } from 'express';
import { ZodTypeAny, ZodError } from 'zod';
import { AppError } from '../errors/AppError';

const validateRequestBody = (schema: ZodTypeAny) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages: Record<string, string[]> = {};
        error.errors.forEach((validationError) => {
          const fieldName = validationError.path.join(".");
          const errorMessage = validationError.message;
          if (!errorMessages[fieldName]) {
            errorMessages[fieldName] = [];
          }
          errorMessages[fieldName].push(errorMessage);
        });
        return res.status(400).json({ message: errorMessages });
      }
      throw new AppError('Invalid request body', 400);
    }
  };
};

export default validateRequestBody;
