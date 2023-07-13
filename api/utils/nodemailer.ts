import emailjs from '@emailjs/nodejs';
import dotenv from 'dotenv';

dotenv.config();

export const sendMailNodemailer = async (message: string, email: string) => {
  const templateParams = {
    message: message,
    to_email: email,
  };

  return emailjs
    .send('service_5hqdm9b', 'template_ztvjupo', templateParams, {
      publicKey: process.env.MAILER_PUBLIC,
      privateKey: process.env.MAILER_PRIVATE,
    })
    .then(
      (response) => {
        console.log('SUCCESS!', response.status, response.text);
      },
      (err) => {
        console.log('FAILED...', err);
      },
    );
};
