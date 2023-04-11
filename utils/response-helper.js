
export const formatResponse = (data, response, status, error=false) => {
    
    response.status(status);
    if (error) {
        return response.json(...data, error)
    }
    return response.json(data);
}