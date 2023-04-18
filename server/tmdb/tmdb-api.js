import axiosClient from "../axios/axios-client";
import tmdbEndpoints from "./tmdb-endpoints";

const tmdbApi = {
    mediaList: async (mediaType, mediaCategory, page) => await axiosClient.get(
        tmdbEndpoints.mediaList({
            mediaType,
            mediaCategory,
            page
        })
    ),
    mediaSearch: async (mediaType, query, page) => await axiosClient.get(
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

export default tmdbApi