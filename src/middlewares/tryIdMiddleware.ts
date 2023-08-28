import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { Repository } from "typeorm";
import Movie from "../entities/movies.entity";
import { AppDataSource } from "../data-source";

export const tryIdMiddleware = async (
    req: Request,
    _res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const idMovie: number = parseInt(req.params.id);
  
    const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);
  
    const findMovie: Movie | null = await movieRepository.findOne({
      where: {
        id: idMovie,
      },
    });
  
    if (!findMovie) {
      throw new AppError("Movie not found", 404);
    }
  
    return next();
  };
  