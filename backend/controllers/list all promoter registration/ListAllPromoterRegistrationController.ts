import { ListAllPromoterRegistrationUseCase } from "./ListAllPromoterRegistrationUseCase";
import { Request, Response } from "express";

/**
 * List events controller class
 * @date 6/6/2023 - 10:19:46 PM
 *
 * @class ListAllPromoterRegistrationController
 * @typedef {ListAllPromoterRegistrationController}
 */
class ListAllPromoterRegistrationController {
    
    /**
     * Creates an instance of {@link ListAllPromoterRegistrationController}.
     * @date 6/6/2023 - 10:19:52 PM
     *
     * @private
     * @type {ListAllPromoterRegistrationUseCase}
     */
    private listAllPromoterRegistrationUseCase: ListAllPromoterRegistrationUseCase;
    
    /**
     * Creates an instance of ListAllPromoterRegistrationController.
     * @date 6/6/2023 - 10:19:58 PM
     *
     * @constructor
     * @param {ListAllPromoterRegistrationUseCase} listAllPromoterRegistrationUseCase
     */
    constructor (listAllPromoterRegistrationUseCase: ListAllPromoterRegistrationUseCase) {
        this.listAllPromoterRegistrationUseCase = listAllPromoterRegistrationUseCase;
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
        const allPromoterRegistration = await this.listAllPromoterRegistrationUseCase.execute();
        return response.status(200).json({allPromoterRegistration});
    }

}

export { ListAllPromoterRegistrationController };