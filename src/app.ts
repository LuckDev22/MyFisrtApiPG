import express, { Application, json } from "express";
import {
  createMovies,
  delMovie,
  listAllMovies,
  retrieveMovie,
  updateMovie,
} from "./logic";
import { startDatabase } from "./database";
import { checkedMovieExisting, checkedNameExisting } from "./middlewares";

const app: Application = express();
app.use(json());

app.post("/movies", checkedNameExisting, createMovies);
app.get("/movies", listAllMovies);
app.get("/movies/:id", checkedMovieExisting, retrieveMovie);
app.patch("/movies/:id",checkedMovieExisting, checkedNameExisting, updateMovie);
app.delete("/movies/:id", checkedMovieExisting, delMovie);

const PORT: number = 3000;

app.listen(PORT, async () => {
  await startDatabase();
});
