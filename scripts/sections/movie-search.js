import { tmdb, endPoints } from "../axios-instance.js";

/* export const searchMovie = async () => {
    try {
        const response = await tmdb.get(endPoints.search);
        return response;
    } catch (error) {
        handleError(error)
    }
}; */

export async function searchMovie(query) {
    try {
        const response = await tmdb.get(endPoints.search, { params: { query }, 
        });
        return response;
    } catch (error) {
        handleError(error)
    }
}