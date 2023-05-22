import nodemailer, { Transporter } from 'nodemailer';

//configurando login e senha do send email
  //gerando a classe
  class SendEmail{
    
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
    public async sendEmail(to: string, subject: string, body: string){

      const message = this.client.sendEmail({
        to,
        from: 'Ticketitas <ticketitas@email.com.br>',
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

    // const mailOptions2 = {
    //         from: 'ticketitasdb@gmail.com',
    //         to: email,
    //         subject: messageSubject,
    //         text: messageText
    //       };
          
    //     this.transporter.sendMail(mailOptions2, function(error, info){
    //         if (error) {
    //           console.log(error);

    //         } else {
    //           console.log('Email enviado: ' + info.response);
    //         }
    //       });
    
    /**
    SendEmailUser(email: string, messageSubject: string, messageText: string){
        this.email = email,
        this.messageSubject = messageSubject,
        this.messageText = messageText
      
        const mailOptions2 = {
            from: 'ticketitasdb@gmail.com',
            to: this.email,
            subject: this.messageSubject,
            text: this.messageText
          };
        transporter.sendMail(mailOptions2, function(error, info){
            if (error) {
              console.log(error);

            } else {
              console.log('Email enviado: ' + info.response);
            }
          });
     }
    */

    /**
    SendEmailPromoter(email: string, messageSubject: string, messageText: string){
        this.email = email,
        this.messageSubject = messageSubject,
        this.messageText = messageText
      
        const mailOptions2 = {
            from: 'ticketitasdb@gmail.com',
            to: this.email,
            subject: this.messageSubject,
            text: this.messageText
          };
        transporter.sendMail(mailOptions2, function(error, info){
            if (error) {
              console.log(error);

            } else {
              console.log('Email enviado: ' + info.response);
            }
          });
     }
     */  