import { EventRepository } from "../../db/EventRepository";
import { TicketRepository } from "../../db/TicketRepository";
import { WalletRepository } from "../../db/WalletRepository";
import { UpdateStatusEventController } from "./UpdateStatusEventController";
import { UpdateStatusEventUseCase } from "./UpdateStatusEventUseCase";


const eventRepository = new EventRepository();
const ticketRepository = new TicketRepository();
const walletRepository = new WalletRepository()
const updateStatusEventUseCase = new UpdateStatusEventUseCase(eventRepository, ticketRepository, walletRepository);
const updateStatusEventController = new UpdateStatusEventController(updateStatusEventUseCase);

export { updateStatusEventController };