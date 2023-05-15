import { PromoterRepository } from "../../db/PromoterRepository";
import { CreatePromoterController } from "./CreatePromoterController";
import { CreatePromoterUseCase } from "./CreatePromoterUseCase";
const promoterRepository = new PromoterRepository();
const createPromoterUseCase = new CreatePromoterUseCase(promoterRepository);
const createPromoterController = new CreatePromoterController(createPromoterUseCase);

export { createPromoterController };
