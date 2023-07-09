import { Movie } from "../store/movies-slice";
const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMWY5MzkyNDg2ODgxNGFjYjEwYzFhOWNjOWRmZTJiYSIsInN1YiI6IjY0YTg3YjVmYjY4NmI5MDBjYzA4N2MzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sLF-hj8gzXwyRcjA_h51tcV0JT9XPfcVND4liYS6i6U";
const GENRES_REQUEST = "https://api.themoviedb.org/3/genre/movie/list?language=ru";
const PAGE_REQUEST = (n: number) => `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ru-RU&page=${n}&sort_by=popularity.desc`;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

class TheMovieAPI {
  static initiated: null | TheMovieAPI = null;
  static init() {
    if (TheMovieAPI.initiated === null)
      TheMovieAPI.initiated = new TheMovieAPI();
    return TheMovieAPI.initiated;
  }
  _genres: null | object = null;
  _pages: object[] = [];
  page(number: number) {
    return new Promise((resolve, reject) => {
      if (this._pages[number - 1]) resolve(this._pages[number - 1]);
      else {
        this.fetch(PAGE_REQUEST(number))
          .then((json: any) => {
            this._pages[number - 1] = json.results;
            resolve(this._pages[number - 1]);
          })
          .catch(reject);
      }
    });
  }
  get genres() {
    return new Promise((resolve, reject) => {
      if (this._genres) resolve(this._genres);
      else {
        this.fetch(GENRES_REQUEST)
          .then((json: any) => {
            this._genres = json.genres;
            resolve(this._genres);
          })
          .catch(reject);
      }
    });
  }
  fetch(url: string) {
    return new Promise((resolve, reject) => {
      fetch(url, options)
        .then((response) => response.json())
        .then(resolve)
        .catch(reject);
    });
  }
}

const API = TheMovieAPI.init();

class TheMovieAPIAdapter {
  static initiated: null | TheMovieAPIAdapter = null;
  static init() {
    if (TheMovieAPIAdapter.initiated === null) {
      TheMovieAPIAdapter.initiated = new TheMovieAPIAdapter();
    }
    return TheMovieAPIAdapter.initiated;
  }
  genre(id: number): Promise<null | string> {
    return new Promise((resolve, reject) => {
      API.genres
        .then((genres: any) => {
          for (const genre of genres) {
            if (genre.id === id) return resolve(genre.name);
          }
          resolve(null);
        })
        .catch(reject);
    });
  }
  async movie(rawMovie: any): Promise<Movie> {
    const genres: string[] = [];
    for (const id of rawMovie.genre_ids) {
      const name = await this.genre(id);
      if (name !== null) genres.push(name);
    }
    return {
      id: rawMovie.id,
      rating: rawMovie.vote_average,
      release: rawMovie.release_date.slice(0, 4),
      img: rawMovie.poster_path,
      title: rawMovie.title,
      description: rawMovie.overview,
      genre: genres,
    };
  }
}

export const adapter = TheMovieAPIAdapter.init();
export default API;
