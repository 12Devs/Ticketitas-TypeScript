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
            content: [
              {
                image: 'backend/utils/templates/logo.png',
                alignment: 'center'
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
                          [{text: 'Dados do Ticket: ', fontSize: 14, bold: true}],
                          [{text: `Setor: ${ticketInfo.sector} - ${ticketInfo.profile}`, fontSize: 12}],
                          [{text: `Valor: ${ticketInfo.value}`, fontSize: 12}],
                          [{text: `Data de emissão: ${ticketInfo.dateSale}`, fontSize: 12}],
                          [{text: 'Dados do Cliente: ', fontSize: 14, bold: true}],
                          [{text: `${ticketInfo.clientName} - ${ticketInfo.clientCpf}`, fontSize: 12}]
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
}
export { EmailProvider };
