import { TicketRepository } from "../../db/TicketRepository";
import { ListTicketsForClientController } from "./ListTicketsForClientController";
import { ListTicketsForClientUseCase } from "./ListTicketsForClientUseCase";


const clientRepository = new TicketRepository();
const listTicketsForClientUseCase = new ListTicketsForClientUseCase(clientRepository);
const listTicketsForClientController = new ListTicketsForClientController(listTicketsForClientUseCase);

export { listTicketsForClientController };