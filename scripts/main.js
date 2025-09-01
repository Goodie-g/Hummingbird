import { fetchTrendingMovies, displayTrendingMovies } from "./sections/trending-movies.js";
import { searchMovie, displayMovieSearchResult } from "./sections/movie-search.js";

fetchTrendingMovies()
    .then(response => {
        displayTrendingMovies(response);
    });

const searchItem = document.querySelector('.js-search-item');

document.querySelector('.js-search')
    .addEventListener('click', () => {
        searchMovie(searchItem.value)
            .then(data => {
                console.log(data.results);
                displayMovieSearchResult(data);
            });
    });