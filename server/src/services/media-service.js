import tmdbApi from "../tmdb/tmdb-api.js";

export const fetchMediaList= async(params) => {
    return new Promise(async (resolve, reject) => {
        try{
            const response =  await tmdbApi.mediaList(params);
            resolve(response);

        } catch(error){
            console.error("Failed to fetch media list from TMDB API", error);
            reject({
                success: false, message: "Failed to fetch media list"
            });
        }
    })
}