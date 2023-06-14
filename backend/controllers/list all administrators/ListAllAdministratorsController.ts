import { ListAllAdministratorsUseCase } from "./ListAllAdministratorsUseCase";
import { Request, Response } from "express";

/**
 * List events controller class
 * @date 6/6/2023 - 10:19:46 PM
 *
 * @class ListAllAdministratorsController
 * @typedef {ListAllAdministratorsController}
 */
class ListAllAdministratorsController {
    
    /**
     * Creates an instance of {@link ListAllAdministratorsController}.
     * @date 6/6/2023 - 10:19:52 PM
     *
     * @private
     * @type {ListAllAdministratorsUseCase}
     */
    private listAllAdministratorsUseCase: ListAllAdministratorsUseCase;
    
    /**
     * Creates an instance of ListAllAdministratorsController.
     * @date 6/6/2023 - 10:19:58 PM
     *
     * @constructor
     * @param {ListAllAdministratorsUseCase} listAllAdministratorsUseCase
     */
    constructor (listAllAdministratorsUseCase: ListAllAdministratorsUseCase) {
        this.listAllAdministratorsUseCase = listAllAdministratorsUseCase;
    }
    
    /**
     * Manipulate method for make a list of events
     * @date 6/6/2023 - 10:20:02 PM
     *
     * @public
     * @async
     * @param {Request} request
     * @param {Response} response
     * @returns {unknown}
     */
    public async handle (request: Request, response: Response){
        const allAdministrators = await this.listAllAdministratorsUseCase.execute();
        return response.status(200).json({allAdministrators});
    }

}

export { ListAllAdministratorsController };