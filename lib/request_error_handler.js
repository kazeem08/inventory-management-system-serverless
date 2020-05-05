/**
 * An express Middleware for handling any uncaught exceptions withing routes and other middlewares
 * @param req
 * @param res
 * @param next
 */
// eslint-disable-next-line no-unused-vars,consistent-return
module.exports = (err, req, res, next) => {
  // TODO handle all your errors here

  if (err.name === 'ValidationError') {
    // handles errors thrown by the schema validation library(Joi)
    return res.errorResponse({ statusCode: 400, message: err.message || err });
  } if (err.name === 'DocumentNotFoundError') {
    return res.errorResponse({ statusCode: 404, message: err.message });
  }
  // console.error(err.stack);
  res.status(500).send(`${err.stack || err}`);
};
