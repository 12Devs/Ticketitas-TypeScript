import { uploadFileStorage } from "../../utils/UploadStorage";
import { UpdateStatusEventUseCase } from "./UpdateStatusEventUseCase";
import { Request, Response } from "express";

/**
 * Update status event controller class
 * @date 6/6/2023 - 10:41:28 PM
 *
 * @class UpdateStatusEventController
 * @typedef {UpdateStatusEventController}
 */
class UpdateStatusEventController {
    
    /**
     * Creates an instance of {@link UpdateStatusEventController}.
     * @date 6/6/2023 - 10:41:34 PM
     *
     * @private
     * @type {UpdateStatusEventUseCase}
     */
    private updateStatusEventUseCase: UpdateStatusEventUseCase;
    
    /**
     * Creates an instance of UpdateStatusEventController.
     * @date 6/6/2023 - 10:41:38 PM
     *
     * @constructor
     * @public
     * @param {UpdateStatusEventUseCase} updateStatusEventUseCase
     */
    public constructor (updateStatusEventUseCase: UpdateStatusEventUseCase) {
        this.updateStatusEventUseCase = updateStatusEventUseCase;
    }
    
    /**
     * Manipulate method for make a update status event
     * @date 6/6/2023 - 10:41:44 PM
     *
     * @public
     * @async
     * @param {Request} request
     * @param {Response} response
     * @returns {unknown}
     */
    public async handle (request: Request, response: Response) {

        const { id, promoterCpf } = request.body;

        await this.updateStatusEventUseCase.execute(id, promoterCpf);
        
        return response.status(204).send();
    }
}

export { UpdateStatusEventController };