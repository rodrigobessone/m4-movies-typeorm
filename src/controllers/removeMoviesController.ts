import { Request, Response } from "express";
import { deleteMoviesQuery } from "../services/deleteMovies.services";

export const removeMoviesController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    await deleteMoviesQuery(Number(id));
    
    res.sendStatus(204); 
  } catch (error) {
    res.status(500).json({ error: 'An internal error occurred' });
  }
};



 