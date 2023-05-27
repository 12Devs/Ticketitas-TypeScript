import { PromoterRegistrationRequestRepository } from "../../db/PromoterRegistrationRequestRepository";
import { PromoterRepository } from "../../db/PromoterRepository";
import { CreatePromoterController } from "./CreatePromoterController";
import { CreatePromoterUseCase } from "./CreatePromoterUseCase";

const promoterRepository = new PromoterRepository();
const promoterRegistrationRequestRepository = new PromoterRegistrationRequestRepository()
const createPromoterUseCase = new CreatePromoterUseCase(promoterRepository, promoterRegistrationRequestRepository);
const createPromoterController = new CreatePromoterController(createPromoterUseCase);

export { createPromoterController };
