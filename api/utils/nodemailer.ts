import nodemailer from 'nodemailer'
import dotenv from 'dotenv';

dotenv.config();

export const sendMailNodemailer = async (message: string, email: string) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 465,
        auth: {
            user: process.env.NODERMAILER_EMAIL as string,
            pass: process.env.NODEMAILER_PASSWORD as string,
        }
    });

    const mailOptions = {
        from: 'pierrekeller75@gmail.com',
        to: email,
        subject: 'MT4 - HETIC',
        text: message,
    };

    await new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve(info);
                console.log(info)
            }
        });
    });
};