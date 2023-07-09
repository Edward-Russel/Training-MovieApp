import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import FilterAlt from "@material-ui/icons/FilterAlt";
import Container from "@material-ui/core/Container";
import Collapse from "@material-ui/core/Collapse";
import Stack from "@material-ui/core/Stack";
import Box from "@material-ui/core/Box";

import SearchInput from "../components/SearchInput";
import MovieFilter from "../components/MovieFilter";
import MovieCard from "../components/MovieCard";

import { addMovie, Movie } from "../store/movies-slice";
import { RootState } from "../store";

type SearchData = {
  title?: string;
  release?: number | "Все годы";
  genre?: string | "Все жанры";
};

async function fetchMovies() {
  const response = await fetch("http://localhost:3000");
  if (response.ok) {
    const result = await response.json();
    return result;
  } else {
    return null;
  }
}

function movieFilter(movie: Movie, filter: SearchData): boolean {
  return (
    (filter.title ? movie.title.toLowerCase().includes(filter.title) : true) &&
    (filter.release ? movie.release === filter.release : true) &&
    (filter.genre ? movie.genre.includes(filter.genre) : true)
  );
}

const Movies = () => {
  const [loadMovieError, selLoadMovieError] = useState(false);
  const [filterExpanded, setFilterExpanded] = useState(false);
  const [filter, setFilter] = useState({});
  const movies = useSelector((state: RootState) => state.movies);
  const showedMovies = movies.filter((movie) => movieFilter(movie, filter));
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm<SearchData>();

  const onSubmit: SubmitHandler<SearchData> = (data) => {
    setFilter({
      title: data.title?.toLowerCase(),
      release: data.release === "Все годы" ? undefined : data.release,
      genre: data.genre === "Все жанры" ? undefined : data.genre,
    });
  };

  const handleFilterExpand = () => setFilterExpanded(!filterExpanded);

  useEffect(() => {
    if (movies.length === 0) {
      fetchMovies().then((result) => {
        if (result) {
          for (const movie of result) {
            dispatch(addMovie(movie));
          }
        } else {
          selLoadMovieError(true);
        }
      });
    }
  }, []);

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4">Фильмы</Typography>
      <Stack direction="row" spacing={2} sx={{ mt: 5 }}>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          className="for-not-mobile-elements"
        >
          <MovieFilter
            type="block"
            year={register("release")}
            genre={register("genre")}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: "flex" }}>
              <SearchInput
                sx={{ flex: 1 }}
                autoComplete="off"
                {...register("title")}
              />
              <IconButton
                onClick={handleFilterExpand}
                className="for-mobile-elements"
                sx={{ p: "10px", ml: 1 }}
              >
                <FilterAlt />
              </IconButton>
            </Box>
            <Collapse
              className="for-mobile-elements"
              in={filterExpanded}
              timeout="auto"
              unmountOnExit
              sx={{ mt: 2 }}
            >
              <MovieFilter
                type="inline"
                year={register("release")}
                genre={register("genre")}
              />
            </Collapse>
          </Box>
          <Box sx={{ mt: 2, "& > *": { my: 2 } }}>
            {loadMovieError ? (
              <Typography>Не удалось загрузить список фильмов</Typography>
            ) : showedMovies.length ? (
              showedMovies.map((movie: Movie) => (
                <MovieCard key={movie.id} {...movie} />
              ))
            ) : (
              <Typography>Ничего не найдено</Typography>
            )}
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default Movies;
