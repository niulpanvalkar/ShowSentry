const baseUrl = process.env.TMDB_BASE_URL;
const key = process.env.TMDB_KEY;

const getUrl = (endpoint,params) => {
    const queryParams = new URLSearchParams(params);

    return `${baseUrl}${endpoint}?api_key=${key}&${queryParams}`
};

export default {getUrl}