class HTTPException extends Error {
  /**
   * @param {*} statusCode : The error status code 
   * @param {*} message : The error message
   */
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = (err, res) => {
  // HTTP Exception
  if(err.statusCode && err.message) {
    return res.status(err.statusCode).json({
      status: err.statusCode === 400 ? 'fail' : 'error',
      statusCode: err.statusCode,
      message: err.message,
    });
  } 
  // Database exception
  return res.status(500).json({
    status: 'error',
    statusCode: 500,
    message: 'An unexpected error has occurred. Please try again or contact the admin',
  });
};

module.exports = {
  HTTPException,
  handleError
}