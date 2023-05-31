import { EventRepository } from "../../db/EventRepository";
import { EventReportController } from "./EventReportController";
import { EventReportUseCase } from "./EventReportUseCase";


const eventRepository = new EventRepository();
const eventReportUseCase = new EventReportUseCase(eventRepository);
const eventReportController = new EventReportController(eventReportUseCase);

export { eventReportController };
