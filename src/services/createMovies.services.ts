import { DeepPartial, Repository } from "typeorm";
import {
  TMovieResponse,
  TMoviesRequest,
} from "../interfaces/movies.interfaces";
import { Movie } from "../entities";
import { AppDataSource } from "../data-source";


export const createMoviesQuery = async (
  movieData: TMoviesRequest
): Promise<TMovieResponse> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  const movie: Movie = movieRepository.create(movieData as DeepPartial<Movie>);
  await movieRepository.save(movie);

  const returnMovie: TMovieResponse = movie;

  return returnMovie;
};

