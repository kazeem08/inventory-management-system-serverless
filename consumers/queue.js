const nodemailer = require('nodemailer');
const config = require('../config')

module.exports = {
    sendEmailNotification: async (event, context) => {
        // const consumeState = JSON.parse(event.Records[0].body);
        const consumeState = event;
    
        const {
          body, to, subject,
        } = consumeState;
    
        console.log('Consumed state', consumeState);
        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
            user: config.admin_email,
            pass: config.admin_password,
          },
          tls: {
            rejectUnauthorized: false,
          },
        });
    
        const emailData = {
          from: `Kazeem test ✔ <${config.admin_email}>`,
          to,
          subject,
          html: body,
        };
        const info = await transporter.sendMail(emailData);
        if (info.messageId) {
          console.log('email sent', info.messageId);
          return {
            statusCode: 200,
            body: JSON.stringify({
              message: 'Email successfully sent',
            }),
          };
        }
        return {
          statusCode: 500,
          body: JSON.stringify({
            error: 'Error occur',
            message: 'Message',
          }),
        };
      },
}