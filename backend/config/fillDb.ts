import { AprovePromoterRegistrationUseCase } from "../controllers/approve promoter registration/AprovePromoterRegistrationUseCase";
import { CreateAdministratorUseCase } from "../controllers/create administrator/CreateAdministratorUseCase";
import { CreateClientUseCase } from "../controllers/create client/CreateClientUseCase";
import { CreateEventUseCase } from "../controllers/create event/CreateEventUseCase";
import { CreatePromoterUseCase } from "../controllers/create promoter/CreatePromoterUseCase";
import { SetFeaturedEventUseCase } from "../controllers/set featured event/SetFeaturedEventUseCase";
import { AdministratorRepository } from "../db/AdministratorRepository";
import { ClientRepository } from "../db/ClientRepository";
import { EventRepository } from "../db/EventRepository";
import { PromoterRegistrationRequestRepository } from "../db/PromoterRegistrationRequestRepository";
import { PromoterRepository } from "../db/PromoterRepository";
import { SuperAdministratorRelationRepository } from "../db/SuperAdministratorRelationRepository";
import bcrypt from 'bcrypt';
import { StockRepository } from "../db/StockRepository";
import { EmailProvider } from "../utils/EmailProvider";
import { UpdateImageEventUseCase } from "../controllers/update image event/UpdateImageEventUseCase";
import { google } from "googleapis";
import fs from 'fs';
import path from 'path';
import { file } from "googleapis/build/src/apis/file";
import { MakePurchaseUseCase } from "../controllers/make purchase/MakePurchaseUseCase";
import { SaleRepository } from "../db/SaleRepository";
import { CheckoutRepository } from "../db/CheckoutRepository";
import { TicketRepository } from "../db/TicketRepository";
import { CardRepository } from "../db/CardRepository";
import { EnderecoEventRepository } from "../db/EnderecoEventRepository";
import { WalletRepository } from "../db/WalletRepository";
import { UpdateCardUseCase } from "../controllers/update card/UpdateCardUseCase";

const uploadFileStorage = async (filePath, name) => {
    const KEYFILEPATH = path.join('backend/config/googleStorage.json');
    const SCOPES = ['https://www.googleapis.com/auth/drive'];

    const auth = new google.auth.GoogleAuth({
        keyFile: KEYFILEPATH,
        scopes: SCOPES,
    });

    const { data } = await google.drive({ version: 'v3', auth }).files.create({
      media: {
        mimeType: 'image/jpg',
        body:  fs.createReadStream(filePath),
      },
      requestBody: {
        name: name,
        parents: ['1SAW9W8vOjaSfKNrDHWvNxkI-qBVwoj8Z'],
      },
      fields: 'id,name',
    });
    return data;
};

class FillDataBase {

    public static async fillClients() {
        const createClientUseCase = new CreateClientUseCase(new ClientRepository(), new EmailProvider());

        await createClientUseCase.execute("Gabriel", 45850724974, "gabriel@email.com", 75988532244, "abc123", "abc123", 44230000, "Amélia Rodrigues", "BA", "Centro", "Rua de Cima", 13);

        await createClientUseCase.execute("João Gabriel", 75316609549, "joaogabriel@email.com", 75981272922, "123abc", "123abc", 48725000, "Ichu", "BA", "Troca Tapa", "Rua do Problema", 2);

        await createClientUseCase.execute("Lucca Princeso", 82231237709, "luccaprinceso@email.com", 75991151505, "123abc", "123abc", 45400000, "Valença", "BA", "Centro", "Rua da Festa", 22);
    }

    public static async fillPromoters() {
        const createPromoterUseCase = new CreatePromoterUseCase(new PromoterRepository(), new PromoterRegistrationRequestRepository(), new EmailProvider());

        await createPromoterUseCase.execute("Itamar Promoter", 45850724974, "itamarpromoter@email.com", 75988532244, "abc123", "abc123", 44230000, "Feira de Santana", "BA", "Feira 6", "Caminho I", 13);

        await createPromoterUseCase.execute("Ian Promoter", 75316609549, "joaogabriel@email.com", 75981275522, "123abc", "123abc", 48725000, "Ichu", "BA", "Troca Tapa", "Rua do Problema", 2);

        await createPromoterUseCase.execute("Caldinho Promoter", 82231237709, "caldinhopromoter@email.com", 75991151505, "123abc", "123abc", 45400000, "Valença", "BA", "Centro", "Rua da Festa", 22);
    }

    public static async fillAdministrator() {
        const administratorRepository = new AdministratorRepository();
        const salt = await bcrypt.genSalt(12);
        const senhaHash = await bcrypt.hash("abc123", salt);

        await administratorRepository.create("Gabriel", 45850724972, "gabriel@email.com", 75981272922, senhaHash);

        await administratorRepository.create("João Gabriel", 75316609543, "joaogabriel@email.com", 75981272922, senhaHash);

        await administratorRepository.create("Lucca Princeso", 82231237709, "luccaprinceso@email.com", 75991151505, senhaHash);
    }

    public static async fillSuperAdministrator() {
        const administratorRepository = new AdministratorRepository();
        const superAdministratorRelationRepository = new SuperAdministratorRelationRepository();

        const salt = await bcrypt.genSalt(12);
        const senhaHash = await bcrypt.hash("12devssuper", salt);

        await administratorRepository.create("12Devs", 0, "ticketitas@gmail.com", 0, senhaHash);
        await superAdministratorRelationRepository.create(0);
    }

