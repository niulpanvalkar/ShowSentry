import User from "../models/user.js";

export const createUser = async (params) => {
  console.log("user-service : createUser");
  console.log("params: ", params);
  const user = new User(params);
  return user.save();
};


