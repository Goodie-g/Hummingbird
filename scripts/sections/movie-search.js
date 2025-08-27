import { tmdb, endPoints } from "../axios-instance.js";

export async function searchMovie(query) {
    try {
        const response = await tmdb.get(endPoints.search, { params: { query }, 
        });
        const { data } = response;
        return data;
    } catch (error) {
        handleError(error)
    }
}