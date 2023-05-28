//This index file contains the basic info and procedures belonging to the functionality implemented by the other classes within its folder

//Import of all classes contained and directly used by (the files in) this folder
import { ClientRepository } from "../../db/ClientRepository";
import { PromoterRepository } from "../../db/PromoterRepository";
import { UpdateUserPasswordController } from "./UpdateUserPasswordController";
import { UpdateUserPasswordUseCase } from "./UpdateUserPasswordUseCase";
import { AdministratorRepository } from "../../db/AdministratorRepository";

//Creation of the instances of the classes
const clientRepository = new ClientRepository();
const promoterRepository = new PromoterRepository();
const administratorRepository = new AdministratorRepository();
const updateUserPasswordUseCase = new UpdateUserPasswordUseCase(clientRepository, promoterRepository, administratorRepository);
const updateUserPasswordController = new UpdateUserPasswordController(updateUserPasswordUseCase);

//Exporting the instance of the controlling class of this feature-folder
export { updateUserPasswordController }