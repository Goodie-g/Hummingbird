import { tmdb, endPoints } from "../utils/axios-instance.js";
import { openMovieDetails } from "../utils/openMovieDetails.js";
import "../utils/search-feature.js";

let currentPage = 1;
let totalPages =  1;

async function fetchPopularMoviesPage(page=1) {
    
    try {
        const { data } = await tmdb.get(endPoints.popular, {params: {page}});
        const response = data.results;
        totalPages = data.total_pages;

        return response;
    } catch (error) {
        handleError(error);
    }
}

const popularMoviesSection = document.querySelector('.js-popular-movies');

function displayPopularMoviesPage(response) {
    const popularMovies = response;
    if (!popularMoviesSection) return;
    popularMoviesSection.innerHTML = '';
    popularMovies.map(popularMovie => {
        popularMoviesSection.innerHTML += `
            <div class="movie-card js-movie-card " data-movie-id='${popularMovie.id}' data-movie-category='trending'>
                <img src='https://image.tmdb.org/t/p/w500${popularMovie.poster_path}' alt='${popularMovie.title}'/>   
                <p>${popularMovie.title}</p>
                <p>${popularMovie.release_date}</p>
                <p>Rating: ${popularMovie.vote_average}</p>
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
    fetchPopularMoviesPage(currentPage)
        .then(response => {
            displayPopularMoviesPage(response);
            updatePaginationUI()
        });
  }
});

document.getElementById("next").addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage++;
    fetchPopularMoviesPage(currentPage)
        .then(response => {
            displayPopularMoviesPage(response);
            updatePaginationUI();
        });
  }
});

fetchPopularMoviesPage()
    .then(response => {
        displayPopularMoviesPage(response);
        updatePaginationUI();
    })

document.addEventListener('click', (e) => {
    openMovieDetails(e)
});