const CustomAPIError = require("./custom-error");
const { StatusCodes } = require("http-status-codes");

class ServerError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  }
}

module.exports = ServerError;
