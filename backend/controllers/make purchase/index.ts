import { CardRepository } from "../../db/CardRepository";
import { EnderecoEventRepository } from "../../db/EnderecoEventRepository";
import { EventRepository } from "../../db/EventRepository";
import { SaleRepository } from "../../db/SaleRepository";
import { TicketRepository } from "../../db/TicketRepository";
import { EmailProvider } from "../../utils/EmailProvider";
import { MakePurchaseController } from "./MakePurchaseController";
import { MakePurchaseUseCase } from "./MakePurchaseUseCase";


const saleRepository = new SaleRepository();
const eventRepository = new EventRepository();
const ticketRepository = new TicketRepository();
const cardRepository = new CardRepository();
const enderecoEventRepository = new EnderecoEventRepository();
const emailProvider = new EmailProvider();

const makePurchaseUseCase = new MakePurchaseUseCase(saleRepository, eventRepository, ticketRepository, cardRepository, enderecoEventRepository, emailProvider);
const makePurchaseController = new MakePurchaseController(makePurchaseUseCase);

export { makePurchaseController };