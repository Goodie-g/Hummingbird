import { apiKey } from "../apiKey.js";

const BASE_URL = 'https://api.themoviedb.org/3'

// axios instance
const tmdb = axios.create({
    baseURL: BASE_URL,
    params: {
        api_key: apiKey
    }
});

export const fetchTrendingMovies = async () => {
    try {
        const response = await tmdb.get('/trending/movie/week');
        return response;
    } catch (error) {
        handleError(error)
    }
};

