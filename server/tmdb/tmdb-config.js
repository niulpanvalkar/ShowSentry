import dotenv from "dotenv";
dotenv.config();

const baseUrl = process.env.TMDB_BASE_URL;
const key = process.env.TMDB_KEY;

export const getUrl = (endpoint,params) => {
    const queryParams = new URLSearchParams(params);
    console.log("params",params);
    console.log('QuerParams', queryParams);
    console.log("endpoint",endpoint);
    console.log(` ENDPOINT URL : ${baseUrl}${endpoint}?api_key=${key}&${queryParams}`);

    return `${baseUrl}${endpoint}?api_key=${key}&${queryParams}`
};

// export default getUrl;