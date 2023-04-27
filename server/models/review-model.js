import mongoose from "mongoose";
import modelOptions from "./options.js";

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    content: {
        type: String,
        required: true
    },
    mediaType: {    
        type: String,
        enum: ['tv', 'movie'],
        required: true
    },
    mediaTitle: {
        type: String,
        required: true
    },
    mediaId: {
        type: String,
        required: true
    }
}, modelOptions);

const reviewModel = mongoose.model("Review", reviewSchema)
export default reviewModel;