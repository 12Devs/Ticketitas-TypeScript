import { AdministratorRepository } from "../../db/AdministratorRepository";
import { CreateAdministratorController } from "./CreateAdministratorController";
import { CreateAdministratorUseCase } from "./CreateAdministratorUseCase";

const clientRepository = new AdministratorRepository();
const createAdministradorUseCase = new CreateAdministratorUseCase(clientRepository);
const createAdministratorController = new CreateAdministratorController(createAdministradorUseCase);

export { createAdministratorController };