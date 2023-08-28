import { Router } from "express";
import { movieSchemaReq, movieSchemaUpdateReq } from "../schemas/movies.schemas";
import { tryDataMiddleware } from "../middlewares/tryDataMiddleware";
import { tryNameMiddleware } from "../middlewares/tryNameMiddleware";
import { insertMoviesController } from "../controllers/insertMoviesController";
import { showAllMoviesController } from "../controllers/showAllMoviesController";
import { updateMovieController } from "../controllers/updateMoviesController";
import { checkMovieExistsMiddleware } from "../middlewares/checkMovieExistsMiddleware";
import validateRequestBody from "../middlewares/requestedBodyMiddleware";
import { removeMoviesController } from "../controllers/removeMoviesController";

const routesMovies: Router = Router();

routesMovies.post("/movies", tryDataMiddleware(movieSchemaReq), tryNameMiddleware, insertMoviesController);
routesMovies.get("/movies", showAllMoviesController);
routesMovies.patch("/movies/:id", validateRequestBody(movieSchemaUpdateReq),  checkMovieExistsMiddleware, tryNameMiddleware, updateMovieController);
routesMovies.delete('/movies/:id', checkMovieExistsMiddleware, removeMoviesController);

export default routesMovies;
