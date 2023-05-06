import { EventRepository } from "../../db/EventRepository";
import { CreateEventController } from "./CreateEventController";
import { CreateEventUseCase } from "./CreateEventUseCase";


const eventRepository = new EventRepository();
const createEventUseCase = new CreateEventUseCase(eventRepository);
const createEventController = new CreateEventController(createEventUseCase);

export { createEventController };