import { endPoints, tmdb } from "../axios-instance.js"; 
import { openMovieDetails } from "../utils/openMovieDetails.js";

const searchItem = document.querySelector('.js-search-item');
export const movieResultsSection = document.querySelector('.js-movie-results');
const params = new URLSearchParams(window.location.search);
const query = params.get("query");

let currentPage = 1;
let totalPages =  1;

async function searchMovie(query, page = 1) {
    try {
        const response = await tmdb.get(endPoints.search, { params: { query, page }, 
        });
        const { data } = response;
        totalPages = data.total_pages;

        displayMovieSearchResults(data);
        updatePaginationUI();
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

function updatePaginationUI() {
    document.getElementById("page-number").textContent = currentPage;

    document.getElementById("prev").disabled = currentPage === 1;
    document.getElementById("next").disabled = currentPage === totalPages;
}

document.getElementById("prev").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    searchMovie(query, currentPage);
  }
});

document.getElementById("next").addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage++;
    searchMovie(query, currentPage);
  }
});

if (query) {
  searchMovie(query)
} else {
  movieResultsSection.innerHTML = "<p>No search query provided.</p>";
}

document.addEventListener('click', (e) => {
    openMovieDetails(e)
});