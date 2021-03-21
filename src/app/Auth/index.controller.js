require('dotenv').config({ path: __dirname + '/../../../.env' });
const jwt = require('jsonwebtoken');
const userService = require('../User/index.service');
const bcrypt = require('bcrypt');
const { HTTPException } = require('../../common/helpers/errorHandler');

const login = async (req, res, next) => {
  try {
    const user = await userService.getOneByEmail(req.body.email);
    if(!user) {
      throw new HTTPException(400, "User not found");
    }
    
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET, 
      { expiresIn: process.env.JWT_EXPIRE, noTimestamp: true }
    );
    return res.json({
      status: "success",
      statusCode: 200,
      data: {
        ...user,
        token,
      }
    });
  } catch (err) {
    next(err)
  }
};

const register = async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    const id = await userService.createOne(req.body.email, req.body.name, hash);
  } catch (err) {
    next(err);
  }
};

const getMe = async (req, res, next) => {
  try {
    const token = req.headers.token;
    if(!token) {
      throw new HTTPException(400, "JWT token is empty")
    }
    return res.json(jwt.verify(token, process.env.JWT_SECRET)); 
  } catch (error) {
    if(error instanceof jwt.TokenExpiredError) {
      next(new HTTPException(400, "JWT token is expired"));
    }
    if(error instanceof jwt.JsonWebTokenError) {
      next(new HTTPException(400, "JWT token format is incorrect"));
    }
    next(error);
  }
};
module.exports = {
  login,
  register,
  getMe,
};