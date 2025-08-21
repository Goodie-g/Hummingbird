import { fetchTrendingMovies } from "./sections/trending-movies.js";

fetchTrendingMovies()
    .then(response => console.log(response.data));