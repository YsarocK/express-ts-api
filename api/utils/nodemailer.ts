import nodemailer from 'nodemailer';

export const sendMailNodemailer = async (message: string, email: string) => {
  const transporter = nodemailer.createTransport({
    host: 'mail.infomaniak.com',
    port: 465,
    auth: {
      user: process.env.NODERMAILER_EMAIL as string,
      pass: process.env.NODEMAILER_PASSWORD as string,
    },
  });

  const mailOptions = {
    from: 'etiennemoureton@etik.com',
    to: email,
    subject: 'MT4 - HETIC',
    text: message,
  };

  return await new Promise((resolve, reject) => {
    return transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        console.log(info);
        resolve(info);
      }
    });
  });
};
