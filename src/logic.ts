import { Request, Response } from "express";
import { client } from "./database";
import { QueryConfig, QueryResult } from "pg";
import { Imovie } from "./interfaces";
import { TMovieReq } from "./interfaces";
import format from "pg-format";

export const createMovies = async (
  req: Request,
  resp: Response
): Promise<Response> => {
  const movieData: TMovieReq = req.body;

  const queryString: string = format(
    `
  INSERT INTO
      movie
        (%I)
  VALUES
        (%L)
  RETURNING *;
  `,
    Object.keys(movieData),
    Object.values(movieData)
  );

  const queryResult: QueryResult<Imovie> = await client.query(queryString);

  return resp.status(201).json(queryResult.rows[0]);
};

export const listAllMovies = async (
  req: Request,
  resp: Response
): Promise<Response> => {
  const category = req.query.category;
  let queryString: string = "";
  let queryResult: QueryResult<Imovie>;

  if (category) {
    queryString = `
        SELECT
             *
        FROM
            movie
        WHERE
            category = $1;
    `;

    const queryConfig: QueryConfig = {
      text: queryString,
      values: [category],
    };

    queryResult = await client.query(queryConfig);
  } else {
    queryString = `
    SELECT
        *
    FROM
        movie;
  `;

    queryResult = await client.query(queryString);
  }

  if (queryResult.rows.length === 0) {
    queryString = `
    SELECT
        *
    FROM
        movie;
  `;

    queryResult = await client.query(queryString);
  }

  return resp.json(queryResult.rows);
};

export const retrieveMovie = async (
  req: Request,
  resp: Response
): Promise<Response> => {
  const movie: Imovie = resp.locals.movie;
  return resp.json(movie);
};

export const updateMovie = async (
  req: Request,
  resp: Response
): Promise<Response> => {
  const movieData: Partial<TMovieReq> = req.body;
  const id: number = Number(req.params.id);

  const queryString: string = format(
    `
    UPDATE
        movie
      SET (%I) = ROW(%L)
    WHERE
        id = $1
    RETURNING *;
    `,
    Object.keys(movieData),
    Object.values(movieData)
  );

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: QueryResult<Imovie> = await client.query(queryConfig);

  return resp.status(200).json(queryResult.rows[0]);
};

export const delMovie = async (
  req: Request,
  resp: Response
): Promise<Response> => {
  const id: number = Number(req.params.id);

  const queryString: string = `
  DELETE
  FROM
      movie
  WHERE
      id = $1
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  await client.query(queryConfig);
  return resp.status(204).json();
};
