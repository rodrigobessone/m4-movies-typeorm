import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { AppError } from "../errors/AppError";

export const deleteMoviesQuery = async (id: number): Promise<void> => {
  const movieRepository = AppDataSource.getRepository(Movie);
  const movieToDelete = await movieRepository.findOne({ where: { id } });

  if (!movieToDelete) {
    throw new AppError("Movie not found", 404);
  }

  await movieRepository.remove(movieToDelete);
};

