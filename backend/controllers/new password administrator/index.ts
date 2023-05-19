import { AdministratorPasswordChangeCodeRepository } from "../../db/AdministratorPasswordChangeCodeRepository";
import { AdministratorRepository } from "../../db/AdministratorRepository";
import { NewPasswordAdministratorUseCase } from "./NewPasswordAdministratorUseCase";
import { NewPasswordAdministratorController } from "./NewPasswordAdministratorController";

const administratorPasswordChangeCodeRepository = new AdministratorPasswordChangeCodeRepository();
const administratorRepository = new AdministratorRepository();

const newPasswordAdministratorUseCase = new NewPasswordAdministratorUseCase(administratorRepository);
const newPasswordAdministratorController = new NewPasswordAdministratorController(newPasswordAdministratorUseCase);

export { newPasswordAdministratorController };