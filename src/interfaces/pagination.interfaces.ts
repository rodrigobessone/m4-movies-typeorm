import { Movie } from "../entities"

export interface iPagination {
    prevPage: string | null
    nextPage: string | null
    count: number
    data: Movie[]
}

export interface iPaginationParams {
    page: number
    perPage: number
    order: string
    sort: string
    prevPage: string | null
    nextPage: string | null
}

export interface IMoviePagination {
    prevPage: string | null;
    nextPage: string | null;
    count: number;
    data: Movie[];
  }

  export interface IMovieResponse {
    name: string;
    description: string | null;
    duration: number;
    price: number;
  }
  
  export interface IMoviePagination {
    prevPage: string | null;
    nextPage: string | null;
    count: number;
    data: Movie[];
  }