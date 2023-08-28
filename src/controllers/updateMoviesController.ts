import { Request, Response } from "express";
import { updateMoviesQuery } from "../services/upateMovies.services";

export const updateMovieController = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const { id } = req.params;
  const { name, description, duration, price } = req.body;

  const updatedMovie = await updateMoviesQuery(
    Number(id),
    name,
    description,
    duration,
    price,
  );

  return res.status(200).json(updatedMovie);
  };