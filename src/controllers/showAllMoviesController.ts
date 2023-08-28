import { Request, Response } from "express";
import { PaginationOptions, showAllMoviesQuery } from "../services/showAllMovies.services";

export const showAllMoviesController = async (req: Request, res: Response) => {
  const { sort = "id", order = "asc", page, perPage } = req.query;

  if (sort !== "id" && sort !== "price" && sort !== "duration") {
    return res.status(400).json({ error: "Invalid sort option" });
  }

  let adjustedPerPage = parseInt(perPage as string, 10);
  let adjustedPage = parseInt(page as string, 10);

  if (isNaN(adjustedPerPage) || adjustedPerPage <= 0) {
    adjustedPerPage = 5;
  }

  if (isNaN(adjustedPage) || adjustedPage <= 0) {
    adjustedPage = 1;
  }

  const options: PaginationOptions = {
    sort: sort as 'duration' | 'price' | 'id',
    order: order as 'asc' | 'desc',
    page: adjustedPage,
    perPage: adjustedPerPage,
  };

  try {
    const movies = await showAllMoviesQuery(options);
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
