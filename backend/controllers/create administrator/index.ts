//This index file contains the basic info and procedures belonging to the functionality implemented by the other classes within its folder

//Import of all classes contained and directly used by (the files in) this folder
import { AdministratorRepository } from "../../db/AdministratorRepository";
import { SuperAdministratorRelationRepository } from "../../db/SuperAdministratorRelationRepository";
import { CreateAdministratorController } from "./CreateAdministratorController";
import { CreateAdministratorUseCase } from "./CreateAdministratorUseCase";
import { EmailProvider } from "../../utils/EmailProvider";

//Declaration of the instances of the classes
const administratorRepository = new AdministratorRepository();
const emailProvider = new EmailProvider();
const superAdministratorRelationRepository = new SuperAdministratorRelationRepository();

const createAdministratorUseCase = new CreateAdministratorUseCase(administratorRepository, emailProvider, superAdministratorRelationRepository);
const createAdministratorController = new CreateAdministratorController(createAdministratorUseCase);

//Exporting the instance of the controlling class of this feature-folder
export { createAdministratorController };