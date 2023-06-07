import { PromoterRepository } from "../../db/PromoterRepository";
import { RemovePromoterController } from "./RemovePromoterController";
import { RemovePromoterUseCase } from "./RemovePromoterUseCase";


const eventRepository = new PromoterRepository();
const editEventUseCase = new RemovePromoterUseCase(eventRepository);
const editEventController = new RemovePromoterController(editEventUseCase);

export { editEventController };
