import { PromoterRegistrationRequestRepository } from "../../db/PromoterRegistrationRequestRepository";
import { PromoterRepository } from "../../db/PromoterRepository";
import { EmailProvider } from "../../utils/EmailProvider";
import { CreatePromoterController } from "./CreatePromoterController";
import { CreatePromoterUseCase } from "./CreatePromoterUseCase";

const promoterRepository = new PromoterRepository();
const emailProvider = new EmailProvider();

const promoterRegistrationRequestRepository = new PromoterRegistrationRequestRepository()
const createPromoterUseCase = new CreatePromoterUseCase(promoterRepository, promoterRegistrationRequestRepository, emailProvider);
const createPromoterController = new CreatePromoterController(createPromoterUseCase);

export { createPromoterController };
