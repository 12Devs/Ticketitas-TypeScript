import { EnderecoEventRepository } from "../../db/EnderecoEventRepository";
import { EventRepository } from "../../db/EventRepository";
import { TicketRepository } from "../../db/TicketRepository"
import { GenerateEventTicketReportController } from "./GenerateEventTicketReportController";
import { GenerateEventTicketReportUseCase } from "./GenerateEventTicketReportUseCase";

const eventRepository = new EventRepository();
const enderecoEventRepository = new EnderecoEventRepository();
const ticketRepository = new TicketRepository();

const generateEventTicketReportUseCase = new GenerateEventTicketReportUseCase(eventRepository, enderecoEventRepository, ticketRepository);
const generateEventTicketReportController = new GenerateEventTicketReportController(generateEventTicketReportUseCase);

export { generateEventTicketReportController };