import { PromoterRepository } from "../../db/PromoterRepository";
import { PromoterPasswordChangeCodeRepository } from "../../db/PromoterPasswordChangeCodeRepository";
import { ChangePasswordPromoterUseCase } from "./ChangePasswordPromoterUseCase";
import { ChangePasswordPromoterController } from "./ChangePasswordPromoterController";
import { SendEmail } from "../../utils/SendEmail";

const promoterRepository = new PromoterRepository();
const promoterPasswordChangeCodeRepository = new PromoterPasswordChangeCodeRepository();
const sendEmail = new SendEmail();

const changePasswordPromoterUseCase = new ChangePasswordPromoterUseCase(promoterRepository, promoterPasswordChangeCodeRepository, sendEmail);
const changePasswordPromoterController = new ChangePasswordPromoterController(changePasswordPromoterUseCase);

export { changePasswordPromoterController };