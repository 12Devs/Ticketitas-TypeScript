import { PromoterRepository } from "../../db/PromoterRepository";
import { RemovePromoterController } from "./RemovePromoterController";
import { RemovePromoterUseCase } from "./RemovePromoterUseCase";


const promoterRepository = new PromoterRepository();
const removePromoterUseCase = new RemovePromoterUseCase(promoterRepository);
const removePromoterController = new RemovePromoterController(removePromoterUseCase);

export { removePromoterController };
