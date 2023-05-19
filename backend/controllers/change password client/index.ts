import { ClientRepository } from "../../db/ClientRepository";
import { ClientPasswordChangeCodeRepository } from "../../db/ClientPasswordChangeCodeRepository";
import { ChangePasswordClientUseCase } from "./ChangePasswordClientUseCase";
import { ChangePasswordClientController } from "./ChangePasswordClientController";

const clientRepository = new ClientRepository();
const clientPasswordChangeCodeRepository = new ClientPasswordChangeCodeRepository();

const changePasswordClientUseCase = new ChangePasswordClientUseCase(clientRepository);
const changePasswordClientController = new ChangePasswordClientController(changePasswordClientUseCase);

export { changePasswordClientController };