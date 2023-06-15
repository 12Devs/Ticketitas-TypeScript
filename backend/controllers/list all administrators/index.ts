import { AdministratorRepository } from "../../db/AdministratorRepository";
import { ListAllAdministratorsController } from "./ListAllAdministratorsController";
import { ListAllAdministratorsUseCase } from "./ListAllAdministratorsUseCase";


const administratorRepository = new AdministratorRepository();
const listAllAdministratorsUseCase = new ListAllAdministratorsUseCase(administratorRepository);
const listAllAdministratorsController = new ListAllAdministratorsController(listAllAdministratorsUseCase);

export { listAllAdministratorsController };