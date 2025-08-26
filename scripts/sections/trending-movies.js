import { tmdb, endPoints } from "../axios-instance.js";

export const fetchTrendingMovies = async () => {
    try {
        const response = await tmdb.get(endPoints.trending);
        return response;
    } catch (error) {
        handleError(error)
    }
};

