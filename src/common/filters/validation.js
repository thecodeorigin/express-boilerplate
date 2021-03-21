const { HTTPException } = require("../helpers/errorHandler");

const isEmail = (field) => {
  return (req, res, next) => {
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(re.test(String(req.body.field).toLowerCase())) return next();
    return next(new HTTPException(400,`Field ${field} is not email`))
  };
};

const isNotEmpty = (field) => {
  return (req, res, next) => {
    if(req.body.field) return next();
    return next(new HTTPException(400, `Field ${field} should not be empty`))
  };
};

const isLength = (field, fieldLength) => {
  return (req, res, next) => {
    if(req.body.field.length <= fieldLength) return next();
    return next(new HTTPException(400, `Field ${field} should not be longer than ${fieldLength}`))
  }
};

module.exports = {
  isEmail,
  isNotEmpty,
  isLength,
}