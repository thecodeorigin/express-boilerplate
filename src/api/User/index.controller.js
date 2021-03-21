const { HTTPException } = require('../../common/helpers/errorHandler');
const userService = require('./index.service');
const msg = require('../../constants/httpMessage');

const getAll = async (req, res, next) => {
  try {
    console.log(req.user);
    const users = await userService.getAll();
    return res.status(200).json({
      status: 'success',
      statusCode: 200,
      data: users,
    });
  } catch (err) {
    return next(err);
  }
};

const getOne = async (req, res, next) => {
  try {
    const user = await userService.getOneById(req.params.id);
    // Check if this user exists
    if(!user) {
      throw new HTTPException(404, msg.USER_NOT_FOUND);
    }
    return res.json({
      status: 'success',
      statusCode: 200,
      data: user,
    });
  } catch (err) {
    return next(err);
  }
};

const createOne = async (req, res, next) => {
  try {
    const { email, name } = req.body;
    // Check if this email already exists
    const user = await userService.getOneByEmail(email);
    if(user) {
      throw new HTTPException(400, msg.EMAIL_EXISTS);
    }
    await userService.createOne(email, name);
    return res.status(201).json({
      status: 'success',
      statusCode: 201,
    });
  } catch (err) {
    return next(err);
  }
};

const patchOne = async (req, res, next) => {
  try {
    const { email, name } = req.body;
    const { id } = req.params;
    const user = await userService.getOneByEmail(email);
    
    if(user && user.id != id) {
      throw new HTTPException(400, msg.EMAIL_EXISTS);
    }
    await userService.patchOne(id, email, name);
    return res.status(200).json({
      status: 'success',
      statusCode: 200,
    });
  } catch(err) {
    return next(err);
  }
};

const deleteOne = async (req, res,next) => {
  try {
    const result = await userService.deleteOne(req.params.id);
    if(result) {
      return res.status(200).json({
        status: 'success',
        statusCode: 200,
      });
    }
    return res.status(400).json({
      status: 'fail',
      statusCode: 400,
      message: msg.USER_NOT_FOUND,
    });
  } catch(err) {
    return next(err);
  }
};

module.exports = {
  getAll,
  getOne,
  createOne,
  patchOne,
  deleteOne,
};