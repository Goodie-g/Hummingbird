import { tmdb, endPoints } from "../utils/axios-instance.js";
import { openMovieDetails } from "../utils/openMovieDetails.js";
import "../utils/search-feature.js";

let currentPage = 1;
let totalPages =  1;

async function fetchUpcomingMoviesPage(page=1) {
    
    try {
        const { data } = await tmdb.get(endPoints.upcoming, {params: {page}});
        const response = data.results;
        totalPages = data.total_pages;

        return response;
    } catch (error) {
        handleError(error);
    }
}

const UpcomingMoviesSection = document.querySelector('.js-upcoming-movies');

function displayUpcomingMoviesPage(response) {
    const UpcomingMovies = response;
    if (!UpcomingMoviesSection) return;
    UpcomingMoviesSection.innerHTML = '';
    UpcomingMovies.map(UpcomingMovie => {
        UpcomingMoviesSection.innerHTML += `
            <div class="movie-card js-movie-card " data-movie-id='${UpcomingMovie.id}' data-movie-category='trending'>
                <img src='https://image.tmdb.org/t/p/w500${UpcomingMovie.poster_path}' alt='${UpcomingMovie.title}'/>   
                <p>${UpcomingMovie.title}</p>
                <p>${UpcomingMovie.release_date}</p>
                <p>Rating: ${UpcomingMovie.vote_average}</p>
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
    fetchUpcomingMoviesPage(currentPage)
        .then(response => {
            displayUpcomingMoviesPage(response);
            updatePaginationUI()
        });
  }
});

document.getElementById("next").addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage++;
    fetchUpcomingMoviesPage(currentPage)
        .then(response => {
            displayUpcomingMoviesPage(response);
            updatePaginationUI();
        });
  }
});

fetchUpcomingMoviesPage()
    .then(response => {
        displayUpcomingMoviesPage(response);
        updatePaginationUI();
    })

document.addEventListener('click', (e) => {
    openMovieDetails(e)
});