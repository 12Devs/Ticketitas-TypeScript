import { ClientPasswordChangeCodeRepository } from "../../db/ClientPasswordChangeCodeRepository";
import { ClientRepository } from "../../db/ClientRepository";
import { NewPasswordClientUseCase } from "./NewPasswordClientUseCase";
import { NewPasswordClientController } from "./NewPasswordClientController";

const clientPasswordChangeCodeRepository = new ClientPasswordChangeCodeRepository();
const clientRepository = new ClientRepository();

const newPasswordClientUseCase = new NewPasswordClientUseCase(clientRepository);
const newPasswordClientController = new NewPasswordClientController(newPasswordClientUseCase);

export { newPasswordClientController };