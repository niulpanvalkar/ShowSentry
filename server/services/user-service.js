import User from "../models/user-model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import userModel from "../models/user-model.js";
import bcrypt from "bcrypt";

dotenv.config();

export const createUser = async (params) => {
  try {
    console.log("user-service : createUser");
    console.log("params: ", params);

    const { username, password, displayName, email } = params;

    const checkUser = await User.findOne({ username });

    console.log("checkUser : ", checkUser);

    if (checkUser) {
      return { success: false, message: "User already exists", errorCode: 400 };
    } else {
      const user = new User();
      user.username = username;
      user.displayName = displayName;
      user.email = email;
      user.setPassword(password);

      const result = await user.save();
      const token = jwt.sign({ data: user["_id"] }, process.env.TOKEN_SECRET, {
        expiresIn: "24h",
      });

      return {
        username: result["username"],
        displayName: result["displayName"],
        _id: result["_id"],
        success: true,
        message: "Successfully created user",
        token: token,
      };
    }
  } catch (error) {
    console.log(`ERROR IN user-service : createUser :: ${error}`);
    return { success: false, errorCode: 500 };
  }
};

export const userSignin = async(params) => {
  try {

    const {username, password} = params;

    const user = await userModel.findOne({username}).select("username password id displayName");
    if(!user) {
      return {success: false, message: "Could not find user ", errorCode: 400};
    }

    const match = await bcrypt.compare(password, user.password);
    if(!match) {
      return {success: false, message: "Wrong password", errorCode: 400};
    }

    const token = jwt.sign({data: user.id}, process.env.TOKEN_SECRET, {expiresIn : "24h"});
    return {success: true, message: "user found", token: token, id: user.id};

  } catch(error) {
    return {success: false, message: "User does not exist", errorCode : 401};
  }
}

export const getInfo = async (userId) => {
  try {
    console.log("user  ID ", userId);
    const user = await userModel
      .findById(userId)
      .select("username displayName id email");
    if (!user) {
      return {
        success: false,
        message: "user details not found",
        errorCode: 500,
      };
    }
    return { success: true, message: "User found successfully", data: user };
  } catch (error) {
    return { success: false, errorCode: 500 };
  }
};