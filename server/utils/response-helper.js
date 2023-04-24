const formatResponse = (response, statusCode, data) => {
  response.status(statusCode).json(data);
};

const error = (res, data = null) => {
  console.log("data : ", data);
  const responseObj = {
    statusCode: 500,
    message: "Oops! Something is wrong!",
  };
  if (data) {
    responseObj.message = data;
  }

  formatResponse(res, 500, responseObj);
};

const badrequest = (res, message) =>
  formatResponse(res, 400, {
    statusCode: 400,
    message,
  });

const ok = (res, data) => formatResponse(res, 200, data);

const created = (res, data) => formatResponse(res, 201, data);

const unauthorized = (res) =>
  formatResponse(res, 401, {
    statusCode: 401,
    message: "Unauthorized",
  });

const notfound = (res) =>
  formatResponse(res, 401, {
    statusCode: 404,
    message: "Resource not Found!",
  });

const setResponse = (response, statusCode, data) => {
  if (!data.message) {
    let message = null;
    switch (statusCode) {
      case 500:
        message = "Something is wrong";
        break;

      case 401:
        message = "Unauthorized acccess";
        break;

      case 404:
        message = "Resource not found";
        break;

      case 400:
        message = "Bad request";
        break;

      default:
        message = "Oops! Something is wrong";
    }
    data.message = message;
  }
  response.status(statusCode).send(data);
};

export default {
  // error,
  // badrequest,
  // ok,
  // created,
  // unauthorized,
  // notfound,
  setResponse,
};
