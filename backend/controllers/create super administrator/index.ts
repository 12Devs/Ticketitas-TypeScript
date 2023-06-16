//This index file contains the basic info and procedures belonging to the functionality implemented by the other classes within its folder

//Import of all classes contained and directly used by (the files in) this folder
import { AdministratorRepository } from "../../db/AdministratorRepository";
import { EmailProvider } from "../../utils/EmailProvider";
import { SuperAdministratorRelationRepository} from "../../db/SuperAdministratorRelationRepository";
import { CreateSuperAdministratorController } from "./CreateSuperAdministratorController";
import { CreateSuperAdministratorUseCase } from "./CreateSuperAdministratorUseCase";

//Declaration of the instances of the classes
const administratorRepository = new AdministratorRepository();
const emailProvider = new EmailProvider();
const superAdministratorRelationRepository = new SuperAdministratorRelationRepository();
const createSuperAdministratorUseCase = new CreateSuperAdministratorUseCase(administratorRepository, emailProvider, superAdministratorRelationRepository);
const createSuperAdministratorController = new CreateSuperAdministratorController(createSuperAdministratorUseCase);

//Exporting the instance of the controlling class of this feature-folder
export { createSuperAdministratorController };