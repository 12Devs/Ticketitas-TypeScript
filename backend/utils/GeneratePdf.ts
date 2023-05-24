import PdfPrinter from "pdfmake";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import fs from 'fs';

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


    public async createTicket (nameEvent: string, sector: string, profile: string, idSale: string, value: number, dateEvent: Date, enderecoEvent: string, clientName: string, clientCpf: number) {
        
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
        

        const pdfDoc = printer.createPdfKitDocument(docDefinitions);
        pdfDoc.pipe(fs.createWriteStream(`ingresso.pdf`));

        pdfDoc.end();
    }
}

export { GeneratePdf };

