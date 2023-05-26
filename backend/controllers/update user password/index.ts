import { ClientRepository } from "../../db/ClientRepository";
import { PromoterRepository } from "../../db/PromoterRepository";
import { UpdateUserPasswordController } from "./UpdateUserPasswordController";
import { UpdateUserPasswordUseCase } from "./UpdateUserPasswordUseCase";
import { AdministratorRepository } from "../../db/AdministratorRepository";

const clientRepository = new ClientRepository();
const promoterRepository = new PromoterRepository();
const administratorRepository = new AdministratorRepository();
const updateUserPasswordUseCase = new UpdateUserPasswordUseCase(clientRepository, promoterRepository, administratorRepository);
const updateUserPasswordController = new UpdateUserPasswordController(updateUserPasswordUseCase);

export { updateUserPasswordController }