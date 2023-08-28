import { Repository } from "typeorm";
import { AppError } from "../errors/AppError";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";

export const updateMoviesQuery = async (
  id: number,
  name: string,
  description: string,
  duration: number,
  price: number
): Promise<Movie> => {
  const repository: Repository<Movie> = AppDataSource.getRepository(Movie);

  const movieToUpdate = await repository.findOne({ where: { id } });

  if (!movieToUpdate) {
    throw new AppError("Movie not found", 404);
  }

  if (name !== undefined) {
    const existingMovie = await repository.findOne({ where: { name } });
    if (existingMovie && existingMovie.id !== id) {
      throw new AppError("Movie name already exists", 409);
    }
    movieToUpdate.name = name;
  }

  movieToUpdate.description = description;
  movieToUpdate.duration = duration;
  movieToUpdate.price = price;

  const updatedMovie = await repository.save(movieToUpdate);

  return updatedMovie;
};
