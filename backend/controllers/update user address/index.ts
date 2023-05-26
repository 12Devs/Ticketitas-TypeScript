import { ClientRepository } from "../../db/ClientRepository";
import { PromoterRepository } from "../../db/PromoterRepository";
import { UpdateUserAddressController } from "./UpdateUserAddressController";
import { UpdateUserAddressUseCase } from "./UpdateUserAddressUseCase";

const clientRepository = new ClientRepository();
const promoterRepository = new PromoterRepository();
const updateUserAddressUseCase = new UpdateUserAddressUseCase(clientRepository, promoterRepository);
const updateUserAddressController = new UpdateUserAddressController(updateUserAddressUseCase);

export { updateUserAddressController }