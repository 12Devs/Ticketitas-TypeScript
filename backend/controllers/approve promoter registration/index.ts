import { PromoterRegistrationRequestRepository } from "../../db/PromoterRegistrationRequestRepository";
import { PromoterRepository } from "../../db/PromoterRepository";
import { AprovePromoterRegistrationController } from "./AprovePromoterRegistrationController";
import { AprovePromoterRegistrationUseCase } from "./AprovePromoterRegistrationUseCase";


const promoterRegistrationRequestRepository = new PromoterRegistrationRequestRepository();
const promoterRepository = new PromoterRepository();
const aprovePromoterRegistrationUseCase = new AprovePromoterRegistrationUseCase(promoterRegistrationRequestRepository, promoterRepository);
const aprovePromoterRegistrationController = new AprovePromoterRegistrationController(aprovePromoterRegistrationUseCase);

export { aprovePromoterRegistrationController };