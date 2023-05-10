import { Request, Response } from "express";
import { UpdateUseAvatarUserCase } from "./UpdateUserAvatarUseCase";

class UpdateUseAvatarController {

    public updateUserAvatarUseCase: UpdateUseAvatarUserCase;

    public constructor (updateUserAvatarUseCase: UpdateUseAvatarUserCase) {
        this.updateUserAvatarUseCase = updateUserAvatarUseCase;
    }
    
    public async handle (request: Request, response: Response) {

        const { cpf } = request.user;
        const avatarImage = request.file.filename;

        await this.updateUserAvatarUseCase.execute(cpf, avatarImage);
        return response.status(204).send();
    }

}

export { UpdateUseAvatarController }