const nodemailer = require('nodemailer');
const fs = require('fs');
const mailerPassword = process.env.MAILER_PASSWORD;

class MailEngine {

    async _sendMail(mailOptions, mail){

        mail.sendMail(mailOptions, function(error, info){
                if (error) {
                console.log(error);
                } else {
                console.log('Email sent: ' + info.response);
                }
        });
    }

    _createGuestMailOptions() {
        //TODO: Implement mongo driver to send to list of subscribers
        const options =  {
            from: 'pnyxarbbot@gmail.com',
            to: 'zachdwyer815@gmail.com',
            subject: 'Notify Guest Subject',
            html: '<h1>Notify</h1><p>Hello Guest, \nWelcome to the Notify subscription service!</p>'
        };
        return options;
    }

    async _createTransporter() {
        return new Promise((resolve, reject) => {
            let transport = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'pnyxarbbot@gmail.com',
                    pass: mailerPassword
                }
            });
            resolve(transport);
        });
    }
}

module.exports = MailEngine;
