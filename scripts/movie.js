import { tmdb } from "./axios-instance.js";


const movieId = localStorage.getItem("selectedMovieId");
const category = localStorage.getItem("selectedCategory");

if (!movieId) {
  console.error("No movieId found in localStorage!");
} else {
  tmdb.get(`/movie/${movieId}`)
    .then(res => {
      const movie = res.data;
      console.log("Movie details:", movie, "from category:", category);
      displayMovieDetails(movie);
    })
    .catch(err => console.error("Error fetching movie:", err));
}

function displayMovieDetails(movie) {
    const movieDetailsSection = document.querySelector('.js-movie-details');
    movieDetailsSection.innerHTML = `
        <div class="movie-detail-card">
            <img src='https://image.tmdb.org/t/p/w500${movie.poster_path}' alt='${movie.title}'/>   
            <h2>${movie.title}</h2>
            <p>${movie.release_date}</p>
            <p>Rating: ${movie.vote_average}</p>
            <p>${movie.overview}</p>
        </div>
    `;
}