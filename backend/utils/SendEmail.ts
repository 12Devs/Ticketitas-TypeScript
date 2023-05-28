import {EMAIL_HOST as emailhost, EMAIL_SERVICE as emailservice, EMAIL_PORT as emailport, EMAIL_SECURE as emailsecure, EMAIL_USER as emailuser, EMAIL_PASSWORD as emailpassword, EMAIL_REJECT_UNAUTHORIZED as emailrejectunauthorized} from '../config/env';

import nodemailer, { Transporter } from 'nodemailer';
//configurando login e senha do send email
  //gerando a classe
  class SendEmail{
    
    private client: Transporter;
    //construindo a mensagem utilizando o email fornecido
    public constructor(){

      nodemailer.createTestAccount().then((account)=>{
        
        const transporter = nodemailer.createTransport({
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

        this.client = transporter;
    }).catch(err => console.error(err));
      
    }
    

    //Enviando email para adm com redefinicao de senha
    public async sendEmail(to: string, subject: string, body: string){

      const message: any = this.client.sendMail({
        to,
        from: `Ticketitas <${emailuser}>`,
        subject,
        text: body,
        html: body,
      });

      console.log('Message sent: %s', message.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }
}

export { SendEmail };






    
