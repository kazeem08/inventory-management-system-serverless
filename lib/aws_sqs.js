const AWS = require('aws-sdk');
const TerraLogger = require('terra-logger');
const config = require('../config');

const sqs = new AWS.SQS({
  region: config.aws.region,
});

module.exports = {
  /**
     *
     * @param queue The name of the queue
     * @param message A JSON message
     * @returns {Promise<*>}
     */
  async sendMessage(queue, message) {
    return new Promise((resolve, reject) => {
      sqs.sendMessage({
        MessageBody: JSON.stringify(message),
        QueueUrl: `https://sqs.${config.aws.region}.amazonaws.com/${config.aws.accountId}/${queue}`,
      }, (err, data) => {
        if (err) {
          TerraLogger.error(err);
          return reject(err);
        }
        return resolve(data);
      });
    });
  },
};
