import mongoose from "mongoose";

const {Schema} = mongoose;

const userSchema = new Schema({
    username : {
        type: String,
        required: true,
        unique: true
    },
    displayName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const userModel = mongoose.model('User', userSchema);

export default userModel;