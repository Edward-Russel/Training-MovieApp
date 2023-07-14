import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseUrl = import.meta.env.VITE_TMDB_BASE_URL;
const token = import.meta.env.VITE_TMDB_API_KEY;

type RawMovie = {
  [propName: string]: any;
};

type RawGenre = {
  id: number;
  name: string;
};

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    }}),
  endpoints: (builder) => ({
    getPageBy: builder.query<{ results: RawMovie[] }, number>({
      query: (n) => `/movie?page=${n}`,
    }),
    getGenres: builder.query<{ genres: RawGenre[] }, null>({
      query: () => "/genres",
    })
  }),
});

export const { useGetPageByQuery, useGetGenresQuery } = tmdbApi;
