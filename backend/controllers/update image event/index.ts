import { EventRepository } from "../../db/EventRepository";
import { UpdateImageEventController } from "./UpdateImageEventController";
import { UpdateImageEventUseCase } from "./UpdateImageEventUseCase";


const eventRepository = new EventRepository();
const updateImageEventUserCase = new UpdateImageEventUseCase(eventRepository);
const updateImageEventController = new UpdateImageEventController(updateImageEventUserCase);

export { updateImageEventController }