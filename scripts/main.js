import { fetchTrendingMovies, displayTrendingMovies } from "./sections/trending-movies.js";
import { fetchPopularMovies, displayPopularMovies } from "./sections/popular-movies.js";
import { searchMovie } from "./sections/movie-search.js";
import { fetchNowPlayingMovies, displayNowPlayingMovies } from "./sections/now-playing.js";
import { fetchUpcomingMovies, displayUpcomingMovies } from "./sections/upcoming.js";

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

const searchItem = document.querySelector('.js-search-item');

document.querySelector('.js-search')
    .addEventListener('click', () => {
        searchMovie(searchItem.value)
    });

searchItem.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchMovie(searchItem.value)
    }
});

document.addEventListener('click', (e) => {
    const card = e.target.closest('.js-movie-card');
  if (card) {
    const movie = {
      id: card.getAttribute('data-movie-id'),
      category: card.getAttribute('data-movie-category')
    };

    localStorage.setItem('selectedMovieId', movie.id);
    localStorage.setItem('selectedMovieCategory', movie.category);
    window.location.href = `movie-details-page.html`;
  }
});
