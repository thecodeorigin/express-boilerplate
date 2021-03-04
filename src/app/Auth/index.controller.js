require('dotenv').config({ path: __dirname + '/../../../.env' });
const jwt = require('jsonwebtoken');
const userService = require('../User/index.service');
const login = async (req, res, next) => {
  const user = await userService.getOneByEmail(req.body.email);

  const token = jwt.sign(JSON.parse(JSON.stringify(user)), process.env.JWT_SECRET);
  return res.json({
    token,
    user,
  });
};

const register = async (req, res, next) => {
  
};
module.exports = {
  login,
  register,
};