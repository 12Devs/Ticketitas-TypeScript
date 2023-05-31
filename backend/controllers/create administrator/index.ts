//This index file contains the basic info and procedures belonging to the functionality implemented by the other classes within its folder

//Import of all classes contained and directly used by (the files in) this folder
import { AdministratorRepository } from "../../db/AdministratorRepository";
import { SendEmail } from "../../utils/SendEmail";
import { SuperAdministratorRelationRepository } from "../../db/SuperAdministratorRelationRepository";
import { CreateAdministratorController } from "./CreateAdministratorController";
import { CreateAdministratorUseCase } from "./CreateAdministratorUseCase";

//Declaration of the instances of the classes
const administratorRepository = new AdministratorRepository();
const sendEmail = new SendEmail();
const superAdministratorRelationRepository = new SuperAdministratorRelationRepository();

const createAdministratorUseCase = new CreateAdministratorUseCase(administratorRepository, sendEmail, superAdministratorRelationRepository);
const createAdministratorController = new CreateAdministratorController(createAdministratorUseCase);

//Exporting the instance of the controlling class of this feature-folder
export { createAdministratorController };