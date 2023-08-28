import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { Repository } from "typeorm";
import { Movie } from "../entities";
import { AppDataSource } from "../data-source";

export const tryNameMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body;

  if (name !== undefined) {

    const movieRepository = AppDataSource.getRepository(Movie);
  
    const existingMovie= await movieRepository.findOne({ where: { name } });
  
    if (existingMovie) {
      return res.status(409).json({ message: "Movie already exists." });
    }

  }  
  return next();
};


