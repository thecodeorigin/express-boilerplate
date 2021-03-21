const { HTTPException } = require("../helpers/errorHandler");
const jwt = require('jsonwebtoken');
const knex = require('../../config/connection');
require('dotenv').config({ path: __dirname + '/../../../.env' })
const authentication = async (req, res, next) => {
  try {
    const token = req.headers.token;
    if(!token) {
      throw new HTTPException(400, "You must be login to see this content");
    }
    const data = jwt.verify(token, process.env.JWT_SECRET);
    const user = await knex('users').where({ id: data.id }).first();
    req.user = user;
    next();
  } catch (error) {
    if(error instanceof jwt.TokenExpiredError) {
      next(new HTTPException(400, "You must be login to see this content"));
    }
    if(error instanceof jwt.JsonWebTokenError) {
      next(new HTTPException(400, "You must be login to see this content"));
    }
    next(error);
  }
}

module.exports = {
  authentication,
};