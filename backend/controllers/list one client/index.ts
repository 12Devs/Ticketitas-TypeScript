import { ClientRepository } from "../../db/ClientRepository";
import { EnderecoUserRepository } from "../../db/EnderecoUserRepository";
import { WalletRepository } from "../../db/WalletRepository";
import { ListOneClientController } from "./ListOneClientController";
import { ListOneClientUseCase } from "./ListOneClientUseCase";


const clientRepository = new ClientRepository();
const enderecouserRepository = new EnderecoUserRepository();
const walletRepository = new WalletRepository();
const listOneClientUseCase = new ListOneClientUseCase(clientRepository, enderecouserRepository, walletRepository);
const listOneClientController = new ListOneClientController(listOneClientUseCase);

export { listOneClientController };