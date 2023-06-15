
import { PromoterRegistrationRequestRepository } from "../../db/PromoterRegistrationRequestRepository";
import { ListAllPromoterRegistrationController } from "./ListAllPromoterRegistrationController";
import { ListAllPromoterRegistrationUseCase } from "./ListAllPromoterRegistrationUseCase";


const promoterRegistrationRequestRepository = new PromoterRegistrationRequestRepository();
const listAllPromoterRegistrationUseCase = new ListAllPromoterRegistrationUseCase(promoterRegistrationRequestRepository);
const listAllPromoterRegistrationController = new ListAllPromoterRegistrationController(listAllPromoterRegistrationUseCase);

export { listAllPromoterRegistrationController };