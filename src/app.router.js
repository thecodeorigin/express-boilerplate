const express = require('express');
const router = express.Router();

const userRouter = require('./app/User/index.router');
const authRouter = require('./app/Auth/index.router');

router.use('/users', userRouter);
router.use('/auth', authRouter);

module.exports = router;