import jwt from "jsonwebtoken";
import responseHelper from "../utils/response-helper.js";
import userModel from "../models/user-model.js";
import dotenv from "dotenv";

dotenv.config();

const decodeToken = async (request) => {
    try {
        const bearerHeader = headers["authorization"];
        if(bearerHeader) {
            const token = bearerHeader.split(" ")[1];
            return jwt.verify(token, process.env.TOKEN_SECRET);
        }
        return false
    }catch(error){
        console.log("Failed to decode token : ", error.message);
        return false;
    }
}

const auth = async (request, response, next) => {
  const decodedToken = await decodeToken(request.headers);
  console.log("decodedToken : ", decodedToken);
  if (!decodedToken) {
    responseHelper.setResponse(response, 401, {
      success: false,
      message: "User unauthorized",
    });
  } else {
    const user = await userModel.findById(decodedToken.data);
    console.log("USER IN MIDDLEWARE : ", user);
    if (!user) {
      responseHelper.setResponse(response, 401, {
        success: false,
        message: "User unauthorized",
      });
    } else {
      request.user = user;
      next();
    }
  }
};

export default {decodeToken, auth};