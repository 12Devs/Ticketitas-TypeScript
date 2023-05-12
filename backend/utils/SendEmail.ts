const nodemailer = require('nodemailer');
//configurando login e senha do send email
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: 'gmail',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: "ticketitasdb@gmail.com",
        pass: "j l s l n q c b b w m k m v v k"
    },
    tls: { rejectUnauthorized: false }
  });


  //gerando a classe
export class SendEmail{
    //atributos
    public email: string;
    public messageSubject: string;
    public messageText: string;

    //construindo a mensagem utilizando o email fornecido
    constructor(){
        }
    

    //Enviando email para adm com redefinicao de senha
    SendEmail(email: string, messageSubject: string, messageText: string){
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
    }






    