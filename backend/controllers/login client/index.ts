import { ClientRepository } from "../../db/ClientRepository";
import { LoginClientController } from "./LoginClientController";
import { LoginClientUseCase } from "./LoginClientUseCase";


const clientRepository = new ClientRepository();
const loginClientUseCase = new LoginClientUseCase(clientRepository);
const loginClientController = new LoginClientController(loginClientUseCase);

export { loginClientController };