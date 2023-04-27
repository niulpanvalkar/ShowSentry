import responseHelper from "../utils/response-helper.js";
import * as mediaService from "../services/media-service.js";


export const fetchMediaList = async(request, response) => {
    try{
        const page = request.query["page"];
        const mediaType = request.params['mediaType'];
        const mediaCategory = request.params['mediaCategory'];
        const data = await mediaService.fetchMediaList({page,mediaCategory,mediaType});
        if (data.success){
            responseHelper.setResponse(response,200,data)
        } else {
            responseHelper.setResponse(response, 500,data)
        }
        // return response.status(200).send(data);
    } catch(error) {
        console.log("medai-controller : fetchList :: ERROR ", error.message)
        responseHelper.setResponse(response, 500, error);
    }
}


export const getGenres = async(request, response) => {
    try {
        const mediaType = request.params;
        
        const result = await mediaService.getGenres({mediaType});
        console.log("Result" , result);
        if (result.success){
            responseHelper.setResponse(response,200,result)
        } else {
            responseHelper.setResponse(response, 500,result)
        }
    } catch (error) {
        console.log("media-controller : fetchGenres :: ERROR ", error.message)
        responseHelper.setResponse(response, 500, error);
    }
}

export const search = async(request,response)=> {
    try{
        const mediaType = request.params['mediaType'];
        const query = request.query["query"];
        const page = request.query["page"];
        console.log("Request in search ",query, page, mediaType);
        const result = await mediaService.mediaSearch({query,page,mediaType});
        if (result.success){
            responseHelper.setResponse(response,200,result)
        } else {
            responseHelper.setResponse(response, 500,result)
        }
    } catch (error){
        console.log("media-controller : search :: ERROR ", error.message)
        responseHelper.setResponse(response, 500, error);
    }
}

