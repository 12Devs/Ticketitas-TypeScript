import { TicketRepository } from "../../db/TicketRepository";
import { ClientRepository } from "../../db/ClientRepository";
import { GenerateClientTicketReportController } from "./GenerateClientTicketReportController";
import { GenerateClientTicketReportUseCase } from "./GenerateClientTicketReportUseCase";

const ticketRepository = new TicketRepository();
const clientRepository = new ClientRepository();
const generateClientTicketReportUseCase = new GenerateClientTicketReportUseCase(ticketRepository, clientRepository);
const generateClientTicketReportController = new GenerateClientTicketReportController(generateClientTicketReportUseCase);

export { generateClientTicketReportController };