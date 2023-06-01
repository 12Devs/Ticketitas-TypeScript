import { Request, Response } from "express";
import { UpdateUseAvatarUserCase } from "./UpdateUserAvatarUseCase";
import { uploadFile } from "../../utils/UploadStorage";

class UpdateUseAvatarController {

    public updateUserAvatarUseCase: UpdateUseAvatarUserCase;

    public constructor (updateUserAvatarUseCase: UpdateUseAvatarUserCase) {
        this.updateUserAvatarUseCase = updateUserAvatarUseCase;
    }
    
    public async handle (request: Request, response: Response) {

        const { cpf, tipo } = request.user;
        const avatarImage = request.file;

        await this.updateUserAvatarUseCase.execute(tipo, cpf, avatarImage);
        return response.status(204).send();
    }

}

export { UpdateUseAvatarController }