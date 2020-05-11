const AWS = require('aws-sdk');
const config = require('../config');

const sqs = new AWS.SQS({
  region: process.env.REGION
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
        QueueUrl: `${process.env.SQS_QUEUE_URL}/${queue}`,
      }, (err, data) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        return resolve(data);
      });
    });
  },

//   async sendMessage(queue, message){
//       try{
//         const result = await sqs.sendMessage({
//             MessageBody: JSON.stringify(message),
//             QueueUrl: `${process.env.SQS_QUEUE_URL}/${queue}`
//           });
//           return result;
//       } catch (e){
//           console.log('ERROR INSIDE QUEUE', e);
//           return e;
//       }
     
//   }
};
