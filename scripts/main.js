import { fetchTrendingMovies } from "./sections/trending-movies.js";
import { searchMovie } from "./sections/movie-search.js";

fetchTrendingMovies()
    .then(response => {
        const trendingMovies = response;
        trendingMovies.map(trendingMovie => {
            // console.log(trendingMovie);
        });
    });

const searchItem = document.querySelector('.js-search-item');

document.querySelector('.js-search')
    .addEventListener('click', () => {
        searchMovie(searchItem.value)
            .then(data => {
                console.log(data.results);
            })
    })