import { fetchTrendingMovies, displayTrendingMovies } from "../sections/trending-movies.js";
import { fetchPopularMovies, displayPopularMovies } from "../sections/popular-movies.js";
import { fetchNowPlayingMovies, displayNowPlayingMovies } from "../sections/now-playing.js";
import { fetchUpcomingMovies, displayUpcomingMovies } from "../sections/upcoming-movies.js";
import { openMovieDetails } from "../utils/openMovieDetails.js";
import "../utils/search-feature.js";

fetchTrendingMovies()
    .then(response => {
        displayTrendingMovies(response);
    });

fetchPopularMovies()
    .then(response => {
        displayPopularMovies(response);
    });

fetchNowPlayingMovies()
    .then(response => {
        displayNowPlayingMovies(response);
    });

fetchUpcomingMovies()
    .then(response => {
        displayUpcomingMovies(response);
    });

document.addEventListener('click', (e) => {
    openMovieDetails(e)
});
