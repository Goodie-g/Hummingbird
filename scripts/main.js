import { fetchTrendingMovies } from "./sections/trending-movies.js";
import { searchMovie } from "./sections/movie-search.js";

fetchTrendingMovies()
    .then(response => console.log(response.data))
    /* .then(response => {
        const movies = response.data.results;
        movies.map(movies2 => {
            console.log(movies2);
        })
    }) */

const searchItem = document.querySelector('.js-search-item');

document.querySelector('.js-search')
    .addEventListener('click', () => {
        searchMovie(searchItem.value)
            .then(response => {
                console.log(response.data.results)
                console.log(searchItem.value)
            })
    })