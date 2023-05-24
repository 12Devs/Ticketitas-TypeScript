import { EnderecoEventRepository } from "../../db/EnderecoEventRepository";
import { EventRepository } from "../../db/EventRepository";
import { ListOneEventController } from "./ListOneEventController";
import { ListOneEventUseCase } from "./ListOneEventUseCase";


const eventRepository = new EventRepository();
const enderecoEventRepository = new EnderecoEventRepository();
const listOneEventUseCase = new ListOneEventUseCase(eventRepository, enderecoEventRepository);
const listOneEventController = new ListOneEventController(listOneEventUseCase);

export { listOneEventController };