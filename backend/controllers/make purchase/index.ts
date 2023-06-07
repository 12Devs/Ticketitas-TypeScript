import { CardRepository } from "../../db/CardRepository";
import { CheckoutRepository } from "../../db/CheckoutRepository";
import { EnderecoEventRepository } from "../../db/EnderecoEventRepository";
import { EventRepository } from "../../db/EventRepository";
import { SaleRepository } from "../../db/SaleRepository";
import { StockRepository } from "../../db/StockRepository";
import { TicketRepository } from "../../db/TicketRepository";
import { WalletRepository } from "../../db/WalletRepository";
import { EmailProvider } from "../../utils/EmailProvider";
import { MakePurchaseController } from "./MakePurchaseController";
import { MakePurchaseUseCase } from "./MakePurchaseUseCase";

const stockRepository = new StockRepository();
const saleRepository = new SaleRepository();
const checkoutRepository = new CheckoutRepository();
const eventRepository = new EventRepository();
const ticketRepository = new TicketRepository();
const cardRepository = new CardRepository();
const enderecoEventRepository = new EnderecoEventRepository();
const walletRepository = new WalletRepository();
const emailProvider = new EmailProvider();

const makePurchaseUseCase = new MakePurchaseUseCase(stockRepository, saleRepository, checkoutRepository, eventRepository, ticketRepository, cardRepository, enderecoEventRepository, walletRepository, emailProvider);
const makePurchaseController = new MakePurchaseController(makePurchaseUseCase);

export { makePurchaseController };