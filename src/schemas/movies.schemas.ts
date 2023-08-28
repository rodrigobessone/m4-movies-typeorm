import { z } from "zod";

export const movieSchema = z.object({
  id: z.number(),
  name: z.string().max(50),
  description: z.string().nullish(),
  duration: z.number().positive().int(),
  price: z.number().positive().int(),
});

export const updateMovieSchema = z.object({
  id: z.number(),
  name: z.string().max(50).optional(),
  description: z.string().nullable().optional(),
  duration: z.number().positive().int().optional(),
  price: z.number().positive().int().optional(),
});

export const movieSchemaReq = movieSchema.omit({ id: true });

export const movieSchemaUpdateReq = updateMovieSchema.omit({ id: true });

export const movieSchemaRes = movieSchema.extend({});

export const moviesSchemaRes = z.array(movieSchemaRes);


