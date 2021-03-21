const authRouter = require('./app/Auth/index.router');
const userRouter = require('./app/User/index.router');
module.exports = [
  ...authRouter,
  ...userRouter,
];