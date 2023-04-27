import mongoose from "mongoose";
import bcrypt from "bcrypt";
import modelOptions from "./options.js";

const userSchema = new mongoose.Schema({
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
    },
    email: {
        type: String,
        required: true,
        unique : true
    }
}, modelOptions);

userSchema.methods.setPassword = function (passwordInput)  {
    const salt = 10;
    this.password = bcrypt.hashSync(passwordInput, salt);
}



const userModel = mongoose.model('User', userSchema);

export default userModel;