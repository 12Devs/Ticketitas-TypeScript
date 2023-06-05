import { EventRepository } from "../../db/EventRepository";
import { PromoterRepository } from "../../db/PromoterRepository";
import { StockRepository } from "../../db/StockRepository";
import { CreateEventController } from "./CreateEventController";
import { CreateEventUseCase } from "./CreateEventUseCase";

const eventRepository = new EventRepository();
const stockRepository = new StockRepository();
const promoterRepository = new PromoterRepository();
const createEventUseCase = new CreateEventUseCase(eventRepository, stockRepository, promoterRepository);
const createEventController = new CreateEventController(createEventUseCase);

export { createEventController };