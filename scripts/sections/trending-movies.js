import { tmdb } from "../axios-instance.js";

export const fetchTrendingMovies = async () => {
    try {
        const response = await tmdb.get('/trending/movie/week');
        return response;
    } catch (error) {
        handleError(error)
    }
};

