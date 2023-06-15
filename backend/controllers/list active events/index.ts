import { EventRepository } from "../../db/EventRepository";
import { ListActiveEventsController } from "./ListActiveEventsController";
import { ListActiveEventsUseCase } from "./ListActiveEventsUseCase";


const eventRepository = new EventRepository();
const listActiveEventsUseCase = new ListActiveEventsUseCase(eventRepository);
const listActiveEventsController = new ListActiveEventsController(listActiveEventsUseCase);

export { listActiveEventsController };