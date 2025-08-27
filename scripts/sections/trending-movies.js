import { tmdb, endPoints } from "../axios-instance.js";

export const fetchTrendingMovies = async () => {
    const cached  = localStorage.getItem("trendingMovies");
    if (cached) {
        console.log(cached);
        setTimeout(() => {
            localStorage.removeItem("trendingMovies");
        }, 1000 * 60 * 60)
        return JSON.parse(cached);
    }
    
    try {
        const response = await tmdb.get(endPoints.trending);
        localStorage.setItem("trendingMovies", JSON.stringify(response));
        return response;
    } catch (error) {
        handleError(error);
    }
};

