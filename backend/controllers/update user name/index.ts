import { ClientRepository } from "../../db/ClientRepository";
import { PromoterRepository } from "../../db/PromoterRepository";
import { UpdateUserNameController } from "./UpdateUserNameController";
import { UpdateUserNameUseCase } from "./UpdateUserNameUseCase";
import { AdministratorRepository } from "../../db/AdministratorRepository";

const clientRepository = new ClientRepository();
const promoterRepository = new PromoterRepository();
const administratorRepository = new AdministratorRepository();
const updateUserNameUseCase = new UpdateUserNameUseCase(clientRepository, promoterRepository, administratorRepository);
const updateUserNameController = new UpdateUserNameController(updateUserNameUseCase);

export { updateUserNameController }