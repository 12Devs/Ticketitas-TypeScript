import { AdministratorRepository } from "../../db/AdministratorRepository";
import { AdministratorPasswordChangeCodeRepository } from "../../db/AdministratorPasswordChangeCodeRepository";
import { ChangePasswordAdministratorUseCase } from "./ChangePasswordAdministratorUseCase";
import { ChangePasswordAdministratorController } from "./ChangePasswordAdministratorController";

const administratorRepository = new AdministratorRepository();
const administratorPasswordChangeCodeRepository = new AdministratorPasswordChangeCodeRepository();

const changePasswordAdministratorUseCase = new ChangePasswordAdministratorUseCase(administratorRepository);
const changePasswordAdministratorController = new ChangePasswordAdministratorController(changePasswordAdministratorUseCase);

export { changePasswordAdministratorController };