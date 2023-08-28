import { Repository } from "typeorm";
import { Movie } from "../entities";
import { AppDataSource } from "../data-source";

export interface PaginationOptions {
  sort: "price" | "duration" | "id";
  order: "asc" | "desc";
  page: number;
  perPage: number;
}

export interface PaginationResult<T> {
  prevPage: string | null;
  nextPage: string | null;
  count: number;
  data: T[];
}

export const showAllMoviesQuery = async (options: PaginationOptions): Promise<PaginationResult<Movie>> => {
  const repository: Repository<Movie> = AppDataSource.getRepository(Movie);

  const { sort, order, page, perPage } = options;
  const parsedPerPage = parseInt(String(perPage), 10);
  const validPerPage = isNaN(parsedPerPage) || parsedPerPage < 1 ? 5 : Math.min(parsedPerPage, 5);
  const validPage = Math.max(page, 1);
  const skip = (validPage - 1) * validPerPage;

  const query: any = {};
  if (sort === 'price' || sort === 'duration') {
    query.order = { [sort]: order };
  }

  const [data, count] = await repository.findAndCount({
    ...query,
    skip,
    take: validPerPage,
  });

  const totalPages = Math.ceil(count / validPerPage);

  const prevPage = validPage > 1 ? createPaginationLink(validPage - 1, validPerPage) : null;
  const nextPage = validPage < totalPages ? createPaginationLink(validPage + 1, validPerPage) : null;

  return {
    prevPage,
    nextPage,
    count,
    data,
  };
};

const createPaginationLink = (page: number, perPage: number): string => {
  return `http://localhost:3000/movies?page=${page}&perPage=${perPage}`;
};