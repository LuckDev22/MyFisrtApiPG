export interface Imovie {
  id: number;
  name: string;
  category: string;
  duration: number;
  price: number;
}

export type TMovieReq = Omit<Imovie, "id">;
