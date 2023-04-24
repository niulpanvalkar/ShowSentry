import * as tmdbConfig from "./tmdb-config.js";

const tmdbEndpoints = {
    mediaList: ({mediaType, mediaCategory, page}) => tmdbConfig.getUrl(
        `${mediaType}/${mediaCategory}`,{page}
    ),
    mediaSearch: ({mediaType, query, page}) => tmdbConfig.getUrl(
        `search/${mediaType}`, {query,page}
    ),
    personalDetail: (personId) => tmdbConfig.getUrl(
        `person/${personId}`
    ), 
};

export default tmdbEndpoints;