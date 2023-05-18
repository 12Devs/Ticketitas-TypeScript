import { PromoterPasswordChangeCodeRepository } from "../../db/PromoterPasswordChangeCodeRepository";
import { PromoterRepository } from "../../db/PromoterRepository";
import { NewPasswordPromoterUseCase } from "./NewPasswordPromoterUseCase";
import { NewPasswordPromoterController } from "./NewPasswordPromoterController";

const promoterPasswordChangeCodeRepository = new PromoterPasswordChangeCodeRepository();
const promoterRepository = new PromoterRepository();

const newPasswordPromoterUseCase = new NewPasswordPromoterUseCase(promoterRepository);
const newPasswordPromoterController = new NewPasswordPromoterController(newPasswordPromoterUseCase);

export { newPasswordPromoterController };