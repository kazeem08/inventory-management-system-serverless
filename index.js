require('./init');
const serverless = require('serverless-http');
const express = require('express');
const bodyParser = require('body-parser');
// const TerraLogger = require('terra-logger');
const cors = require('cors');
const responseManager = require('./lib/response_manager_middleware');
const request_error_handler = require('./lib/response_manager_middleware');
const config = require('./config')

const errorHandler = require('./lib/request_error_handler');
const auth = require('./lib/auth');

const app = express();

app.use(cors());

app.disable('x-powered-by');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(responseManager);
app.use(request_error_handler);


// app.use(TerraLogger.requestHandler);

app.use(auth);

require('./routes')(app);

app.get('/', async (req, res) => {
  res.send(`Welcome to ${config.appName}`);
});

// must be the last middleware
app.use(errorHandler);

module.exports.handler = serverless(app);
