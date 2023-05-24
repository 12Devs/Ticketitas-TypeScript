import PdfPrinter from "pdfmake";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import fs from 'fs';
import { resolve } from "path";
import nodemailer from 'nodemailer';
import handlebars from 'handlebars';

class GeneratePdf {

    private fonts;

    public constructor () {

        this.fonts = {
            Helvetica: {
              normal: 'Helvetica',
              bold: 'Helvetica-Bold',
              italics: 'Helvetica-Oblique',
              bolditalics: 'Helvetica-BoldOblique'
            }
        };
    }


    public async createTickets (nameEvent: string, sector: string, profile: string, email: string, value: number, dateEvent: Date, enderecoEvent: string, clientName: string, clientCpf: number, amountTickets) {
        
        for (let index = 0; index < amountTickets; index++) {
            const eventDate = new Date(dateEvent);
            const data = (eventDate.getUTCDate()) + "/" + (eventDate.getMonth() + 1) + "/" + eventDate.getFullYear();
    
            const dateNow = new Date();
            var dataHoje = (dateNow.getUTCDate()) + "-" + (dateNow.getMonth() + 1) + "-" + dateNow.getFullYear();
    
            const printer = new PdfPrinter(this.fonts);
            
            const docDefinitions: TDocumentDefinitions = {
                defaultStyle: { font: 'Helvetica'},
                content: [
                    {
                        image: 'backend/utils/templates/logo.png',
                        alignment: 'center'
                    },
                    {
                        style: 'tableExample',
                        table: {
                            body: [
                                [nameEvent],
                                [data],
                                [enderecoEvent]
                            ]
                        }
                    },
                    {
                        style: 'tableExample',
                        table: {
                            body: [
                                ['INGRESSO'],
                                [`${sector} - ${profile}`],
                                [value],
                                [`Ingresso comprado dia ${dataHoje}`],
                                ['CLIENTE'],
                                [`${clientName} - ${clientCpf}`]
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
                                ['-O não comparecimento ao evento invalidará o ingresso e não permitirá reembolso.'],
                                [`Ingresso comprado dia ${dataHoje}`],
                                ['CLIENTE'],
                                [`${clientName} - ${clientCpf}`]
                            ]
                        }
                    }
                ]
            };
            
            var pdfDoc = printer.createPdfKitDocument(docDefinitions);

            const templatePath = resolve(__dirname, '..', 'utils', 'templates', 'MakePurchaseTemplate.hbs');
            const variables = {
                name: clientName,
                amount: value,
                eventName: nameEvent,
                eventDate: data
            }

            const transporter = nodemailer.createTransport({
                service: 'gmail', 
                auth: { 
                    user: 'ticketitas@gmail.com', 
                    pass: 'snlxjijwsxqeegiw' 
                  }
            });

            const templateFileContent = fs.readFileSync(templatePath).toString("utf-8");
            const templateParse = handlebars.compile(templateFileContent);
            const templateHTML = templateParse(variables);
            const mail: any = {};

            mail.to = email
            mail.from = 'ticketitas@gmail.com';
            mail.subject = 'teste';
            mail.html = templateHTML;
            mail.attachments = [];
            mail.attachments.push({
            filename: `ticket.pdf`,
            content: pdfDoc});
            
            transporter.sendMail(mail);
            pdfDoc.end();
        }
    }
}

export { GeneratePdf };