import { Request, Response } from "express";
import { UpdateUseAvatarUserCase } from "./UpdateUserAvatarUseCase";
import { uploadFile } from "../../utils/UploadStorage";

/**
 * Update use avatar controller class
 * @date 6/6/2023 - 10:43:02 PM
 *
 * @class UpdateUseAvatarController
 * @typedef {UpdateUseAvatarController}
 */
class UpdateUseAvatarController {
    
    /**
     * Creates an instance of {@link UpdateUseAvatarController}.
     * @date 6/6/2023 - 10:43:06 PM
     *
     * @public
     * @type {UpdateUseAvatarUserCase}
     */
    public updateUserAvatarUseCase: UpdateUseAvatarUserCase;
    
    /**
     * Creates an instance of UpdateUseAvatarController.
     * @date 6/6/2023 - 10:43:10 PM
     *
     * @constructor
     * @public
     * @param {UpdateUseAvatarUserCase} updateUserAvatarUseCase
     */
    public constructor (updateUserAvatarUseCase: UpdateUseAvatarUserCase) {
        this.updateUserAvatarUseCase = updateUserAvatarUseCase;
    }
    
    /**
     * Manipulate method for make a update use avatar
     * @date 6/6/2023 - 10:43:13 PM
     *
     * @public
     * @async
     * @param {Request} request
     * @param {Response} response
     * @returns {unknown}
     */
    public async handle (request: Request, response: Response) {

        const { cpf, tipo } = request.user;
        const avatarImage = request.file;

        await this.updateUserAvatarUseCase.execute(tipo, cpf, avatarImage);
        return response.status(204).send();
    }

}

export { UpdateUseAvatarController }