import { z } from "zod";
import { movieSchema, movieSchemaReq, movieSchemaRes, moviesSchemaRes } from "../schemas/movies.schemas";
import { DeepPartial } from "typeorm";

export type TMovie = z.infer<typeof movieSchema>;

export type TMoviesRequest = z.infer<typeof movieSchemaReq>;

export type TMovieResponse = z.infer<typeof movieSchemaRes>;

export type TMoviesResponse = z.infer<typeof moviesSchemaRes>;

export type TMoviesPagination = {
  prevPage: string | null;
  nextPage: string | null;
  count: number;
  data: TMoviesResponse;
};

export type TMovieUpdateRequest = DeepPartial<TMoviesRequest>;
