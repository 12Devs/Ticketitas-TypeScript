import { AdministratorRepository } from "../../db/AdministratorRepository";
import { AdministratorPasswordChangeCodeRepository } from "../../db/AdministratorPasswordChangeCodeRepository";
import { ChangePasswordAdministratorUseCase } from "./ChangePasswordAdministratorUseCase";
import { ChangePasswordAdministratorController } from "./ChangePasswordAdministratorController";
import { SendEmail } from "../../utils/SendEmail";

const administratorRepository = new AdministratorRepository();
const administratorPasswordChangeCodeRepository = new AdministratorPasswordChangeCodeRepository();
const sendEmail = new SendEmail();
const changePasswordAdministratorUseCase = new ChangePasswordAdministratorUseCase(administratorRepository, administratorPasswordChangeCodeRepository, sendEmail);
const changePasswordAdministratorController = new ChangePasswordAdministratorController(changePasswordAdministratorUseCase);

export { changePasswordAdministratorController };