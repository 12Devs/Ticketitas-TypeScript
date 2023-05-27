import { PromoterRepository } from "../../db/PromoterRepository";
import { SendEmail } from "../../utils/SendEmail";
import { CreatePromoterController } from "./CreatePromoterController";
import { CreatePromoterUseCase } from "./CreatePromoterUseCase";

const promoterRepository = new PromoterRepository();
const sendEmail = new SendEmail();

const createPromoterUseCase = new CreatePromoterUseCase(promoterRepository, sendEmail);
const createPromoterController = new CreatePromoterController(createPromoterUseCase);

export { createPromoterController };
