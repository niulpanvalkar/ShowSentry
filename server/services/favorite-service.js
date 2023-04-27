import favoriteModel from "../models/favorite-model.js";
// import responseHelper from "../utils/response-helper.js";

export const getFavoritesOfUser = async (userId) => {
  try {
    const favorites = await favoriteModel
      .find({ user: userId })
      .sort("-createdAt");
    return {
      success: true,
      message: "Successfully fetched favorites",
      data: favorites,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to fetch favorites",
      errorCode: 500,
    };
  }
};

export const addFavorite = async (userId, params) => {
  try {
    const isFavorite = await favoriteModel.findOne({
      user: userId,
      mediaId: params.mediaId,
    });

    if (!isFavorite) {
      const favorite = new favoriteModel({
        ...params,
        user: userId,
      });

      await favorite.save();

      return { success: true, message: "Favorite added successfully"};
    } else {
      return { success: false, message: "Favorite already added", errorCode: 304};
    }
  } catch {
    console.log("favorite-service : addFavorite :: ERROR ", error);
    return {
      success: false,
      message: "Failed to add favorite",
      errorCode: 500,
    };
  }
};

export const removeFavorite = async (favoriteIdInput, userId) => {
  try {
    const favoriteId = favoriteIdInput;

    const favorite = await favoriteModel.findOne({
      user: userId,
      _id: favoriteId,
    });

    if (!favorite) {
      return {
        success: false,
        errorCode: 404,
        message: "Favorite not found",
      };
    }

    await favoriteModel.findOneAndDelete({user: userId, _id: favoriteId});


    return { success: true, message: "Successfully removed favorite" };
  } catch {
    console.log("favorite-service : removeFavorite :: ERROR ", error);
    return {
      success: false,
      errorCode: 500,
      message: "Failed to remove favorites",
    };
  }
};
