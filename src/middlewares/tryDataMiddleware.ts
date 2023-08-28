import { NextFunction, Request, Response } from "express";
import { ZodError, ZodTypeAny } from "zod"
import { AppError } from "../errors/AppError";

export const tryDataMiddleware =
  (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = schema.parse(req.body);
      req.body = validatedData;
      return next();
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
      throw new AppError("Internal server error", 500);
    }

  };

