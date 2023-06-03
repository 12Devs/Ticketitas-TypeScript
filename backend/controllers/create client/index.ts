import { ClientRepository } from "../../db/ClientRepository";
import { CreateClientController } from "./CreateClientController";
import { CreateClientUseCase } from "./CreateClientUseCase";
import { EmailProvider } from "../../utils/EmailProvider";

const clientRepository = new ClientRepository();
const emailProvider = new EmailProvider();
const createClienteUseCase = new CreateClientUseCase(clientRepository, emailProvider);
const createClientController = new CreateClientController(createClienteUseCase);

export { createClientController };
