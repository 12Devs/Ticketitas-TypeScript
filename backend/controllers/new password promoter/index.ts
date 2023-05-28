//This index file contains the basic info and procedures belonging to the functionality implemented by the other classes within its folder

//Import of all classes contained and directly used by (the files in) this folder
import { PromoterPasswordChangeCodeRepository } from "../../db/PromoterPasswordChangeCodeRepository";
import { PromoterRepository } from "../../db/PromoterRepository";
import { NewPasswordPromoterUseCase } from "./NewPasswordPromoterUseCase";
import { NewPasswordPromoterController } from "./NewPasswordPromoterController";

//Declaration of the instances of the classes
const promoterPasswordChangeCodeRepository = new PromoterPasswordChangeCodeRepository();
const promoterRepository = new PromoterRepository();
const newPasswordPromoterUseCase = new NewPasswordPromoterUseCase(promoterRepository, promoterPasswordChangeCodeRepository);
const newPasswordPromoterController = new NewPasswordPromoterController(newPasswordPromoterUseCase);

//Exporting the instance of the controlling class of this feature-folder
export { newPasswordPromoterController };