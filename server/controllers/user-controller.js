// import { response } from "express";
import * as userService from "../services/user-service.js";
import * as responseHelper from "../utils/response-helper.js";

export const create = async(request, response) => {
    try{
        console.log("user-controller : create :: ", request.body);
        // const result = await userService.createUser(request.body);
        // setResponse(result, response, 201);
        responseHelper.ok(result, response,201);
    } catch(error) {
        // setResponse({}, response, 500, error);
        responseHelper.error({}, response, 500, error);
    }
}
