import { tmdb, endPoints } from "../axios-instance.js";
import { movieResultsSection } from "../movie-pages/search-page.js";

export const searchMovie = async (query) => {
    try {
        const response = await tmdb.get(endPoints.search, { params: { query }, 
        });
        const { data } = response;
        return data;
    } catch (error) {
        handleError(error)
    }
}

export const displayMovieSearchResult = (data) => {
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