    public static async fillEvents() {
        const createEventUseCase = new CreateEventUseCase(new EventRepository(), new StockRepository(), new PromoterRepository());

        const oktoberFest = "Corridas de cavalo, muita cerveja e festa nas ruas foram e são características culturais dessa tradicional festa na cidade. A cerveja tornou-se um símbolo de Feira de Santana.";
        const tomorrowland = "Maior festival de música eletrônica do mundo!";
        const computali = "A melhor calourada que a uefs já viu!";
        const fiba = "Um dos maiores eventos de música do Norte-Nordeste, o Festival de Inverno acontecerá em agosto de 2023 em Vitória da Conquista – Bahia";
        const fvs = "Festival de Verão Salvador, é um evento musical brasileiro que ocorre anualmente em Salvador, capital da Bahia."
        const sjSerrinha = "Vai ter Alok!!!"

        const oktoberFestDate = new Date("2023-08-13T22:36:06.000Z");
        const tomorrowlandDate = new Date("2023-10-16T22:36:06.000Z");
        const computaliDate = new Date("2023-08-22T22:36:06.000Z");
        const fibaDate = new Date("2024-01-22T22:36:06.000Z");

        const fvsDate = new Date("2023-12-12T22:36:06.000Z");
        const sjSerrinhaDate = new Date("2024-06-24T22:36:06.000Z");

        await createEventUseCase.execute(45850724974, "Oktoberfest Feira City", oktoberFest, oktoberFestDate, true, 30000, 20, 500, 120.98, 1, 300.99 ,40.00, 0.00, 44075516, "Feira de Santa", "BA", "Centro", "Av. Presidente Dutra", 1226);

        await createEventUseCase.execute(82231237709, "Tomorrowland", tomorrowland, tomorrowlandDate, true, 100000, 20000, 10000, 300.00, 420.00, 1230.48, 45.00, 0.00, 44230000, "Amélia Rodrigues", "BA", "Centro", "Rua da Festa", 420);

        await createEventUseCase.execute(75316609549, "Computali", computali, computaliDate, true, 500, 30, 90, 30.00, 0, 40.50, 60.00, 0.00, 44036900, "Feira de Santa", "BA", "Novo Horizonte", "Av. Transnordestina", 0);

        await createEventUseCase.execute(82231237709, "Festival de Inverno Bahia", fiba, fibaDate, true, 30000, 8000, 8000, 300.00, 390.00, 700.00, 41.00, 0.00, 44036900, "Vitória da Conquista", "BA", "Centro", "Av. Siqueira Campos", 1320);

        await createEventUseCase.execute(45850724974, "Festival de Verão Salvador", fvs, fvsDate, true, 900000, 20000, 50000, 300.00, 390.00, 1032.99, 52.00, 0.00, 41730101, "Salvador", "BA", "Itapuã", "Av. Luís Viana Filho", 0);

        await createEventUseCase.execute(75316609549, "São João de Serrinha", sjSerrinha, sjSerrinhaDate, true, 40000, 3000, 0, 0, 0, 0,  50.00, 0.00, 48700000, "Serrinha", "BA", "Centro", "Rua 13", 0);
    }

    public static async fillImageEvents() {
        const repository = new EventRepository();
        const events : any = await repository.findAllEvents();

        Object.entries(events).forEach(async ([key, value]: any, index) => {
            
            var nameImage = value._previousDataValues.nome.replace( / /g, '' );

            var path = `backend/config/imageEventsFill/${nameImage}.jpg`

            const dataImage: any = await uploadFileStorage(path, nameImage);
            await repository.updateImage(value.id, value.promoterCpf, dataImage.id);
          });
    }

    public static async setHighlights() {
        const repository = new EventRepository();
        const events : any = await repository.findAllEvents();
        const setHighlights = new SetFeaturedEventUseCase(repository);

        for (let event of events) {
            await setHighlights.execute(event.id);
        }
    }

    public static async promoterAprove() {
        const promoterRepository = new PromoterRepository();
        const promoterAprove = new AprovePromoterRegistrationUseCase(new PromoterRegistrationRequestRepository(), promoterRepository);
        await promoterAprove.execute(75316609549);
    }

    public static async updateCard(){
        const updateCard = new UpdateCardUseCase(new CardRepository());
        await updateCard.execute(82231237709, 5226818748178086, "Princeso Lucca", 4, 2024, 157);
    }

    public static async makePurchase(){

        const eventRepository = new EventRepository();
        const checkoutRepository = new CheckoutRepository();

        const makePurchase = new MakePurchaseUseCase(new StockRepository(), new SaleRepository(), checkoutRepository, eventRepository, new TicketRepository(), new CardRepository(), new EnderecoEventRepository(), new WalletRepository(), new EmailProvider());

        const event: any = await eventRepository.findByCpfPromoter(45850724974);

        console.log(event)
        const checkout: any = await checkoutRepository.create(event[0].id, 2, 3, 1, 0, 0, 0, 0, 0.0);
        await makePurchase.execute(2, 3, 1, 0, 0, 0, 0, 0.0, "Lucca Princeso", 82231237709, "luccaprinceso@email.com", event[0].id, checkout.id);
    }
}

export { FillDataBase };