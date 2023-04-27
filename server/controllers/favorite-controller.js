import * as favoriteService from "../services/favorite-service.js";
import responseHelper from "../utils/response-helper.js";



export const getFavoritesOfUser = async (request,response) => {
  try {
    const result = await favoriteService.getFavoritesOfUser(request.user.id);
    if (result.success) {
      responseHelper.setResponse(response, 200, result);
    } else {
      responseHelper.setResponse(response, result.errorCode, result);
    }
  } catch (error) {
    responseHelper.setResponse(response, result.errorCode, error);
  }
};
   
export const addFavorite = async (request, response) => {
  try {
    console.log("favorite-controller: addFavorite");
    const result = await favoriteService.addFavorite(request.user.id, request.body);
    if (result.success) {   
      responseHelper.setResponse(response, 200, result);
    } else {
      responseHelper.setResponse(response, result.errorCode, result);
    }
  } catch (error) {
    responseHelper.setResponse(response, 500, error);
  }
};
  
export const removeFavorite = async (request, response) => {
  try {
    const result = await favoriteService.removeFavorite(request.params.favoriteId, request.user.id);
    if (result.success) {
      responseHelper.setResponse(response, 200, result);
    } else {
      responseHelper.setResponse(response, result.errorCode, result);
    }
  } catch (error){
    responseHelper.setResponse(response, 500, error);
  }
};
  

