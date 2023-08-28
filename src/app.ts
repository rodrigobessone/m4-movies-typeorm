import express from "express";
import routesMovies from "./routes/movies.routes";
import "express-async-errors"
import { handleErrors } from "./errors/handleError";
const app = express();

app.use(express.json())

app.use(routesMovies)

app.use(handleErrors)

export default app;
