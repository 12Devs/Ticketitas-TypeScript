//This index file contains the basic info and procedures belonging to the functionality implemented by the other classes within its folder

//Import of all classes contained and directly used by (the files in) this folder
import { ClientRepository } from "../../db/ClientRepository";
import { PromoterRepository } from "../../db/PromoterRepository";
import { UpdateUserAddressController } from "./UpdateUserAddressController";
import { UpdateUserAddressUseCase } from "./UpdateUserAddressUseCase";

//Creation of the instances of the classes
const clientRepository = new ClientRepository();
const promoterRepository = new PromoterRepository();
const updateUserAddressUseCase = new UpdateUserAddressUseCase(clientRepository, promoterRepository);
const updateUserAddressController = new UpdateUserAddressController(updateUserAddressUseCase);

//Exporting the instance of the controlling class of this feature-folder
export { updateUserAddressController }