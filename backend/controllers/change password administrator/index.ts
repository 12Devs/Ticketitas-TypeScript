import { AdministratorRepository } from "../../db/AdministratorRepository";
import { ChangePasswordAdministratorUseCase } from "./ChangePasswordAdministratorUseCase";
import { ChangePasswordAdministratorController } from "./ChangePasswordAdministratorController";

const administratorRepository = new AdministratorRepository();

const changePasswordAdministratorUseCase = new ChangePasswordAdministratorUseCase(administratorRepository);
const changePasswordAdministratorController = new ChangePasswordAdministratorController(changePasswordAdministratorUseCase);

export { changePasswordAdministratorController };