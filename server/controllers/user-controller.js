// import { response } from "express";
import * as userService from "../services/user-service.js";
import responseHelper from "../utils/response-helper.js";

export const create = async(request, response) => {
    try{
        console.log("user-controller : create :: ", request.body);
        const result = await userService.createUser(request.body);
        console.log("result : ", result);
        if(result.success) {
            responseHelper.setResponse(response, 201, result);
        } else {
            responseHelper.setResponse(response, result.errorCode, result);
        }
    } catch(error) {
        console.log("ERROR IN CONTROLLER : ", error.message)
        responseHelper.setResponse(response, result.errorCode, error);
    }
}
