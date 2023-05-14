import { EventRepository } from "../../db/EventRepository";
import { ListOneEventController } from "./ListOneEventController";
import { ListOneEventUseCase } from "./ListOneEventUseCase";


const eventRepository = new EventRepository();
const listOneEventUseCase = new ListOneEventUseCase(eventRepository);
const listOneEventController = new ListOneEventController(listOneEventUseCase);

export { listOneEventController };