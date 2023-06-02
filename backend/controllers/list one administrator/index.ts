import { AdministratorRepository } from "../../db/AdministratorRepository";
import { ListOneAdministratorController } from "./ListOneAdministratorController";
import { ListOneAdministratorUseCase } from "./ListOneAdministratorUseCase";


const administratorRepository = new AdministratorRepository();
const listOneAdministratorUseCase = new ListOneAdministratorUseCase(administratorRepository);
const listOneAdministratorController = new ListOneAdministratorController(listOneAdministratorUseCase);

export { listOneAdministratorController };