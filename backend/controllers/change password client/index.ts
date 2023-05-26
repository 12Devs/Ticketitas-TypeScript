import { ClientRepository } from "../../db/ClientRepository";
import { ClientPasswordChangeCodeRepository } from "../../db/ClientPasswordChangeCodeRepository";
import { ChangePasswordClientUseCase } from "./ChangePasswordClientUseCase";
import { ChangePasswordClientController } from "./ChangePasswordClientController";
import { SendEmail } from "../../utils/SendEmail";

const clientRepository = new ClientRepository();
const clientPasswordChangeCodeRepository = new ClientPasswordChangeCodeRepository();
const sendEmail = new SendEmail();

const changePasswordClientUseCase = new ChangePasswordClientUseCase(clientRepository, clientPasswordChangeCodeRepository, sendEmail);
const changePasswordClientController = new ChangePasswordClientController(changePasswordClientUseCase);

export { changePasswordClientController };