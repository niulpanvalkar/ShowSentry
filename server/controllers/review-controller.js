import responseHelper from "../utils/response-helper.js";
import * as reviewService from "../services/review-service.js";
import { response } from "express";

export const createReview = async(request, response) => {
    try{
        console.log("review-controller: createReview");
        const movieId = request.body['movieId'];
        const userId = request.user.id;
        const body = request.body;
        console.log("Request params in createReview",movieId ,userId ,body )
        const result = await reviewService.createReview({movieId,userId,body});
        if(result.success) {
            responseHelper.setResponse(response, 201, result);
        } else {
            responseHelper.setResponse(response, result.errorCode, result);
        }
    } catch(error) {
        console.log("review-controller : createReview :: ERROR ", error.message)
        responseHelper.setResponse(response, result.errorCode, error);
    } 
};


export const getUserReview = async(request, response) => {
    try{
        console.log("review-controller: getUserReview")
        const userId = request.user.id;
        console.log("Request params in getUserReview", userId);
        const result = await reviewService.getUserReview(userId);
        if(result.success) {
            responseHelper.setResponse(response, 200, result);
        } else {
            responseHelper.setResponse(response, result.errorCode, result);
        }

    } catch (error) {
        console.log("review-controller : getUserReview :: ERROR ", error.message)
        responseHelper.setResponse(response, result.errorCode, error);
    }
}