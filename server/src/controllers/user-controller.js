// import { response } from "express";
import * as userService from "../services/user-service.js";
import * as responseHelper from "../utils/response-helper.js";

const setResponse = (data, response, status,error=null) => {
    response.status(status);
    if (error) {
        response.json(...data, error)
    }
    response.json(data);
}


export const create = async(request, response) => {
    try{
        console.log("user-controller : create :: ");
        const result = await userService.createUser(request.body);
        // setResponse(result, response, 201);
        responseHelper.formatResponse(result, response,201);
    } catch(error) {
        // setResponse({}, response, 500, error);
        responseHelper.formatResponse({}, response, 500, error);
    }
}
