import { ClientRepository } from "../../db/ClientRepository";
import { PromoterRepository } from "../../db/PromoterRepository";
import { UpdateUserPhoneController } from "./UpdateUserPhoneController";
import { UpdateUserPhoneUseCase } from "./UpdateUserPhoneUseCase";
import { AdministratorRepository } from "../../db/AdministratorRepository";

const clientRepository = new ClientRepository();
const promoterRepository = new PromoterRepository();
const administratorRepository = new AdministratorRepository();
const updateUserPhoneUseCase = new UpdateUserPhoneUseCase(clientRepository, promoterRepository, administratorRepository);
const updateUserPhoneController = new UpdateUserPhoneController(updateUserPhoneUseCase);

export { updateUserPhoneController }