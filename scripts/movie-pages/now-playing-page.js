import { tmdb, endPoints } from "../utils/axios-instance.js";
import { openMovieDetails } from "../utils/openMovieDetails.js";

let currentPage = 1;
let totalPages =  1;

async function fetchNowPlayingPage(page=1) {
    const cached  = localStorage.getItem("nowPlaying");
    if (cached) {
        setTimeout(() => {
            localStorage.removeItem("nowPlaying");
        }, 1000 * 60 * 60);
        return JSON.parse(cached);
    }  
    try {
        const { data } = await tmdb.get(endPoints.nowPlaying, {params: {page}});
        const response = data.results;
        localStorage.setItem("nowPlaying", JSON.stringify(response));
        return response;
    } catch (error) {
        handleError(error);
    }
}

const nowPlayingSection = document.querySelector('.js-now-playing');

function displayNowPlayingPage(response) {
    const nowPlaying = response;
    if (!nowPlayingSection) return;
    nowPlayingSection.innerHTML = '';
    nowPlaying.map(nowPlaying => {
        nowPlayingSection.innerHTML += `
            <div class="movie-card js-movie-card " data-movie-id='${nowPlaying.id}' data-movie-category='trending'>
                <img src='https://image.tmdb.org/t/p/w500${nowPlaying.poster_path}' alt='${nowPlaying.title}'/>   
                <p>${nowPlaying.title}</p>
                <p>${nowPlaying.release_date}</p>
                <p>Rating: ${nowPlaying.vote_average}</p>
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
    fetchNowPlayingPage(currentPage)
        .then(response => {
            displayNowPlayingPage(response);
            updatePaginationUI()
        });
  }
});

document.getElementById("next").addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage++;
    fetchNowPlayingPage(currentPage)
        .then(response => {
            displayNowPlayingPage(response);
            updatePaginationUI();
        });
  }
});

fetchNowPlayingPage()
    .then(response => {
        displayNowPlayingPage(response);
        updatePaginationUI();
    })

document.addEventListener('click', (e) => {
    openMovieDetails(e)
});