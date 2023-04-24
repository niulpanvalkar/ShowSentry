import User from "../models/user-model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

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
