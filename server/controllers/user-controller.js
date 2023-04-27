import * as userService from "../services/user-service.js";
import responseHelper from "../utils/response-helper.js";

export const create = async(request, response) => {
    try{
        console.log("user-controller : create :: ", request.body);
        const result = await userService.createUser(request.body);
        if(result.success) {
            responseHelper.setResponse(response, 201, result);
        } else {
            responseHelper.setResponse(response, result.errorCode, result);
        }
    } catch(error) {
        console.log("user-controller : create :: ERROR ", error.message)
        responseHelper.setResponse(response, result.errorCode, error);
    } 
}

export const signin = async(request, response) => {
    try {
        const result = await userService.userSignin(request.body);
        if(result.success) {
            responseHelper.setResponse(response, 200, result);
        } else {
            responseHelper.setResponse(response, result.errorCode, result);
        }
    }catch(error) {
        responseHelper.setResponse(response, 500, error);
    }
}

export const getInfo = async(request, response) => {
    try {
        console.log("User : ", request.user);
        const result = await userService.getInfo(request.user._id);
        if(result.success) {
            responseHelper.setResponse(response, 200, result);
        } else {
            responseHelper.setResponse(response, result.errorCode, result);
        }
    } catch(error) {
        responseHelper.setResponse(response, 500, error);
    }
}

export const updatePassword = async(request, response) => {
    try{
        const result = await userService.updatePassword(request.body, request.user.id);
        if(result.success) {
            responseHelper.setResponse(response, 200, result);
        } else {
            responseHelper.setResponse(response, result.errorCode, result);
        }
    } catch(error) {
        responseHelper.setResponse(response, 500, error);
    }
}