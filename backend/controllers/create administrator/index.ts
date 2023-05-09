//This index file contains the basic info and procedures belonging to the functionality implemented by the other classes within its folder

//Import of all classes contained and directly used by (the files in) this folder
import { AdministratorRepository } from "../../db/AdministratorRepository";
import { CreateAdministratorController } from "./CreateAdministratorController";
import { CreateAdministratorUseCase } from "./CreateAdministratorUseCase";

//Declaration of the instances of the classes
const administratorRepository = new AdministratorRepository();
const createAdministratorUseCase = new CreateAdministratorUseCase(administratorRepository);
const createAdministratorController = new CreateAdministratorController(createAdministratorUseCase);

//Exporting the instance of the controlling class of this feature-folder
export { createAdministratorController };