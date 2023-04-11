import mongoose from "mongoose";

const {Schema} = mongoose;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {type: String, required: true},
    password: {type: String, required: true},
    isVerified: {type:Boolean, default:false}
})

const User = mongoose.model('User', userSchema);

export default User;