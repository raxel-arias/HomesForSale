import path from 'path';

import nodemailer from 'nodemailer';
import pug from 'pug';
import juice from 'juice';
import { MailConfiguration } from '../config/nodemailer.config';
import { MailInfo } from '../interfaces/mail.interface';

const transport = nodemailer.createTransport({
    host: MailConfiguration.host,
    port: MailConfiguration.port,
    auth: MailConfiguration.auth,
    secure: MailConfiguration.secure
});

export const SendEmail = (mailHead: MailInfo) => {
    const mailOptions: MailInfo = {
        from: mailHead.from || 'HomesForSale <arias.brando.raxel@gmail.com>',
        to: `${mailHead.to}`,
        subject: `${mailHead.subject}`,
        text: ``,
        html: genHtml(mailHead.type, mailHead.options),
        type: mailHead.type
    };

    return new Promise(async (resolve, reject) => {        
        transport.sendMail(mailOptions)
            .then(response => {
                console.log(response);
                
                resolve(response)
            })
            .catch(error => {
                console.log(error);

                reject(error)
            });
    });
}

const genHtml = (type: string, options: any = {}) => {
    let html = '';

    switch (type) {
        case 'reset-password':
            html = pug.renderFile(path.join(__dirname, '../views/mail/reset-password.pug'), options);
            break;
        case 'account-activation':
            html = pug.renderFile(path.join(__dirname, '../views/mail/activation.pug'), options);
            break;
    }

    return juice(html);
}