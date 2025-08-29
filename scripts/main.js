import { fetchTrendingMovies } from "./sections/trending-movies.js";
import { searchMovie } from "./sections/movie-search.js";

const moviesSection = document.querySelector('.js-movies');
const trendingMoviesSection = document.querySelector('.js-trending-movies');

fetchTrendingMovies()
    .then(response => {
        const trendingMovies = response;
        trendingMovies.map(trendingMovie => {
            console.log(trendingMovie)
            trendingMoviesSection.innerHTML += `
                <img src='https://image.tmdb.org/t/p/w500${trendingMovie.poster_path}' alt='${trendingMovie.title}'/>   
                <a href="movie.html">
                    <p>${trendingMovie.title}</p>
                </a> 
                <p>${trendingMovie.release_date}</p>
                <p>Rating: ${trendingMovie.vote_average}</p>
            `;
        });
    });

const searchItem = document.querySelector('.js-search-item');

document.querySelector('.js-search')
    .addEventListener('click', () => {
        searchMovie(searchItem.value)
            .then(data => {
                console.log(data.results);
                data.results.map(movie => {
                    moviesSection.innerHTML += `
                        <img src='https://image.tmdb.org/t/p/w500${movie.poster_path}' alt='${movie.title}'/>   
                        <p>${movie.title}</p>
                        <p>${movie.release_date}</p>
                        <p>Rating: ${movie.vote_average}</p>
                    
                    `;
                });
            });
    });