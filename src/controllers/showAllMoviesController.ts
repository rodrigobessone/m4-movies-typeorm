import { Request, Response } from "express";
import { PaginationOptions, showAllMoviesQuery } from "../services/showAllMovies.services";

export const showAllMoviesController = async (req: Request, res: Response) => {
  const { sort = "id", order = "asc", page = 1, perPage = 5 } = req.query;

  if (sort !== "id" && sort !== "price" && sort !== "duration") {
    return res.status(400).json({ error: "Invalid sort option" });
  }

  const parsedPage = parseInt(page as string, 10);
  const parsedPerPage = parseInt(perPage as string, 10);

  if (isNaN(parsedPage) || parsedPerPage < 1) {
    return res.status(400).json({ error: 'Invalid page or perPage value' });
  }
  
  const options: PaginationOptions = {
    sort: sort as 'duration' | 'price' | 'id',
    order: order as 'asc' | 'desc',
    page: parsedPage,
    perPage: parsedPerPage,
  };
  
  if (parsedPerPage === 0) {
    options.page = 1;
    options.perPage = 5;
  }
  
  try {
    const movies = await showAllMoviesQuery(options);
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}