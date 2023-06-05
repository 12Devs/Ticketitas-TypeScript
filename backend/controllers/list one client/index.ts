import { ClientRepository } from "../../db/ClientRepository";
import { EnderecoUserRepository } from "../../db/EnderecoUserRepository";
import { ListOneClientController } from "./ListOneClientController";
import { ListOneClientUseCase } from "./ListOneClientUseCase";


const clientRepository = new ClientRepository();
const enderecouserRepository = new EnderecoUserRepository();
const listOneClientUseCase = new ListOneClientUseCase(clientRepository, enderecouserRepository);
const listOneClientController = new ListOneClientController(listOneClientUseCase);

export { listOneClientController };