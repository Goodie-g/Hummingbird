import { tmdb, endPoints } from "../utils/axios-instance.js";

const nowPlayingMoviesSection = document.querySelector('.js-now-playing');

export const fetchNowPlayingMovies = async () => {
    const cached  = localStorage.getItem("nowPlayingMovies");
    if (cached) {
        setTimeout(() => {
            localStorage.removeItem("nowPlayingMovies");
        }, 1000 * 60 * 60)
        return JSON.parse(cached);
    } else {
        try {
            const { data } = await tmdb.get(endPoints.nowPlaying);
            console.log(data)
            const response = data.results;
            localStorage.setItem("nowPlayingMovies", JSON.stringify(response));
            return response;
        } catch (error) {
            handleError(error);
        }
    }
} 

export function displayNowPlayingMovies(response) {
    const nowPlayingMovies = response;
    if (!nowPlayingMoviesSection) return;
    nowPlayingMovies.map(nowPlayingMovie => {
        nowPlayingMoviesSection.innerHTML += `
        <div class="movie-card js-movie-card " data-movie-id='${nowPlayingMovie.id}' data-movie-category='popular'>
            <img src='https://image.tmdb.org/t/p/w500${nowPlayingMovie.poster_path}' alt='${nowPlayingMovie.title}'/>   
            <p>${nowPlayingMovie.title}</p>
            <p>${nowPlayingMovie.release_date}</p>
            <p>Rating: ${nowPlayingMovie.vote_average}</p>
        </div>
        `;
    });
       
}