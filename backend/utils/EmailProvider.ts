import nodemailer, { Transporter } from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';
import PdfPrinter from 'pdfmake';
import { TDocumentDefinitions } from "pdfmake/interfaces";
import { resolve } from "path";

//configurando login e senha do send email
  //gerando a classe
  class EmailProvider{
    
    private transporter: Transporter;
    //construindo a mensagem utilizando o email fornecido
    public constructor(){
        
      const transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: { 
            user: 'ticketitas@gmail.com', 
            pass: 'snlxjijwsxqeegiw' 
          }
      });

      this.transporter = transporter;
      
    }

    public async sendEmailTicketAttached(to: string, ticketInfo) {
    
    //Envio do email
    const templatePath = resolve(__dirname, '..', 'utils', 'templates', 'MakePurchaseTemplate.hbs');

    const templateFileContent = fs.readFileSync(templatePath).toString("utf-8");
    const templateParse = handlebars.compile(templateFileContent);
    const templateHTML = templateParse(templateParse);
    const mail: any = {
      to: to,
      from: 'ticketitas@gmail.com',
      subject: `Ingressos para ${ticketInfo.nameEvent}`,
      html: templateHTML,
      attachments: []
    };

    
    const fonts = {
      Helvetica: {
        normal: 'Helvetica',
        bold: 'Helvetica-Bold',
        italics: 'Helvetica-Oblique',
        bolditalics: 'Helvetica-BoldOblique'
      }
    }

    for (let index = 0; index < ticketInfo.amount; index++) {

      const printer = new PdfPrinter(fonts);
        
      const docDefinitions: TDocumentDefinitions = {
            defaultStyle: { font: 'Helvetica'},
            content: [
                {
                    style: 'tableExample',
                    table: {
                        body: [
                            [ticketInfo.nameEvent],
                            [ticketInfo.dateEvent],
                            [ticketInfo.enderecoEvent],
                            [ticketInfo.cidadeEvent]
                        ]
                    }
                },
                {
                    style: 'tableExample',
                    table: {
                        body: [
                            ['INGRESSO'],
                            [`${ticketInfo.sector} - ${ticketInfo.profile}`],
                            [ticketInfo.value],
                            [`Ingresso comprado dia ${ticketInfo.dateSale}`],
                            ['CLIENTE'],
                            [`${ticketInfo.clientName} - ${ticketInfo.clientCpf}`]
                        ]
                    }
                },
                {
                    style: 'tableExample',
                    table: {
                        body: [
                            ['ATENÇAO'],
                            ['-Ingressos são pessoais e nominais.'],
                            ['- Ao comprar o ingresso, você concorda com os termos e políticas do evento.'],
                            ['-O não comparecimento ao evento invalidará o ingresso e não permitirá reembolso.']
                        ]
                    }
                }
            ]
      };
    
    var pdfDoc = printer.createPdfKitDocument(docDefinitions);

      await mail.attachments.push({
        filename: `ticket.pdf`,
        content: pdfDoc});
    pdfDoc.end();
    }
    
    
    await this.transporter.sendMail(mail);
  }
}

export { EmailProvider };
