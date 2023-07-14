import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import CircularProgress from "@mui/material/CircularProgress";
import FilterAlt from "@mui/icons-material/FilterAlt";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Collapse from "@mui/material/Collapse";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import SearchInput from "../components/SearchInput";
import MovieFilter from "../components/MovieFilter";
import MovieCard from "../components/MovieCard";

import { useGetPageByQuery, useGetGenresQuery } from "../services/tmdb";
import { addMovie, Movie } from "../store/movies-slice";
import { addGenre } from "../store/genres-slice";
import { RootState } from "../store";

type SearchData = {
  title?: string;
  release?: number | "Все годы";
  genre?: string | "Все жанры";
};

function movieFilter(movie: Movie, filter: SearchData): boolean {
  return (
    (filter.title ? movie.title.toLowerCase().includes(filter.title) : true) &&
    (filter.release ? movie.release === filter.release : true) &&
    (filter.genre ? movie.genre.includes(filter.genre) : true)
  );
}

const Movies = () => {
  const [filterExpanded, setFilterExpanded] = useState(false);
  const [filter, setFilter] = useState({});
  const movies = useSelector((state: RootState) => state.movies);
  const genres = useSelector((state: RootState) => state.genres);
  const showedMovies = movies.filter((movie) => movieFilter(movie, filter));
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm<SearchData>();

  const rawPage = useGetPageByQuery(1);
  const rawGenres = useGetGenresQuery(null);

  const onSubmit: SubmitHandler<SearchData> = (data) => {
    setFilter({
      title: data.title?.toLowerCase(),
      release: data.release === "Все годы" ? undefined : data.release,
      genre: data.genre === "Все жанры" ? undefined : data.genre,
    });
  };

  const handleFilterExpand = () => setFilterExpanded(!filterExpanded);

  useEffect(() => {
    if (genres.length === 0 && rawGenres.data) {
      for (const genre of rawGenres.data.genres) {
        dispatch(addGenre(genre));
      }
    }
  }, [rawPage, rawGenres]);

  useEffect(() => {
    if (genres.length) {
      if (movies.length === 0 && rawPage.data) {
        for (const movie of rawPage.data.results) {
          dispatch(
            addMovie({
              id: movie.id,
              rating: (movie.vote_average / 10) * 5,
              release: movie.release_date.slice(0, 4),
              img: movie.poster_path,
              title: movie.title,
              description: movie.overview,
              genre: movie.genre_ids.map(
                (genre_id: number) =>
                  genres.find((genre) => genre_id === genre.id)!.name
              ),
            })
          );
        }
      }
    }
  }, [rawPage, genres]);

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4">Фильмы</Typography>
      <Stack direction="row" spacing={2} sx={{ mt: 5 }}>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          className="for-not-mobile-elements"
        >
          <MovieFilter year={register("release")} genre={register("genre")} />
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
            <Box>
              <Collapse
                className="for-mobile-elements"
                in={filterExpanded}
                timeout="auto"
                unmountOnExit
                sx={{ mt: 2 }}
              >
                <MovieFilter
                  year={register("release")}
                  genre={register("genre")}
                />
              </Collapse>
            </Box>
          </Box>
          <Box sx={{ mt: 2, "& > *": { my: 2 } }}>
            {rawPage.error ? (
              <Typography>Не удалось загрузить список фильмов</Typography>
            ) : rawPage.isLoading ? (
              <CircularProgress />
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
