//This index file contains the basic info and procedures belonging to the functionality implemented by the other classes within its folder

//Import of all classes contained and directly used by (the files in) this folder
import { PromoterRepository } from "../../db/PromoterRepository";
import { PromoterPasswordChangeCodeRepository } from "../../db/PromoterPasswordChangeCodeRepository";
import { ChangePasswordPromoterUseCase } from "./ChangePasswordPromoterUseCase";
import { ChangePasswordPromoterController } from "./ChangePasswordPromoterController";
import { EmailProvider } from "../../utils/EmailProvider";

//Declaration of the instances of the classes
const promoterRepository = new PromoterRepository();
const promoterPasswordChangeCodeRepository = new PromoterPasswordChangeCodeRepository();
const emailProvider = new EmailProvider();
const changePasswordPromoterUseCase = new ChangePasswordPromoterUseCase(promoterRepository, promoterPasswordChangeCodeRepository, emailProvider);
const changePasswordPromoterController = new ChangePasswordPromoterController(changePasswordPromoterUseCase);

//Exporting the instance of the controlling class of this feature-folder
export { changePasswordPromoterController };