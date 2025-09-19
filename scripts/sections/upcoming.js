import { tmdb, endPoints } from "../axios-instance.js";

const upcomingMoviesSection = document.querySelector('.js-upcoming-movies');

export const fetchUpcomingMovies = async () => {
    const cached  = localStorage.getItem("upcomingMovies");
    if (cached) {
        setTimeout(() => {
            localStorage.removeItem("upcomingMovies");
        }, 1000 * 60 * 60)
        return JSON.parse(cached);
    }

    try {
        const { data } = await tmdb.get(endPoints.upcoming);
        const response = data.results;
        localStorage.setItem("upcomingMovies", JSON.stringify(response));
        return response;
    } catch (error) {
        handleError(error);
    }
} 

export function displayUpcomingMovies(response) {
    const upcomingMovies = response;
    upcomingMovies.map(upcomingMovie => {
        upcomingMoviesSection.innerHTML += `
        <div class="movie-card js-movie-card " data-movie-id='${upcomingMovie.id}' data-movie-category='popular'>
            <img src='https://image.tmdb.org/t/p/w500${upcomingMovie.poster_path}' alt='${upcomingMovie.title}'/>   
            <p>${upcomingMovie.title}</p>
            <p>${upcomingMovie.release_date}</p>
            <p>Rating: ${upcomingMovie.vote_average}</p>
        </div>
        `;
    });
       
}