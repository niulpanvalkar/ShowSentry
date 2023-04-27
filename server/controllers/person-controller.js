import responseHelper from "../utils/response-helper.js";
import * as personService from "../services/person-service.js";


export const getPersonDetails = async(request, response) => {
    try{
        console.log("person-controller : getPersonDetails: ");
        const result = await personService.personDetail(request.params);
        if(result.success) {
            responseHelper.setResponse(response, 200, result);
        } else {
            responseHelper.setResponse(response, result.errorCode, result);
        }
    } catch(error) {
        responseHelper.setResponse(response, 500, error);
    }
}

export const getPersonMedias = async(request, response) => {
    try{
        console.log("person-controller : getPersonMedias:");
        const result = await personService.personMedias(request.params);
        if(result.success) {
            responseHelper.setResponse(response, 200, result);
        } else {
            responseHelper.setResponse(response, result.errorCode, result);
        }
    }catch(error) {
        responseHelper.setResponse(response, 500, error);
    }
}