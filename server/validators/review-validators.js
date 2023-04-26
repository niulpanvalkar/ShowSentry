import {
    body,
    validationResult
} from "express-validator";

export const validateUserReview = [
    body("mediaId")
    .exists().withMessage("MediaId is required"),
    body("content")
    .exists().withMessage("Content is required"),
    body("mediaType")
    .exists().withMessage("MediaType is required")
    .custom(type => ['movie', 'tv']).withMessage("Invalid meidaType"),
    body("mediaTitle")
    .exists().withMessage("mediaTitle is required"),
    body("mediaPoster")
    .exists().withMessage("mediaPoster is required"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        next();
    },
];