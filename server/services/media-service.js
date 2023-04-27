import {
    response
} from "express";
import tmdbApi from "../tmdb/tmdb-api.js";
import userModel from "../models/user-model.js";
import reviewModel from "../models/review-model.js";
import favoriteModel from "../models/favorite-model.js";
import tokenMiddleware from "../middlewares/token-middleware.js";

export const fetchMediaList = async (params) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await tmdbApi.mediaList(params.mediaType, params.mediaCategory, params.page);
            console.log("Response : ", response);
            resolve({
                success: true,
                message: "Results fetched successfully",
                data: response
            });
        } catch (error) {
            console.error("Failed to fetch media list from TMDB API", error);
            reject({
                success: false,
                message: "Failed to fetch media list",
                status_code: 500
            });
        }
    })
}

export const getGenres = async (params) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("Inside getGenres service: ", params);
            const response = await tmdbApi.mediaGenres(params.mediaType);
            console.log("Response : ", response);
            resolve({
                success: true,
                message: "Results fetched successfully",
                data: response
            });
        } catch (error) {
            console.error("Failed to fetch genre from TMDB API", error);
            reject({
                success: false,
                message: "Failed to fetch genre",
                status_code: 500
            });
        };
    })

}

export const mediaSearch = async (params) => {
    return new Promise(async (resolve, reject) => {
        try {

            const mediaType = params.mediaType;
            const query = params.query;
            const page = params.page;
            console.log("Params inside media service", mediaType);
            const response = await tmdbApi.mediaSearch({
                query,
                page,
                mediaType: mediaType === "people" ? "person" : mediaType
            });
            console.log("Response : ", response);
            resolve({
                success: true,
                message: "Results fetched successfully",
                data: response
            });
        } catch (error) {
            console.error("media-service : Failed to search movies from TMDB API", error);
            reject({
                success: false,
                message: "Failed to search movies from TMDB API",
                status_code: 500
            });
        }
    })
};

export const getDetail = async (params) => {
    try {
        console.log("media-service: params :: ", params);
        const {
            mediaType,
            mediaId
        } = params;
        const req = params.headers;
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
            .find({
                mediaId
            })
            .populate("user")
            .sort("-createdAt");
        return {
            success: true,
            message: "Details fetched successfully",
            data: media
        };
    } catch (error) {
        return {
            success: false,
            errorCode: 500
        };
    }
};