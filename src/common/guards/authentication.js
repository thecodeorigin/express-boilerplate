const jwt = require('jsonwebtoken');
const { HTTPException } = require('../helpers/errorHandler');
const knex = require('../../config/connection');
const {
  LOGIN_REQUIRED,
  USER_NOT_FOUND,
} = require('../../constants/httpMessage');
require('dotenv').config({ path: `${__dirname}/../../../.env` });

const authentication = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      throw new HTTPException(400, LOGIN_REQUIRED);
    }
    const data = jwt.verify(token, process.env.JWT_SECRET);
    const user = await knex('users').where({ id: data.id }).first();
    if (!user) {
      throw new HTTPException(400, USER_NOT_FOUND);
    }
    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      next(new HTTPException(400, LOGIN_REQUIRED));
    }
    if (error instanceof jwt.JsonWebTokenError) {
      next(new HTTPException(400, LOGIN_REQUIRED));
    }
    next(error);
  }
};

module.exports = {
  authentication,
};
