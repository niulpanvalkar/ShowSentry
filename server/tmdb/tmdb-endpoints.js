import * as tmdbConfig from "./tmdb-config.js";

const tmdbEndpoints = {
    mediaList: ({
        mediaType,
        mediaCategory,
        page
    }) => tmdbConfig.getUrl(
        `${mediaType}/${mediaCategory}`, {
            page
        }
    ),
    mediaDetail: ({
        mediaType,
        mediaId
    }) => tmdbConfig.getUrl(
        `${mediaType}/${mediaId}`
    ),
    mediaGenre: ({
        mediaType
    }) => tmdbConfig.getUrl(
        `genre/${mediaType}/list`
    ),
    mediaSearch: ({
        mediaType,
        query,
        page
    }) => tmdbConfig.getUrl(
        `search/${mediaType}`, {
            query,
            page
        }
    ),
    mediaCredits: ({
        mediaType,
        mediaId
    }) => tmdbConfig.getUrl(
        `${mediaType}/${mediaId}/credits`
    ),
    mediaVideos: ({
        mediaType,
        mediaId
    }) => tmdbConfig.getUrl(
        `${mediaType}/${mediaId}/videos`
    ),
    mediaRecommend: ({
        mediaType,
        mediaId
    }) => tmdbConfig.getUrl(
        `${mediaType}/${mediaId}/recommendations`
    ),
    mediaImages: ({
        mediaType,
        mediaId
    }) => tmdbConfig.getUrl(
        `${mediaType}/${mediaId}/images`
    ),
    personalDetail: (personId) => tmdbConfig.getUrl(
        `person/${personId}`
    ),
    personMedias: ({
        personId
    }) => tmdbConfig.getUrl(
        `person/${personId}/combined_credits`
    ),
};

export default tmdbEndpoints;