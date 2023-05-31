import { ClientRepository } from "../../db/ClientRepository";
import { CreateClientController } from "./CreateClientController";
import { CreateClientUseCase } from "./CreateClientUseCase";
import { SendEmail } from "../../utils/SendEmail";

const clientRepository = new ClientRepository();
const sendEmail = new SendEmail();

const createClienteUseCase = new CreateClientUseCase(clientRepository, sendEmail);
const createClientController = new CreateClientController(createClienteUseCase);

export { createClientController };
