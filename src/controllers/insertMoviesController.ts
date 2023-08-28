import { Request, Response } from "express";
import { TMoviesRequest } from "../interfaces/movies.interfaces";
import { createMoviesQuery } from "../services/createMovies.services";

export const insertMoviesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const movieData: TMoviesRequest = req.body;

  const newMovie = await createMoviesQuery(movieData);

  return res.status(201).json(newMovie);
};
