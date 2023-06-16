import { AdministratorRepository } from "../../db/AdministratorRepository";
import { RemoveAdministratorController } from "./RemoveAdministratorController";
import { RemoveAdministratorUseCase } from "./RemoveAdministratorUseCase";


const administratorRepository = new AdministratorRepository();
const removeAdministratorUseCase = new RemoveAdministratorUseCase(administratorRepository);
const removeAdministratorController = new RemoveAdministratorController(removeAdministratorUseCase);

export { removeAdministratorController }