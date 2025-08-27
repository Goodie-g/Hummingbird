import { tmdb, endPoints } from "../axios-instance.js";

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

