import {EMAIL_HOST as emailhost, EMAIL_SERVICE as emailservice, EMAIL_PORT as emailport, EMAIL_SECURE as emailsecure, EMAIL_USER as emailuser, EMAIL_PASSWORD as emailpassword, EMAIL_REJECT_UNAUTHORIZED as emailrejectunauthorized} from '../config/env';

const nodemailer = require('nodemailer');
//configurando login e senha do send email
  //gerando a classe
export class SendEmail{
    //atributos
    private transporter;

    //construindo a mensagem utilizando o email fornecido
    constructor(){

      this.transporter = nodemailer.createTransport({
        host: emailhost,
        service: emailservice,
        port: emailport,
        secure: emailsecure, // true for 465, false for other ports
        auth: {
            user: emailuser,
            pass: emailpassword
        },
        tls: { rejectUnauthorized: emailrejectunauthorized }
      });
    }
    

    //Enviando email para adm com redefinicao de senha
    public async sendEmail(email: string, messageSubject: string, messageText: string){
        
        const mailOptions2 = {
            from: emailuser,
            to: email,
            subject: messageSubject,
            text: messageText
          };
          
        this.transporter.sendMail(mailOptions2, function(error, info){
            if (error) {
              console.log(error);

            } else {
              console.log('Email enviado: ' + info.response);
            }
        });
    }
}






    