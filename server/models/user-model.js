import mongoose from "mongoose";
import bcrypt from "bcrypt";

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
    },
    email: {
        type: String,
        required: true,
        unique : true
    }
})

userSchema.methods.setPassword = async (password) => {
    const salt = 10;
    this.password = await bcrypt.hash(password, salt);
}



const userModel = mongoose.model('User', userSchema);

export default userModel;