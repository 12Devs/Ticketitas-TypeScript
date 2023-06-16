//Import of the necessary modules for the functioning of the class
import nodemailer, { Transporter } from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';
import PdfPrinter from 'pdfmake';
import { TDocumentDefinitions } from "pdfmake/interfaces";
import { resolve } from "path";


/**
 * Class responsible for sending emails
 * @date 6/15/2023 - 11:33:02 PM
 *
 * @class EmailProvider
 * @typedef {EmailProvider}
 */
class EmailProvider{
  
  private transporter: Transporter;

  public constructor(){
      
    const transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: { 
          user: 'ticketitas12devs@gmail.com', 
          pass: 'gohhzwrwjmihscld' 
        }
    });

    this.transporter = transporter;
    
  }

  public async sendEmailTicketAttached (to: string, ticketInfo) {
  
    const templatePath = resolve(__dirname, '..', 'utils', 'templates', 'MakePurchaseTemplate.hbs');

    const templateFileContent = fs.readFileSync(templatePath).toString("utf-8");
    const templateParse = handlebars.compile(templateFileContent);
    const templateHTML = templateParse(templateParse);
    const mail: any = {
      to: to,
      from: 'ticketitas@gmail.com',
      subject: `TICKETITAS - Ingressos para ${ticketInfo.nameEvent}`,
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

      try {
        await fs.promises.stat(`backend/temp/${ticketInfo.IdsTickets[index]}.jpg`); //Verifica se o arquivo existe no diretorio
        
        const printer = new PdfPrinter(fonts);
        
        const docDefinitions: TDocumentDefinitions = {
            defaultStyle: {font: 'Helvetica',
            margin: [0, 5, 0, 5]},
            footer: {
              columns: [
                { text: 'Ticketitas™', alignment: 'center' }
              ]
            },
            content: [
              {
                image: 'backend/utils/templates/logoTicket.png',
                alignment: 'center',
                width: 300
              },
              {
                  style: 'tableExample',
                  table: {
                      body: [
                          [{text: `${ticketInfo.nameEvent} - ${ticketInfo.dateEvent}`, fontSize: 14}],
                          [{text:ticketInfo.enderecoEvent, fontSize: 14}],
                          [{text:ticketInfo.cidadeEvent, fontSize: 14}]
                      ]
                  }, layout: 'noBorders'
              },
              {
                style: 'tableExample',
                table: {
                  body: [
                    [{text: 'INGRESSO', fontSize: 18, bold: true, colSpan: 2}, '',],
                    [{
                      style: 'tableExemple',
                      table: {
                        body: [
                          [{text: 'Dados do Cliente: ', fontSize: 14, bold: true}],
                          [{text: `${ticketInfo.clientName} - ${ticketInfo.clientCpf}`, fontSize: 12,  margin: [ 0, 0, 0, 20 ]}],
                          [{text: 'Dados do Ticket: ', fontSize: 14, bold: true}],
                          [{text: `Setor: ${ticketInfo.sector} - ${ticketInfo.profile}`, fontSize: 12}],
                          [{text: `Valor: R$ ${ticketInfo.value}`, fontSize: 12}],
                          [{text: `Data de emissão: ${ticketInfo.dateNow}`, fontSize: 12}]
                        ]
                      }, layout: 'noBorders'
                    },
                      {
                        image: `backend/temp/${ticketInfo.IdsTickets[index]}.jpg`,
                        alignment: 'center'
                      }
                    ]
                  ]
                }
              }
            ],
            styles: {
              tableExample: {
                margin: [0, 5, 0, 15]
              }
            }        
  };
    
    var pdfDoc = printer.createPdfKitDocument(docDefinitions);

      await mail.attachments.push({
        filename: `ticket.pdf`,
        content: pdfDoc});
    pdfDoc.end();
    if (ticketInfo.amount !== 0 ){
      await this.transporter.sendMail(mail);
    }
    }
    catch (err) {
      await this.sendEmailTicketAttached(to, ticketInfo);
    }
    
  }

  }

  public async sendEmail (to: string, emailInfo) {

    const templatePath = resolve(__dirname, '..', 'utils', 'templates', `${emailInfo.template}.hbs`);

    const templateFileContent = fs.readFileSync(templatePath).toString("utf-8");
    const templateParse = handlebars.compile(templateFileContent);
    const templateHTML = templateParse(templateParse);
    
    const mail: any = {
      to: to,
      from: 'ticketitas12devs@gmail.com',
      subject: emailInfo.subject,
      html: templateHTML
    };
    
    await this.transporter.sendMail(mail);
  }
}
export { EmailProvider };
