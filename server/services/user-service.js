import User from "../models/user-model.js";

export const createUser = async (params) => {
  try {
    console.log("user-service : createUser");
    console.log("params: ", params);

    const { username, password, displayName, email } = params;

    const checkUser = await User.findOne({ username });

    console.log("checkUser : ", checkUser)

    if (checkUser) {
      console.log("HERE IN CHECKUSER")
      // throw new Error("User already exists");
      return {success: false, message: "User already exists", errorCode: 400};
    } else {
      const user = new User();
      user.username = username;
      user.displayName = displayName;
      user.email = email;
      user.setPassword(password);

      const result = await user.save();
      console.log("USER SAVE RESULT : ", result);
      return {
        username : result["username"],
        displayName : result["displayName"],
        _id : result["_id"],
        success: true,
        message: "Successfully created user"       
      }
    }
  } catch (error) {
      console.log(`ERROR IN user-service : createUser :: ${error}`)
      return {success: false, errorCode: 500};
  }
};
