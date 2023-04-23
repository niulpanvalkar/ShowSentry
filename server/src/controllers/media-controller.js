import responseHelper from "../utils/response-helper.js";
import tmdbApi from "../tmdb/tmdb-api.js";
import reviewModel from "../models/review-model.js";

import * as mediaService from "../services/media-service.js";


export const fetchMediaList = async(request, response) => {
    try{
        const page = req.query;
        const mediaType = req.params['mediaType'];
        const mediaCategory = req.params['mediaCategory'];
        const data = await mediaService.fetchMediaList(page,mediaCategory,mediaType);
        return response.status(200).send(data);
    } catch(error) {
        console.error('Failed to fetch mediaList');
        return response.status(500).send(data);
    }
}
