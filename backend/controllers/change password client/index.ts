//This index file contains the basic info and procedures belonging to the functionality implemented by the other classes within its folder

//Import of all classes contained and directly used by (the files in) this folder
import { ClientRepository } from "../../db/ClientRepository";
import { ClientPasswordChangeCodeRepository } from "../../db/ClientPasswordChangeCodeRepository";
import { ChangePasswordClientUseCase } from "./ChangePasswordClientUseCase";
import { ChangePasswordClientController } from "./ChangePasswordClientController";
import { EmailProvider } from "../../utils/EmailProvider";

//Declaration of the instances of the classes
const clientRepository = new ClientRepository();
const clientPasswordChangeCodeRepository = new ClientPasswordChangeCodeRepository();
const emailProvider = new EmailProvider();
const changePasswordClientUseCase = new ChangePasswordClientUseCase(clientRepository, clientPasswordChangeCodeRepository, emailProvider);
const changePasswordClientController = new ChangePasswordClientController(changePasswordClientUseCase);

//Exporting the instance of the controlling class of this feature-folder
export { changePasswordClientController };