import { EnderecoEventRepository } from "../../db/EnderecoEventRepository";
import { EventRepository } from "../../db/EventRepository";
import { ListEventsForPromoterController } from "./ListEventsForPromoterController";
import { ListEventsForPromoterUseCase } from "./ListEventsForPromoterUseCase";


const eventRepository = new EventRepository();
const enderecoEventRepository = new EnderecoEventRepository();
const listEventsForPromoterUseCase = new ListEventsForPromoterUseCase(eventRepository, enderecoEventRepository);
const listEventsForPromoterController = new ListEventsForPromoterController(listEventsForPromoterUseCase);

export { listEventsForPromoterController };