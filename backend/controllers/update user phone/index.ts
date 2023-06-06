//This index file contains the basic info and procedures belonging to the functionality implemented by the other classes within its folder

//Import of all classes contained and directly used by (the files in) this folder
import { ClientRepository } from "../../db/ClientRepository";
import { PromoterRepository } from "../../db/PromoterRepository";
import { UpdateUserPhoneController } from "./UpdateUserPhoneController";
import { UpdateUserPhoneUseCase } from "./UpdateUserPhoneUseCase";
import { AdministratorRepository } from "../../db/AdministratorRepository";

//Creation of the instances of the classes
const clientRepository = new ClientRepository();
const promoterRepository = new PromoterRepository();
const administratorRepository = new AdministratorRepository();
const updateUserPhoneUseCase = new UpdateUserPhoneUseCase(clientRepository, promoterRepository, administratorRepository);
const updateUserPhoneController = new UpdateUserPhoneController(updateUserPhoneUseCase);

//Exporting the instance of the controlling class of this feature-folder
export { updateUserPhoneController }