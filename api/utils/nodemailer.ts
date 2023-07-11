import nodemailer from 'nodemailer'
import dotenv from 'dotenv';

dotenv.config();

export const sendMailNodemailer = (message: string, email: string)  => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
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

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            return error
        } else {
            return 'Email sent: ' + info.response
        }
    });
};