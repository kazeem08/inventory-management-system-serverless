module.exports = {
  appName: process.env.APP_NAME || 'Serverless App',
  tax: process.env.TAX,
  jwtKey: process.env.jWT_PRIVATE_KEY,
  whitelisted: process.env.EXEMPTED_URL,
  admin_email: process.env.ADMIN_EMAIL,
  admin_password: process.env.ADMIN_EMAIL_PASSWORD,
  sqs_url: process.env.SQS_QUEUE_URL,
  region: process.env.REGION,
  database_url: process.env.DATABASE_URL,
  token_key: process.env.TOKEN_KEY,
  email_queue: process.env.EMAIL_QUEUE,
  aws:{
    region: process.env.REGION,
    accountId: process.env.AWS_ACCOUNT_ID
  },
  queues: {
    sendMessage: process.env.SQS_QUEUE_URL,
  },
};
