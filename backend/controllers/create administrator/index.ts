//This index file contains the basic info and procedures belonging to the functionality implemented by the other classes within its folder

//Import of all classes contained and directly used by (the files in) this folder
import { AdministratorRepository } from "../../db/AdministratorRepository";
import { CreateAdministratorController } from "./CreateAdministratorController";
import { CreateAdministratorUseCase } from "./CreateAdministratorUseCase";

//Declaration of the instances of the classes
const clientRepository = new AdministratorRepository();
const createAdministradorUseCase = new CreateAdministratorUseCase(clientRepository);
const createAdministratorController = new CreateAdministratorController(createAdministradorUseCase);

//Exporting the instance of the controlling class of this feature-folder
export { createAdministratorController };