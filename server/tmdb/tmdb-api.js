import * as axiosClient from "../axios/axios-client.js";
import tmdbEndpoints from "./tmdb-endpoints.js";

const tmdbApi = {
    mediaList: async (mediaType, mediaCategory, page) => await axiosClient.get(
        tmdbEndpoints.mediaList({
            mediaType,
            mediaCategory,
            page
        })
    ),
    mediaGenres: async({mediaType}) => await axiosClient.get(
        tmdbEndpoints.mediaGenre({
            mediaType
        })
    ),
    mediaSearch: async ({mediaType, query, page}) => await axiosClient.get(
        tmdbEndpoints.mediaSearch({
            mediaType,
            query,
            page
        })
    ),
    personalDetail: async (personId) => await axiosClient.get(
        tmdbEndpoints.personalDetail({
            personId
        })
    ),
};

export default tmdbApi;