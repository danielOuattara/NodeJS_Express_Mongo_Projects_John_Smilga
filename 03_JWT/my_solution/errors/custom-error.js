//------------------------------------------------------------------
// class CustomAPIError extends Error {
//   constructor(message, statusCode) {
//     super(message);
//     this.statusCode = statusCode; // removed below !
//   }
// }

// module.exports = CustomAPIError;

//------------------------------------------------------------------

class CustomAPIError extends Error {
  constructor(message) {
    super(message);
  }
}

module.exports = CustomAPIError;
