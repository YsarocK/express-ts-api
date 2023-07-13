import nodemailer from 'nodemailer';

export const sendMailNodemailer = (message: string, email: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NODERMAILER_EMAIL as string,
      pass: process.env.NODEMAILER_PASSWORD as string,
    },
  });

  const mailOptions = {
    from: 'pierrekeller75@gmail.com',
    to: email,
    subject: 'MT4 - HETIC',
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return error;
    } else {
      return 'Email sent: ' + info.response;
    }
  });
};
