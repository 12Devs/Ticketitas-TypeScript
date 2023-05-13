import { ClientRepository } from "../../db/ClientRepository";
import { PromoterRepository } from "../../db/PromoterRepository";
import { UpdateUseAvatarController } from "./UpdateUserAvatarController";
import { UpdateUseAvatarUserCase } from "./UpdateUserAvatarUseCase";

const clientRepository = new ClientRepository();
const promoterRepository = new PromoterRepository();
const updateUseAvatarUserCase = new UpdateUseAvatarUserCase(clientRepository, promoterRepository);
const updateAvatarController = new UpdateUseAvatarController(updateUseAvatarUserCase);

export { updateAvatarController }