const { HTTPException } = require('../helpers/errorHandler');

const isEmail = (field, optional = false) => (req, res, next) => {
  if (optional && !(field in req.body)) return next();
  const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (re.test(String(req.body[field]).toLowerCase())) return next();
  return next(new HTTPException(400, `Field ${field} is not email`));
};

const isNotEmpty = (field, optional = false) => (req, res, next) => {
  if (optional && !(field in req.body)) return next();
  if (req.body[field]) return next();
  return next(new HTTPException(400, `Field ${field} should not be empty`));
};

const isLength = (field, fieldLength, optional = false) => (req, res, next) => {
  if (optional && !(field in req.body)) return next();
  if (req.body[field].length <= fieldLength) return next();
  return next(
    new HTTPException(
      400,
      `Field ${field} should not be longer than ${fieldLength}`
    )
  );
};

module.exports = {
  isEmail,
  isNotEmpty,
  isLength,
};
