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
const mailOptions2 = {
        from: 'ticketitasdb@gmail.com',
        to: this.email,
        subject: 'SEJA BEM VINDO!',
        text: 'Link para alterar senha e concluir o cadastro:'
      };
      transporter.sendMail(mailOptions2, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email enviado: ' + info.response);
        }
      });
  }
