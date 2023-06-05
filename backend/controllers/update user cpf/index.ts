import { ClientRepository } from "../../db/ClientRepository";
import { PromoterRepository } from "../../db/PromoterRepository";
import { UpdateUserCpfController } from "./UpdateUserCpfController";
import { UpdateUserCpfUseCase } from "./UpdateUserCpfUseCase";
import { AdministratorRepository } from "../../db/AdministratorRepository";

const clientRepository = new ClientRepository();
const promoterRepository = new PromoterRepository();
const administratorRepository = new AdministratorRepository();
const updateUserCpfUseCase = new UpdateUserCpfUseCase(clientRepository, promoterRepository, administratorRepository);
const updateUserCpfController = new UpdateUserCpfController(updateUserCpfUseCase);

export { updateUserCpfController }