import { tmdb, endPoints } from "../utils/axios-instance.js";
import { openMovieDetails } from "../utils/openMovieDetails.js";
import "../utils/search-feature.js";
import { setCache, getCache } from "../utils/cacheHandling.js";

let currentPage = 1;
let totalPages =  1;

async function fetchTrendingMoviesPage(page=1) {
    const cacheKey = `trendingMovie-${page}`;
    const cached  = getCache(cacheKey)
    if (cached) return cached;

    try {
        const { data } = await tmdb.get(endPoints.trending, {params:{ page}});
        const response = data.results;
        setCache(cacheKey, response);
        totalPages = data.total_pages;
        return response;
    } catch (error) {
        handleError(error);
    }
}

const trendingMoviesSection = document.querySelector('.js-trending-movies');

function displayTrendingMoviesPage(response) {
    const trendingMovies = response;
    if (!trendingMoviesSection) return;
    trendingMovies.map(trendingMovie => {
    trendingMoviesSection.innerHTML += `
        <div class="movie-card js-movie-card " data-movie-id='${trendingMovie.id}' data-movie-category='trending'>
            <img src='https://image.tmdb.org/t/p/w500${trendingMovie.poster_path}' alt='${trendingMovie.title}'/>   
            <p>${trendingMovie.title}</p>
            <p>${trendingMovie.release_date}</p>
            <p>Rating: ${trendingMovie.vote_average}</p>
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
    fetchTrendingMoviesPage(currentPage)
        .then(response => {
            displayTrendingMoviesPage(response);
            updatePaginationUI()
        });
  }
});

document.getElementById("next").addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage++;
    fetchTrendingMoviesPage(currentPage)
        .then(response => {
            displayTrendingMoviesPage(response);
            updatePaginationUI();
        });
  }
});

fetchTrendingMoviesPage()
    .then(response => {
        displayTrendingMoviesPage(response);
        updatePaginationUI();
    })

document.addEventListener('click', (e) => {
    openMovieDetails(e)
});