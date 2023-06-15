import { RemoveAdministratorUseCase } from "./RemoveAdministratorUseCase";
import { Request, Response } from "express";

/**
 * Remove administrator controller class
 * @date 6/6/2023 - 10:38:43 PM
 *
 * @class RemoveAdministratorController
 * @typedef {RemoveAdministratorController}
 */
class RemoveAdministratorController {
    
    /**
     * Creates an instance of {@link RemoveAdministratorController}.
     * @date 6/6/2023 - 10:38:48 PM
     *
     * @private
     * @type {RemoveAdministratorUseCase}
     */
    private removeAdministratorUseCase: RemoveAdministratorUseCase;
    
    /**
     * Creates an instance of RemoveAdministratorController.
     * @date 6/6/2023 - 10:38:52 PM
     *
     * @constructor
     * @param {RemoveAdministratorUseCase} removeAdministratorUseCase
     */
    constructor (removeAdministratorUseCase: RemoveAdministratorUseCase) {
        this.removeAdministratorUseCase = removeAdministratorUseCase;
    }
    
    /**
     * Manipulate method for make a remove administrator
     * @date 6/6/2023 - 10:39:01 PM
     *
     * @public
     * @async
     * @param {Request} request
     * @param {Response} response
     * @returns {unknown}
     */
    public async handle (request: Request, response: Response, ){
        const { cpf }: any = request.params;
        await this.removeAdministratorUseCase.execute(cpf);
        return response.status(200).send();
    }



    
}

export {RemoveAdministratorController}