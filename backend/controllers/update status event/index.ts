import { EventRepository } from "../../db/EventRepository";
import { UpdateStatusEventController } from "./UpdateStatusEventController";
import { UpdateStatusEventUseCase } from "./UpdateStatusEventUseCase";


const eventRepository = new EventRepository();
const updateStatusEventUseCase = new UpdateStatusEventUseCase(eventRepository);
const updateStatusEventController = new UpdateStatusEventController(updateStatusEventUseCase);

export { updateStatusEventController };