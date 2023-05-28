//This index file contains the basic info and procedures belonging to the functionality implemented by the other classes within its folder

//Import of all classes contained and directly used by (the files in) this folder
import { AdministratorPasswordChangeCodeRepository } from "../../db/AdministratorPasswordChangeCodeRepository";
import { AdministratorRepository } from "../../db/AdministratorRepository";
import { NewPasswordAdministratorUseCase } from "./NewPasswordAdministratorUseCase";
import { NewPasswordAdministratorController } from "./NewPasswordAdministratorController";

//Declaration of the instances of the classes
const administratorPasswordChangeCodeRepository = new AdministratorPasswordChangeCodeRepository();
const administratorRepository = new AdministratorRepository();
const newPasswordAdministratorUseCase = new NewPasswordAdministratorUseCase(administratorRepository, administratorPasswordChangeCodeRepository);
const newPasswordAdministratorController = new NewPasswordAdministratorController(newPasswordAdministratorUseCase);

//Exporting the instance of the controlling class of this feature-folder
export { newPasswordAdministratorController };