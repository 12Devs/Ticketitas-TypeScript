import { ClientRepository } from "../../db/ClientRepository";
import { CreateClientController } from "./CreateClientController";
import { CreateClientUseCase } from "./CreateClientUseCase";

const clientRepository = new ClientRepository();
const createClienteUseCase = new CreateClientUseCase(clientRepository);
const createClientController = new CreateClientController(createClienteUseCase);

export { createClientController };
