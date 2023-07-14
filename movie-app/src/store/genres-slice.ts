import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Genre = {
  id: number;
  name: string;
};

const genreSlice = createSlice({
  name: "genres",
  initialState: [] as Genre[],
  reducers: {
    addGenre: (state, action: PayloadAction<Genre>) => {
      for (const genre of state) {
        if (genre.id === action.payload.id) return;
      }
      state.push(action.payload);
    },
    removeGenre: (state, action: PayloadAction<number>) => {
      return state.filter((genre) => genre.id !== action.payload);
    },
  },
});

export const { addGenre } = genreSlice.actions;
export default genreSlice.reducer;