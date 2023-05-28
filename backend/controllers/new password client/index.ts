//This index file contains the basic info and procedures belonging to the functionality implemented by the other classes within its folder

//Import of all classes contained and directly used by (the files in) this folder
import { ClientPasswordChangeCodeRepository } from "../../db/ClientPasswordChangeCodeRepository";
import { ClientRepository } from "../../db/ClientRepository";
import { NewPasswordClientUseCase } from "./NewPasswordClientUseCase";
import { NewPasswordClientController } from "./NewPasswordClientController";

//Declaration of the instances of the classes
const clientPasswordChangeCodeRepository = new ClientPasswordChangeCodeRepository();
const clientRepository = new ClientRepository();
const newPasswordClientUseCase = new NewPasswordClientUseCase(clientRepository, clientPasswordChangeCodeRepository);
const newPasswordClientController = new NewPasswordClientController(newPasswordClientUseCase);

//Exporting the instance of the controlling class of this feature-folder
export { newPasswordClientController };