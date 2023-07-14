import { forwardRef } from "react";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import { RootState } from "../store";

import FilterSelect from "./FilterSelect";

type MovieFilterProps = {
  year: {
    [propName: string]: any;
  };
  genre: {
    [propsName: string]: any;
  };
}

const MovieFilter = forwardRef((props: MovieFilterProps, ref) => {
  const yearFormHook = props.year;
  const genreFormHook = props.genre;
  const years: string[] = Array.from(new Set(useSelector((state: RootState) => state.movies).map((movie) => movie.release)));
  const genres: string[] = useSelector((state: RootState) => state.genres).map((genre) => genre.name);

  return (
    <Stack spacing={1}>
      <FilterSelect
        title="Годы"
        root="Все годы"
        set={years}
        ref={ref}
        {...yearFormHook}
      />
      <FilterSelect
        title="Жанры"
        root="Все жанры"
        set={genres}
        ref={ref}
        {...genreFormHook}
      />
      <Button variant="contained" type="submit">
        Применить фильтры
      </Button>
    </Stack>
  );
});

export default MovieFilter;
