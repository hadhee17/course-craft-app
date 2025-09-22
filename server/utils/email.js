const nodemailer = require('nodemailer');

const sendEmail = async (option) => {
  try {
    // Looking to send emails in production? Check out our Email API/SMTP product!
    const transport = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      secure: false,
      auth: {
        user: '55ba5f2044e8a3',
        pass: '13a96ca6f3f6f6',
      },
    });

    const mailOption = {
      from: process.env.EMAIL_FROM,
      to: option.email,
      subject: option.subject,
      text: option.text,
    };

    await transport.sendMail(mailOption);
  } catch (error) {
    next(error);
  }
};

module.exports = sendEmail;
