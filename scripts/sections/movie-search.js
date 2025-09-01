import { tmdb, endPoints } from "../axios-instance.js";

const moviesSection = document.querySelector('.js-movies');

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
    moviesSection.innerHTML = '';
    data.results.map(movie => {
        moviesSection.innerHTML += `
            <img src='https://image.tmdb.org/t/p/w500${movie.poster_path}' alt='${movie.title}'/>   
            <p>${movie.title}</p>
            <p>${movie.release_date}</p>
            <p>Rating: ${movie.vote_average}</p>
        
        `;
    });
}