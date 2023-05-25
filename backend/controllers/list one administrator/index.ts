import { AdministratorRepository } from "../../db/AdministratorRepository";
import { EnderecoUserRepository } from "../../db/EnderecoUserRepository";
import { ListOneAdministratorController } from "./ListOneAdministratorController";
import { ListOneAdministratorUseCase } from "./ListOneAdministratorUseCase";


const administratorRepository = new AdministratorRepository();
const enderecouserRepository = new EnderecoUserRepository();
const listOneAdministratorUseCase = new ListOneAdministratorUseCase(administratorRepository, enderecouserRepository);
const listOneAdministratorController = new ListOneAdministratorController(listOneAdministratorUseCase);

export { listOneAdministratorController };