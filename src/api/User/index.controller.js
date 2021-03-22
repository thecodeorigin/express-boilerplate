const { HTTPException } = require('../../common/helpers/errorHandler');
const userService = require('./index.service');
const bcrypt = require('bcrypt');
const { USER_NOT_FOUND, EMAIL_EXISTS} = require('../../constants/httpMessage');
const getAll = async (req, res, next) => {
  try {
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
      throw new HTTPException(404, USER_NOT_FOUND);
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
    let { email, name, password } = req.body;
    // Check if this email already exists
    const user = await userService.getOneByEmail(email);
    if(user) {
      throw new HTTPException(400, EMAIL_EXISTS);
    }
    password = await bcrypt.hash(password, 10);
    const id = await userService.createOne({ email, name, password });
    const data = await userService.getOneById(id);
    return res.status(201).json({
      status: 'success',
      statusCode: 201,
      data,
    });
  } catch (err) {
    return next(err);
  }
};

const patchOne = async (req, res, next) => {
  try {
    const { email, name, password } = req.body;
    const { id } = req.params;
    const user = await userService.getOneByEmail(email);
    if(user && user.id != id) {
      throw new HTTPException(400, EMAIL_EXISTS);
    }
    await userService.patchOne(id, { email, name, password });
    const data = await userService.getOneById(id);
    return res.status(200).json({
      status: 'success',
      statusCode: 200,
      data,
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
      message: USER_NOT_FOUND,
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