import { tmdb, endPoints } from "../axios-instance.js";

const trendingMoviesSection = document.querySelector('.js-trending-movies');

export const fetchTrendingMovies = async () => {
    const cached  = localStorage.getItem("trendingMovies");
    if (cached) {
        setTimeout(() => {
            localStorage.removeItem("trendingMovies");
        }, 1000 * 60 * 60)
        return JSON.parse(cached);
    }  
    try {
        const { data } = await tmdb.get(endPoints.trending);
        const response = data.results;
        localStorage.setItem("trendingMovies", JSON.stringify(response));
        return response;
    } catch (error) {
        handleError(error);
    }
    
}

export function displayTrendingMovies(response) {
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