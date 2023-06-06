import { EventRepository } from "../../db/EventRepository";
import { TicketRepository } from "../../db/TicketRepository";
import { GenerateAllEventsReportController } from "./GenerateAllEventsReportController";
import { GenerateAllEventsReportUseCase } from "./GenerateAllEventsReportUseCase";

const eventRepository = new EventRepository();
const ticketRepository = new TicketRepository();
const generateAllEventsReportUseCase = new GenerateAllEventsReportUseCase(eventRepository, ticketRepository);
const generateAllEventsReportController = new GenerateAllEventsReportController(generateAllEventsReportUseCase);

export { generateAllEventsReportController };