const formatResponse = (response, statusCode, data) => response.status(statusCode).json(data);

const error = (res) => formatResponse(res, 500, {
    statusCode: 500,
    message: "Oops! Something is wrong!"
});

const badrequest = (res,message) => formatResponse(res, 400, {
    statusCode: 400,
    message
});

const ok = (res, data) => formatResponse(res, 200, data);

const created = (res,data) => formatResponse(res, 201, data);

const unauthorized = (res) => formatResponse(res, 401, {
    statusCode: 401,
    message : "Unauthorized"
});

const notfound = (res) => formatResponse(res, 401, {
    statusCode: 404,
    message : "Resource not Found!"
});


export default {
    error,
    badrequest,
    ok,
    created,
    unauthorized,
    notfound
};