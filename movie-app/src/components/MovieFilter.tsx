import { forwardRef } from "react";
import { useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import Stack from "@material-ui/core/Stack";

import { RootState } from "../store";

import FilterSelect from "./FilterSelect";

const MovieFilter = forwardRef((props: any) => {
  const { type } = props;
  const yearFormHook = props.year;
  const genreFormHook = props.genre;
  const movies = useSelector((state: RootState) => state.movies);
  const years: number[] = movies.map((movie) => movie.release);
  const genres: string[] = Array.from(
    movies.reduce((acc, movie) => {
      for (const genre of movie.genre) {
        acc.add(genre);
      }
      return acc;
    }, new Set<string>())
  );

  return (
    <Stack
      direction={type === "inline" ? "row" : "column"}
      spacing={2}
      justifyContent="center"
    >
      <FilterSelect
        title="Годы"
        root="Все годы"
        set={years}
        {...yearFormHook}
      />
      <FilterSelect
        title="Жанры"
        root="Все жанры"
        set={genres}
        {...genreFormHook}
      />
      <Button variant="contained" type="submit">
        Применить фильтры
      </Button>
    </Stack>
  );
});

export default MovieFilter;
