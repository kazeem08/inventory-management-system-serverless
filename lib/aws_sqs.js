const AWS = require('aws-sdk');
const config = require('../config');

const region = 'eu-west-1';

const sqs = new AWS.SQS({
  region,
});
module.exports = {
  /**
     *
     * @param queue The name of the queue
     * @param message A JSON message
     * @returns {Promise<*>}
     */
//   async sendMessage(queue, message) {
//     return new Promise((resolve, reject) => {
//       sqs.sendMessage({
//         MessageBody: JSON.stringify(message),
//         QueueUrl: `${config.queues.sendMessage}/${queue}`,
//       }, (err, data) => {
//         if (err) {
//           console.log(err);
//           return reject(err);
//         }
//         return resolve(data);
//       });
//     });
//   },

  async sendMessage(queue, message){
      try{
          console.log('HERRRRRRRR');
        const result = await sqs.sendMessage({
            MessageBody: JSON.stringify(message),
            QueueUrl: `${process.env.SQS_QUEUE_URL}/${queue}`
          });
          console.log('RESULT INSIDE QUEUE', result);
          return result;
      } catch (e){
          console.log('ERROR INSIDE QUEUE', e);
          return e;
      }
     
  }
};
