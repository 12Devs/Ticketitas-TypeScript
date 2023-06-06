import { EventRepository } from "../../db/EventRepository";
import { EditEventController } from "./EditEventController";
import { EditEventUseCase } from "./EditEventUseCase";


const eventRepository = new EventRepository();
const editEventUseCase = new EditEventUseCase(eventRepository);
const editEventController = new EditEventController(editEventUseCase);

export { editEventController };
