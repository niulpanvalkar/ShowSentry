import jwt from "jwt";
import responseHelper from "../utils/response-helper";
import userModel from "../models/user-model";
import dotenv from "dotenv";

dotenv.config();

const decodeToken = async (request) => {
    try {
        const bearerHeader = request.headers["authorization"];
        if(bearerHeader) {
            const token = bearerHeader.split(" ")[1];
            return jwt.verify(token, proces.env.TOKEN_SECRET);
        }
        return false
    }catch(error){
        console.log("Failed to decode token : ", error);
        return false;
    }
}

const auth = async(request, response, next) => {
    const decodedToken = await decodeToken(request);
    console.log("decodedToken : ", decodedToken);
    if(!decodedToken) {
        responseHelper.setResponse(response, 401, {success: false, message: "User unauthorized"});      
    }  
    
    const user = userModel.findById(decodedToken.data);
    if(!user) {
        responseHelper.setResponse(response, 401, {success: false, message: "User unauthorized"});
    }
    request.user = user;
    next();
}

export default {decodeToken, auth};