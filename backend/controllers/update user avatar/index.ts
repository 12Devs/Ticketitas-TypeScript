import { ClientRepository } from "../../db/ClientRepository";
import { UpdateUseAvatarController } from "./UpdateUserAvatarController";
import { UpdateUseAvatarUserCase } from "./UpdateUserAvatarUseCase";

const userRepository = new ClientRepository();
const updateUseAvatarUserCase = new UpdateUseAvatarUserCase(userRepository);
const updateAvatarController = new UpdateUseAvatarController(updateUseAvatarUserCase);

export { updateAvatarController }