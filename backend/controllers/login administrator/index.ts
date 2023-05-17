//This index file contains the basic info and procedures belonging to the functionality implemented by the other classes within its folder

//Import of all classes contained and directly used by (the files in) this folder
import { AdministratorRepository } from "../../db/AdministratorRepository";
import { LoginAdministratorController } from "./LoginAdministratorController";
import { LoginAdministratorUseCase } from "./LoginAdministratorUseCase";
import { TokenAdministratorRepository } from "../../db/TokenAdministratorRepository";

//Declaration of the instances of the classes
const administratorRepository = new AdministratorRepository();
const tokenAdministratorRepository = new TokenAdministratorRepository();
const loginAdministratorUseCase = new LoginAdministratorUseCase(administratorRepository, tokenAdministratorRepository);
const loginAdministratorController = new LoginAdministratorController(loginAdministratorUseCase);

//Exporting the instance of the controlling class of this feature-folder
export { loginAdministratorController };