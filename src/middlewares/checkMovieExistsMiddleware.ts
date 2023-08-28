import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";

export const checkMovieExistsMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { id } = req.params;
  
    const movieRepository = AppDataSource.getRepository(Movie);
  
    const existingMovie = await movieRepository.findOne({
      where: { id: Number(id) },
    });
  
    if (!existingMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }
  
    return next();
  };