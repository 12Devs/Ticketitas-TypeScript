import { ListAllPromotersUseCase } from "./ListAllPromotersUseCase";
import { Request, Response } from "express";

/**
 * List events controller class
 * @date 6/6/2023 - 10:19:46 PM
 *
 * @class ListAllPromotersController
 * @typedef {ListAllPromotersController}
 */
class ListAllPromotersController {
    
    /**
     * Creates an instance of {@link ListAllPromotersController}.
     * @date 6/6/2023 - 10:19:52 PM
     *
     * @private
     * @type {ListAllPromotersUseCase}
     */
    private listAllPromotersUseCase: ListAllPromotersUseCase;
    
    /**
     * Creates an instance of ListAllPromotersController.
     * @date 6/6/2023 - 10:19:58 PM
     *
     * @constructor
     * @param {ListAllPromotersUseCase} listAllPromotersUseCase
     */
    constructor (listAllPromotersUseCase: ListAllPromotersUseCase) {
        this.listAllPromotersUseCase = listAllPromotersUseCase;
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
        const allPromoters = await this.listAllPromotersUseCase.execute();
        return response.status(200).json({allPromoters});
    }

}

export { ListAllPromotersController };