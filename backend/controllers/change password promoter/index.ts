import { PromoterRepository } from "../../db/PromoterRepository";
import { ChangePasswordPromoterUseCase } from "./ChangePasswordPromoterUseCase";
import { ChangePasswordPromoterController } from "./ChangePasswordPromoterController";

const promoterRepository = new PromoterRepository();

const changePasswordPromoterUseCase = new ChangePasswordPromoterUseCase(promoterRepository);
const changePasswordPromoterController = new ChangePasswordPromoterController(changePasswordPromoterUseCase);

export { changePasswordPromoterController };