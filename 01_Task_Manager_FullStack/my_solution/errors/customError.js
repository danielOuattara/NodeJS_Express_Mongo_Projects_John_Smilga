//-------------------------------------------------------------
// A class generating a custom error object

class CustomAPIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

//-------------------------------------------------------------
// function that handles CutomAPIError instanciation

const createCustomError = (errorMessage, errorStatusCode) => {
  return new CustomAPIError(errorMessage, errorStatusCode);
};

module.exports = { createCustomError, CustomAPIError };
