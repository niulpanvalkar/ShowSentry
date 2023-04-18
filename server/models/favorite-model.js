import mongoose from "mongoose";

// const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    mediaType: {
        type: String,
        enum: ['tv','movies'],
        required: true
    },
    mediaId: {
        type: ObjectId,
        required: true
    },
    mediaTitle: {
        type: String,
        required: true
    },
    mediaRate: {
        type: String,
        required: true
    }
})

// mongoose exports a model method
const favoriteModel = mongoose.model("Favorite", favoriteSchema);
export default favoriteModel;