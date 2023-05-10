import { ClientRepository } from "../../db/ClientRepository";
import { TokenClientRepository } from "../../db/TokenClientRepository";
import { LoginClientController } from "./LoginClientController";
import { LoginClientUseCase } from "./LoginClientUseCase";


const clientRepository = new ClientRepository();
const tokenClientRepository = new TokenClientRepository()
const loginClientUseCase = new LoginClientUseCase(clientRepository, tokenClientRepository);
const loginClientController = new LoginClientController(loginClientUseCase);

export { loginClientController };