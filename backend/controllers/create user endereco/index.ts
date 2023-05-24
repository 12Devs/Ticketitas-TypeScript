import { EnderecoUserRepository } from "../../db/EnderecoUserRepository";
import { CreateEnderecoUserController } from "./CreateEnderecoUserController";
import { CreateEnderecoUserUseCase } from "./CreateEnderecoUserUseCase";


const enderecoUserRepository = new EnderecoUserRepository();
const createEnderecoUserUseCase = new CreateEnderecoUserUseCase(enderecoUserRepository);
const createEnderecoUserController = new CreateEnderecoUserController(createEnderecoUserUseCase);

export { createEnderecoUserController };