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
        localStorage.setItem("trendingMovies", JSON.stringify(data.results));
        const response = data.results;
        return response;
    } catch (error) {
        handleError(error);
    }
};

export function displayTrendingMovies(response) {
    const trendingMovies = response;
        trendingMovies.map(trendingMovie => {
            
            trendingMoviesSection.innerHTML += `
                <img src='https://image.tmdb.org/t/p/w500${trendingMovie.poster_path}' alt='${trendingMovie.title}'/>   
                <a href="movie.html">
                    <p>${trendingMovie.title}</p>
                </a> 
                <p>${trendingMovie.release_date}</p>
                <p>Rating: ${trendingMovie.vote_average}</p>
            `;
        });
       
}