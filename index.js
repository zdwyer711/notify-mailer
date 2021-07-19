require('dotenv').config();
const http = require('http');
const MailEngine = require('./MailEngine');
const mailEngine = new MailEngine();

const server =  http.createServer(function (request, response) {
    // Send the HTTP header
    // HTTP Status: 200 : OK
    // Content Type: text/plain
    //console.log(request.url);
    //let path = request.url;
    if(request.url === '/mail'){
      console.log('Mail Initiated!');
      return startMailer(request,response)
    } else {
      response.writeHead(200, {'Content-Type': 'text/plain'});
      response.end('Hello World! Welcome to Notify Mailer\n');
    }
}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');

async function startMailer(request,response){
    let mail = await mailEngine._createTransporter();
    let mailOptions = await mailEngine._createGuestMailOptions();
    await mailEngine._sendMail(mailOptions, mail);
    response.writeHead(200, { 'Conten-Type':'text/plain'});
    response.end(JSON.stringify('Hello, crontab!'));
}
