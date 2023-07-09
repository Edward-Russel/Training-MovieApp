import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Movie = {
  id: number;
  rating: number;
  release: number;
  img: string;
  title: string;
  description: string;
  genre: string[];
};

const movieSlice = createSlice({
  name: "movies",
  initialState: [] as Movie[],
  reducers: {
    addMovie: (state, action: PayloadAction<Movie>) => {
      for (const movie of state) {
        if (movie.id === action.payload.id) return;
      }
      state.push(action.payload);
    },
    removeMovie: (state, action: PayloadAction<number>) => {
      return state.filter((movie) => movie.id !== action.payload);
    },
  },
});

export const { addMovie } = movieSlice.actions;
export default movieSlice.reducer;
