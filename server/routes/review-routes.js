import express from "express";

import * as reviewController from "../controllers/review-controller.js";
import tokenMiddleware from "../middlewares/token-middleware.js";
import * as reviewValidator from "../validators/review-validators.js";


const router = express.Router({
    mergeParams: true
});


router.post("/",
    tokenMiddleware.auth,
    reviewValidator.validateUserReview,
    reviewController.createReview);

router.get("/", tokenMiddleware.auth, reviewController.getUserReview);

router.delete("/:reviewId",
    tokenMiddleware.auth,
    reviewController.removeReview);


export default router;