module.exports = {
  appName: process.env.APP_NAME || 'Terragon NodeJS Template',
  tax: process.env.TAX,
  aws:{
    region: process.env.REGION,
    accountId: process.env.AWS_ACCOUNT_ID
  },
  queues: {
    sendMessage: process.env.SQS_QUEUE_URL,
  },
};
