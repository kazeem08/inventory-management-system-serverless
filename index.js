require('./init');
const serverless = require('serverless-http');
const express = require('express');
const bodyParser = require('body-parser');
// const TerraLogger = require('terra-logger');
const responseManager = require('./lib/response_manager_middleware');
const errorHandler = require('./lib/request_error_handler');

const app = express();

app.disable('x-powered-by');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(responseManager);

// app.use(TerraLogger.requestHandler);

require('./routes')(app);

app.get('/', async (req, res) => {
  res.send(`Welcome to ${process.env.APP_NAME}`);
});
// must be the last middleware
app.use(errorHandler);

module.exports.handler = serverless(app);
