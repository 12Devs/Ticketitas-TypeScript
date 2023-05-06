
import { EnderecoEventRepository } from "../../db/EnderecoEventRepository";
import { CreateEnderecoEventController } from "./CreateEnderecoEventController";
import { CreateEnderecoEventUseCase } from "./CreateEnderecoEventUseCase";

const enderecoEventRepository = new EnderecoEventRepository();
const createEnderecoEventUseCase = new CreateEnderecoEventUseCase(enderecoEventRepository);
const createEnderecoEventController = new CreateEnderecoEventController(createEnderecoEventUseCase);

export { createEnderecoEventController };