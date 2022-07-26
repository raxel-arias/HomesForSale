import dotenv from 'dotenv';
dotenv.config();

export const MailConfiguration = {
    host: process.env.MAILER_HOST!,
    port: Number(process.env.MAILER_PORT!),
    auth: {
        user: process.env.MAILER_USER!,
        pass: process.env.MAILER_PASS!
    },
    secure: true
}