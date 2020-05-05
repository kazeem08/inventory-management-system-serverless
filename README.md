# Terragon Serverless Template
The application is structured to be an express app.

## Getting Started
Install serverless using `npm install serverless -g`
Install Dependencies using `npm install`

Copy the `sample.env` file to a new `.env` file

Important: Change the `APP_NAME` environment variable to the name of you app.

### Logging
Please refer to the [logging plugin](https://bitbucket.org/terragonengineering/terra-logger-js)

Run the code using `npm start` or `serverless offline`
### Creating a route
To create a new route, add a new file to the `routes` folder. e.g `routes/users.js`
Take a look at the `routes/products.js` for an example.

Once the file is created, any request that starts with `/users` is automatically attached to the `routes/users.js` route and you only need to specify the "subroute" e.g
```javascript
route.get('/');
```
instead of 
```javascript
route.get('/users');
```

### Using and testing SQS and other AWS services locally
While testing locally, you can use [LocalStack](https://github.com/localstack/localstack) to test most of the AWS services on your system.
It creates a mock/test environment for services like S3, DyanamoDB,SQS, etc. Check the documentaion to find out more

#### Installing and Running LocalStack
You need to have docker, python and [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html) installed on your system.

`pip install localstack`

`localstack start`

This will start several AWS services locally on your system on different ports.

e.g **SQS** runs on http://localhost:4576

Please read the [LocalStack](https://github.com/localstack/localstack) on how to use SQS and other services locally.

### Schemas
You can define the schemas of each function in the `schemas` folder
e.g
```javascript
const Joi = require('@hapi/joi');

module.exports = Joi.object({
   name: Joi.string().required(),
   price: Joi.number().min(1000).max(10000)
});
```
This will validate each request made to the function against the schema

[Joi Documentation](https://hapi.dev/family/joi/?v=16.1.7)

### Libraries and Plugins

- [Logger](https://bitbucket.org/terragonengineering/terra-logger-js/)
- [Elasticsearch Client](https://bitbucket.org/terragonengineering/terra-elasticsearch-client/)
- [Redis](https://bitbucket.org/terragonengineering/terra-redis-js/)

### Rest Api Design Guide

[REST API Guide](https://bitbucket.org/terragonengineering/terragon-nodejs-template/src/development/API_BEST_PRACTICES.md)