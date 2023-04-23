import mongoose from "mongoose";

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
});

const reviewModel = mongoose.model("Review", reviewSchema)
export default reviewModel;