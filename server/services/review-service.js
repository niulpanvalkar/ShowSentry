import { param } from "express-validator";
import reviewModel from "../models/review-model.js";
import Review from "../models/review-model.js";

export const createReview = async (params) => {
    try {
        console.log("review-service : createReview");
        console.log("params: ", params);
        const {
            movieId,
            userId,
            body
        } = params;
        const review = new Review({
            user: userId,
            mediaId: movieId,
            ...body
        });
        const result = await review.save();
        return {
            success: true,
            message: "Successfully created user review",
            id: result["id"],
            user: result['user'],
            ...result['_doc']
        };
    } catch (error) {
        console.log(`ERROR IN reivew-service : createReview :: ${error}`);
        return {
            success: false,
            errorCode: 500
        };
    }
};

export const getUserReview = async(params) => {
    try{
        console.log("review-service : getUserReview");
        console.log("user id: ", params);
        console.log("params: ", params);
        
        const review = await reviewModel.find({
            user: params
        }).sort("-createdAt");
        console.log("review",review);
        if (!review) {
            return {
              success: false,
              message: "Review by user not found",
              errorCode: 500,
            };
          }
          return { success: true, message: "Review by user found", data: review };

    } catch(error) {
        return { success: false, errorCode: 500 };
    }
};

export const removeReview = async(params) => {
    try{
        console.log("params: ", params.reviewId,params.userId);
        const review = await reviewModel.findOne({
            _id: params.reviewId,
            user: params.userId
        });
        console.log("review found",review);
        if (!review) {
            return {
              success: false,
              message: "Review by user not found",
              errorCode: 404,
            };
          }
        await review.findOneAndDelete({
            _id: params.reviewId,
            user: params.userId
        });
        return { success: true, message: "Review deleted successfully", data: review };
    } catch(error) {
        return { success: false, errorCode: 500 };
    }
};