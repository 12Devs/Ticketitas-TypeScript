//This index file contains the basic info and procedures belonging to the functionality implemented by the other classes within its folder

//Import of all classes contained and directly used by (the files in) this folder
import { AdministratorRepository } from "../../db/AdministratorRepository";
import { AdministratorPasswordChangeCodeRepository } from "../../db/AdministratorPasswordChangeCodeRepository";
import { ChangePasswordAdministratorUseCase } from "./ChangePasswordAdministratorUseCase";
import { ChangePasswordAdministratorController } from "./ChangePasswordAdministratorController";
import { SendEmail } from "../../utils/SendEmail";

//Declaration of the instances of the classes
const administratorRepository = new AdministratorRepository();
const administratorPasswordChangeCodeRepository = new AdministratorPasswordChangeCodeRepository();
const sendEmail = new SendEmail();
const changePasswordAdministratorUseCase = new ChangePasswordAdministratorUseCase(administratorRepository, administratorPasswordChangeCodeRepository, sendEmail);
const changePasswordAdministratorController = new ChangePasswordAdministratorController(changePasswordAdministratorUseCase);

//Exporting the instance of the controlling class of this feature-folder
export { changePasswordAdministratorController };