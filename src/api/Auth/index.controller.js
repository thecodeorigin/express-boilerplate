require('dotenv').config({ path: __dirname + '/../../../.env' });
const jwt = require('jsonwebtoken');
const userService = require('../User/index.service');
const bcrypt = require('bcrypt');
const { HTTPException } = require('../../common/helpers/errorHandler');
const { USER_NOT_FOUND, INVALID_CREDENTIAL, LOGIN_REQUIRED, EMAIL_EXISTS } = require('../../constants/httpMessage');

const login = async (req, res, next) => {
  try {
    const user = await userService.getOneByEmail(req.body.email);
    if(!user) {
      throw new HTTPException(400, USER_NOT_FOUND);
    }
    const check = await bcrypt.compare(req.body.password, user.password);
    if(!check) {
      throw new HTTPException(400, INVALID_CREDENTIAL);
    }
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET, 
      { expiresIn: parseInt(process.env.JWT_EXPIRE, 10), noTimestamp: true }
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
    const password = await bcrypt.hash(req.body.password, 10);
    const user = await userService.getOneByEmail(req.body.email);
    if(user) {
      throw new HTTPException(400, EMAIL_EXISTS);
    }
    const id = await userService.createOne({
      email: req.body.email,
      name: req.body.name,
      password,
    });
    const data = await userService.getOneById(id);
    return res.json({
      status: "success",
      statusCode: 200,
      data
    });
  } catch (err) {
    next(err);
  }
};

const getMe = async (req, res, next) => {
  try {
    const token = req.headers.token;
    if(!token) {
      throw new HTTPException(400, LOGIN_REQUIRED)
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const data = await userService.getOneById(decoded.id);
    return res.json({
      status: "success",
      statusCode: 200,
      data,
    }); 
  } catch (error) {
    if(error instanceof jwt.TokenExpiredError) {
      next(new HTTPException(400, LOGIN_REQUIRED));
    }
    if(error instanceof jwt.JsonWebTokenError) {
      next(new HTTPException(400, LOGIN_REQUIRED));
    }
    next(error);
  }
};
module.exports = {
  login,
  register,
  getMe,
};