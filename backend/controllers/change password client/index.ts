import { ClientRepository } from "../../db/ClientRepository";
import { ChangePasswordClientUseCase } from "./ChangePasswordClientUseCase";
import { ChangePasswordClientController } from "./ChangePasswordClientController";

const clientRepository = new ClientRepository();

const changePasswordClientUseCase = new ChangePasswordClientUseCase(clientRepository);
const changePasswordClientController = new ChangePasswordClientController(changePasswordClientUseCase);

export { changePasswordClientController };