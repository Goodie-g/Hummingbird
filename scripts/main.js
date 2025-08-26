import { fetchTrendingMovies } from "./sections/trending-movies.js";

fetchTrendingMovies()
    .then(response => console.log(response.data))
    /* .then(response => {
        const movies = response.data.results;
        movies.map(movies2 => {
            console.log(movies2);
        })
    }) */
    