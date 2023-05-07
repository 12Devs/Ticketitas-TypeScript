import { AdministratorRepository } from "../../db/AdministratorRepository";
import { LoginAdministratorController } from "./LoginAdministratorController";
import { LoginAdministratorUseCase } from "./LoginAdministratorUseCase";


const administratorRepository = new AdministratorRepository();
const loginAdministratorUseCase = new LoginAdministratorUseCase(administratorRepository);
const loginAdministratorController = new LoginAdministratorController(loginAdministratorUseCase);

export { loginAdministratorController };