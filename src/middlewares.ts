import { QueryConfig, QueryResult } from "pg";
import { NextFunction, Request, Response } from "express";
import { Imovie } from "./interfaces";
import { client } from "./database";

export const checkedMovieExisting = async (
  req: Request,
  resp: Response,
  next: NextFunction
): Promise<Response | void> => {
  const id: number = Number(req.params.id);

  const queryString = `
    SELECT
          *
    FROM
        movie
    WHERE
        id = $1;
    `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: QueryResult<Imovie> = await client.query(queryConfig);

  if (!queryResult.rowCount) {
    return resp.status(404).json({
      error: "Movie not found!",
    });
  }

  resp.locals.movie = queryResult.rows[0];

  return next();
};

export const checkedNameExisting = async (
  req: Request,
  resp: Response,
  next: NextFunction
): Promise<Response | void> => {
  const name: string = req.body.name;

  const queryString = `
  SELECT
        *
  FROM
      movie
  WHERE
      name = $1;
  `;

  const queryConfig: QueryConfig ={
    text: queryString,
    values: [name]
  }

  const queryResult: QueryResult<Imovie> = await client.query(queryConfig);
  const movie = queryResult.rows[0]

  if (movie) {
    return resp.status(409).json({
      error: "Movie name already exists!"
  });
  }

  return next();

};
