import { ClientRepository } from "../../db/ClientRepository";
import { PromoterRepository } from "../../db/PromoterRepository";
import { UpdateUserEmailController } from "./UpdateUserEmailController";
import { UpdateUserEmailUseCase } from "./UpdateUserEmailUseCase";
import { AdministratorRepository } from "../../db/AdministratorRepository";

const clientRepository = new ClientRepository();
const promoterRepository = new PromoterRepository();
const administratorRepository = new AdministratorRepository();
const updateUserEmailUseCase = new UpdateUserEmailUseCase(clientRepository, promoterRepository, administratorRepository);
const updateUserEmailController = new UpdateUserEmailController(updateUserEmailUseCase);

export { updateUserEmailController }