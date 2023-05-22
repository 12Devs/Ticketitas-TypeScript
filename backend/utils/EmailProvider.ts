import nodemailer, { Transporter } from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';

//configurando login e senha do send email
  //gerando a classe
  class EmailProvider{
    
    private client: Transporter;
    //construindo a mensagem utilizando o email fornecido
    public constructor(){

      nodemailer.createTestAccount().then((account)=>{
        
        const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
            user: account.user,
            pass: account.pass
          }
      });

      this.client = transporter;
    }).catch(err => console.error(err));
      
    }
    

    //Enviando email para adm com redefinicao de senha
    public async sendEmail(to: string, subject: string, variables: any, path: string){

      const templateFileContent = fs.readFileSync(path).toString("utf-8");

      const templateParse = handlebars.compile(templateFileContent);

      const templateHTML = templateParse(variables);



      const message = await this.client.sendMail({
        to,
        from: 'Ticketitas <ticketitas@email.com.br>',
        subject,
        html: templateHTML,
      });

      console.log('Message sent: %s', message.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }
}

export { EmailProvider };
