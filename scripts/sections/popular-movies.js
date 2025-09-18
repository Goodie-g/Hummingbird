import { tmdb, endPoints } from "../axios-instance.js";

const popularMoviesSection = document.querySelector('.js-popular-movies');

export const fetchPopularMovies = async () => {
    const cached  = localStorage.getItem("popularMovies");
    if (cached) {
        setTimeout(() => {
            localStorage.removeItem("popularMovies");
        }, 1000 * 60 * 60)
        return JSON.parse(cached);
    } else {
        try {
            const { data } = await tmdb.get(endPoints.popular);
            const response = data.results;
            localStorage.setItem("popularMovies", JSON.stringify(response));
            return response;
        } catch (error) {
            handleError(error);
        }
    }
} 

export function displayPopularMovies(response) {
    const popularMovies = response;
    popularMovies.map(popularMovie => {
        popularMoviesSection.innerHTML += `
        <div class="movie-card js-movie-card " data-movie-id='${popularMovie.id}' data-movie-category='popular'>
            <img src='https://image.tmdb.org/t/p/w500${popularMovie.poster_path}' alt='${popularMovie.title}'/>   
            <p>${popularMovie.title}</p>
            <p>${popularMovie.release_date}</p>
            <p>Rating: ${popularMovie.vote_average}</p>
        </div>
        `;
    });
       
}