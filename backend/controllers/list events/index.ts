import { EventRepository } from "../../db/EventRepository";
import { ListEventsController } from "./ListEventsController";
import { ListEventsUseCase } from "./ListEventsUseCase";


const eventRepository = new EventRepository();
const listEventsUseCase = new ListEventsUseCase(eventRepository);
const listEventsController = new ListEventsController(listEventsUseCase);

export { listEventsController };