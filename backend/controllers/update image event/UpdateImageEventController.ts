import { Request, Response } from "express";
import { UpdateImageEventUseCase } from "./UpdateImageEventUseCase";

/**
 * Update image event controller class
 * @date 6/6/2023 - 10:40:44 PM
 *
 * @class UpdateImageEventController
 * @typedef {UpdateImageEventController}
 */
class UpdateImageEventController {
    
    /**
     * Creates an instance of {@link UpdateImageEventController}.
     * @date 6/6/2023 - 10:40:52 PM
     *
     * @public
     * @type {UpdateImageEventUseCase}
     */
    public updateImageEventUseCase: UpdateImageEventUseCase;
    
    /**
     * Creates an instance of UpdateImageEventController.
     * @date 6/6/2023 - 10:40:56 PM
     *
     * @constructor
     * @public
     * @param {UpdateImageEventUseCase} updateImageEventUseCase
     */
    public constructor (updateImageEventUseCase: UpdateImageEventUseCase) {
        this.updateImageEventUseCase = updateImageEventUseCase;
    }
    
    /**
     * Manipulate method for make a update image event
     * @date 6/6/2023 - 10:41:00 PM
     *
     * @public
     * @async
     * @param {Request} request
     * @param {Response} response
     * @returns {unknown}
     */
    public async handle (request: Request, response: Response) {

        const { id } = request.body;
        const { cpf } = request.user;
        const imageEvent = request.file;
        await this.updateImageEventUseCase.execute(id, cpf, imageEvent);
        return response.status(204).send();
    }

}

export { UpdateImageEventController }