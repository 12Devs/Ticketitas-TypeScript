
import { EnderecoRepository } from "../../db/EnderecoRepository";
import { CreateEnderecoController } from "./CreateEnderecoController";
import { CreateEnderecoUseCase } from "./CreateEnderecoUseCase";

const enderecoRepository = new EnderecoRepository();
const createEnderecoUseCase = new CreateEnderecoUseCase(enderecoRepository);
const createEnderecoController = new CreateEnderecoController(createEnderecoUseCase);

export { createEnderecoController };