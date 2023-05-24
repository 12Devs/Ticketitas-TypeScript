import { EnderecoEventRepository } from "../../db/EnderecoEventRepository";
import { EventRepository } from "../../db/EventRepository";
import { ListHighlightsController } from "./ListHighlightsController";
import { ListHighlightsUseCase } from "./ListHighlightsUseCase";


const eventRepository = new EventRepository();
const enderecoEventRepository = new EnderecoEventRepository();
const listHighlightsUseCase = new ListHighlightsUseCase(eventRepository, enderecoEventRepository);
const listHighlightsController = new ListHighlightsController(listHighlightsUseCase);

export { listHighlightsController };