import { fetchTrendingMovies, displayTrendingMovies } from "../sections/trending-movies.js";
import { fetchPopularMovies, displayPopularMovies } from "../sections/popular-movies.js";
import { fetchNowPlayingMovies, displayNowPlayingMovies } from "../sections/now-playing.js";
import { fetchUpcomingMovies, displayUpcomingMovies } from "../sections/upcoming.js";

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
    .addEventListener('click', goToSearchPage);

searchItem.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        goToSearchPage();
    }
});

function goToSearchPage() {
    const query = searchItem.value.trim();
    if (query) {
    window.location.href = `search-page.html?query=${encodeURIComponent(query)}`;
    }
}

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
