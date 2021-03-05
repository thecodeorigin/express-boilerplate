// ExpressJS dependencies
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const http = require('http');
const chalk = require('chalk');
const router = require('./src/app.router');
const { handleError } = require('./src/common/helpers/errorHandler');
// ExpressJS application
const app = express();
require('dotenv').config();
// ExpressJS middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Router configuration
router.forEach(route => {
  app[route.method]('/v1/' + route.prefix + route.path, ...route.handlers);
});

// 404 error handler
app.use(function(req, res, next) {
  return res.status(404).json({
    status: 'error',
    code: 404,
    message: `${req.url} not found`,
  });
});

// Misc error handler
app.use(function(err, req, res, next) {
  handleError(err, res);
});

// Initialize ExpressJS app
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
  console.log(`${chalk.green('✓')} App is running at http://localhost:${app.get('port')} in ${app.get('env')}mode`);
	console.log('Press CTRL-C to stop\n');
});
// Export app instance
module.exports = app;