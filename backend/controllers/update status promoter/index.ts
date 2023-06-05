import { EventRepository } from "../../db/EventRepository";
import { PromoterRepository } from "../../db/PromoterRepository";
import { UpdateStatusPromoterController } from "./UpdateStatusPromoterController";
import { UpdateStatusPromoterUseCase } from "./UpdateStatusPromoterUseCase";


const promoterRepository = new PromoterRepository();
const eventRepository = new EventRepository();
const updateStatusPromoterUseCase = new UpdateStatusPromoterUseCase(promoterRepository, eventRepository);
const updateStatusPromoterController = new UpdateStatusPromoterController(updateStatusPromoterUseCase);

export { updateStatusPromoterController };