import { apiKey } from "./apiKey.js";


const BASE_URL = 'https://api.themoviedb.org/3'

// axios instance
export const tmdb = axios.create({
    baseURL: BASE_URL,
    params: {
        api_key: apiKey
    }
});

export const endPoints = {
    trending: '/trending/movie/week',
    search: '/search/movie',
    movieDetails: `/movie`,
    popular: '/movie/popular',
    upcoming: '/movie/upcoming',
    nowPlaying: '/movie/now_playing'
}