import emailjs from '@emailjs/nodejs';
import dotenv from 'dotenv';
import {logger} from "./logger";

dotenv.config();

export const sendMailNodemailer = async (message: string, email: string) => {
  const templateParams = {
    message: message,
    to_email: email,
  };

  console.log('dsndf')

  emailjs
    .send('service_5hqdm9b', 'template_ztvjupo', templateParams, {
      publicKey: process.env.MAILER_PUBLIC as string,
      privateKey: process.env.MAILER_PRIVATE as string,
    })
    .then(
      (response) => {
        logger.error(response)
        console.log('SUCCESS!', response.status, response.text);
      },
      (err) => {
        logger.error(err)
        console.log('FAILED...', err);
      },
    )
    .catch((err) => {
      logger.error(err)
    })
};
