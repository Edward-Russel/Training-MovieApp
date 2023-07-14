import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query'
import { tmdbApi } from "../services/tmdb";
import moviesReducer from "./movies-slice";
import genresReducer from "./genres-slice";

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    genres: genresReducer,
    [tmdbApi.reducerPath]: tmdbApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmdbApi.middleware),
});

setupListeners(store.dispatch);

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
