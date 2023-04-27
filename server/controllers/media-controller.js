import responseHelper from "../utils/response-helper.js";
import * as mediaService from "../services/media-service.js";
import tmdbApi from "../tmdb/tmdb-api.js";
import userModel from "../models/user-model.js";
import reviewModel from "../models/review-model.js";
import favoriteModel from "../models/favorite-model.js";
import tokenMiddleware from "../middlewares/token-middleware.js";


export const fetchMediaList = async(request, response) => {
    try{
        const page = request.query["page"];
        const mediaType = request.params['mediaType'];
        const mediaCategory = request.params['mediaCategory'];
        const data = await mediaService.fetchMediaList({page,mediaCategory,mediaType});
        if (data.success){
            responseHelper.setResponse(response,200,data)
        } else {
            responseHelper.setResponse(response, 500,data)
        }
        // return response.status(200).send(data);
    } catch(error) {
        console.log("medai-controller : fetchList :: ERROR ", error.message)
        responseHelper.setResponse(response, 500, error);
    }
}


export const getGenres = async(request, response) => {
    try {
        const mediaType = request.params;
        
        const result = await mediaService.getGenres({mediaType});
        console.log("Result" , result);
        if (result.success){
            responseHelper.setResponse(response,200,result)
        } else {
            responseHelper.setResponse(response, 500,result)
        }
    } catch (error) {
        console.log("media-controller : fetchGenres :: ERROR ", error.message)
        responseHelper.setResponse(response, 500, error);
    }
}

export const search = async(request,response)=> {
    try{
        const mediaType = request.params['mediaType'];
        const query = request.query["query"];
        const page = request.query["page"];
        console.log("Request in search ",query, page, mediaType);
        const result = await mediaService.mediaSearch({query,page,mediaType});
        if (result.success){
            responseHelper.setResponse(response,200,result)
        } else {
            responseHelper.setResponse(response, 500,result)
        }
    } catch (error){
        console.log("media-controller : search :: ERROR ", error.message)
        responseHelper.setResponse(response, 500, error);
    }
}


export const getDetail = async (req, res) => {
  try {
    console.log("request params : ", req.params);
    const { mediaType, mediaId } = req.params;

    const params = { mediaType, mediaId };

    console.log("getDetail: media-controller :: params ", params);

    const media = await tmdbApi.mediaDetail(params);

    [media.credits, media.videos, media.recommend, media.images] =
      await Promise.all([
        tmdbApi.mediaCredits(params),
        tmdbApi.mediaVideos(params),
        tmdbApi.mediaRecommend(params),
        tmdbApi.mediaImages(params),
      ]);

    const tokenDecoded = tokenMiddleware.decodeToken(req);

    if (tokenDecoded) {
      const user = await userModel.findById(tokenDecoded.data);

      if (user) {
        const isFavorite = await favoriteModel.findOne({
          user: user.id,
          mediaId,
        });
        media.isFavorite = isFavorite !== null;
      }
    }

    media.reviews = await reviewModel
      .find({ mediaId })
      .populate("user")
      .sort("-createdAt");
      
    responseHelper.setResponse(res, 200, {
      data: media,
      message: "successfully fetched details",
    });
  } catch (e) {
    console.log(e);
    responseHelper.setResponse(res, 500, error);
  }
};
