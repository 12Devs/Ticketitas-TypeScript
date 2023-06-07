import { EventRepository } from "../../db/EventRepository";
import { PromoterRepository } from "../../db/PromoterRepository";
import { TicketRepository } from "../../db/TicketRepository";
import { WalletRepository } from "../../db/WalletRepository";
import { UpdateStatusPromoterController } from "./UpdateStatusPromoterController";
import { UpdateStatusPromoterUseCase } from "./UpdateStatusPromoterUseCase";


const promoterRepository = new PromoterRepository();
const eventRepository = new EventRepository();
const ticketRepository = new TicketRepository();
const walletRepository = new WalletRepository();
const updateStatusPromoterUseCase = new UpdateStatusPromoterUseCase(promoterRepository, eventRepository, ticketRepository, walletRepository);
const updateStatusPromoterController = new UpdateStatusPromoterController(updateStatusPromoterUseCase);

export { updateStatusPromoterController };