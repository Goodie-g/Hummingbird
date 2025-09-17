import { endPoints, tmdb } from "../axios-instance.js"; 

const searchItem = document.querySelector('.js-search-item');
export const movieResultsSection = document.querySelector('.js-movie-results');
const params = new URLSearchParams(window.location.search);
const query = params.get("query");

async function searchMovie(query) {
    try {
        const response = await tmdb.get(endPoints.search, { params: { query }, 
        });
        const { data } = response;
        displayMovieSearchResults(data);
    } catch(error) {
        handleError(error)
    }
}

document.querySelector('.js-search')
    .addEventListener('click', async () => {
        await searchMovie(searchItem.value)
            .then(data => {
                displayMovieSearchResults(data);
                
            });
    });

searchItem.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchMovie(searchItem.value)
    }
});

function displayMovieSearchResults(data) {
    movieResultsSection.innerHTML = '';
    data.results.map(movie => {
        movieResultsSection.innerHTML += `
        <div class="movie-card js-movie-card" data-movie-id='${movie.id}' data-movie-category='search'>
            <img src='https://image.tmdb.org/t/p/w500${movie.poster_path}' alt='${movie.title}'/>   
            <p>${movie.title}</p>
            <p>${movie.release_date}</p>
            <p>Rating: ${movie.vote_average}</p>
        </div>
        `;
    });
}

if (query) {
  searchMovie(query)
} else {
  movieResultsSection.innerHTML = "<p>No search query provided.</p>";
}