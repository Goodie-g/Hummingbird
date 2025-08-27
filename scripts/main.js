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
const moviesSection = document.querySelector('.js-movies');

document.querySelector('.js-search')
    .addEventListener('click', () => {
        searchMovie(searchItem.value)
            .then(data => {
                console.log(data.results);
                data.results.map(movie => {
                    moviesSection.innerHTML += `
                        <img src='https://image.tmdb.org/t/p/w500${movie.poster_path}' alt='${movie.title}' />
                        <img src='https://image.tmdb.org/t/p/w500${movie.backdrop_path}' alt='${movie.title}' />    
                        <p>${movie.title}</p>
                        <p>${movie.release_date}</p>
                        <p>Rating: ${movie.vote_average}</p>
                    <
                    `;
                });
            });
    });