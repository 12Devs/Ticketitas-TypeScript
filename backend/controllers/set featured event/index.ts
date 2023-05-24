import { EventRepository } from "../../db/EventRepository";
import { SetFeaturedEventController } from "./SetFeaturedEventController";
import { SetFeaturedEventUseCase } from "./SetFeaturedEventUseCase";

const eventRepository = new EventRepository();
const setFeaturedEventUseCase = new SetFeaturedEventUseCase(eventRepository);
const setFeaturedEventController = new SetFeaturedEventController(setFeaturedEventUseCase);

export { setFeaturedEventController };