import nodemailer, { Transporter } from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';

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

    public async sendEmail(to: string, subject: string, variables: any, path: string, attachment){

      const templateFileContent = fs.readFileSync(path).toString("utf-8");
      const templateParse = handlebars.compile(templateFileContent);
      const templateHTML = templateParse(variables);
      const mail: any = {};

      mail.to = to
      mail.from = 'Ticketitas <ticketitas@email.com.br>';
      mail.subject = subject;
      mail.html = templateHTML;

      if(attachment !== null){
        mail.attachments = [];
        mail.attachments.push({
            filename: attachment.originalname,
            content: attachment.buffer});
      }
      
      const message = await this.client.sendMail(mail);

      console.log('Message sent: %s', message.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }
}

export { EmailProvider };
