const nodemailer = require('nodemailer');

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
            user: process.env.ADMIN_EMAIL,
            pass: process.env.ADMIN_EMAIL_PASSWORD,
          },
          tls: {
            rejectUnauthorized: false,
          },
        });
    
        const emailData = {
          from: `Kazeem test ✔ <${process.env.ADMIN_EMAIL}>`,
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