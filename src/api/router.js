const authRouter = require('./Auth/index.router');
const userRouter = require('./User/index.router');

module.exports = [...authRouter, ...userRouter];
