import { AprovePromoterRegistrationUseCase } from "./AprovePromoterRegistrationUseCase";
import { Request, Response } from "express";


/**
 * Promoter registration controler class
 * @date 6/6/2023 - 5:15:35 PM
 *
 * @class AprovePromoterRegistrationController
 * @typedef {AprovePromoterRegistrationController}
 */
class AprovePromoterRegistrationController {
    
    /**
     * Creates an instaces of {@link AprovePromoterRegistrationController}
     * @date 6/6/2023 - 5:16:08 PM
     *
     * @private Marks this instance as having "private" visibility
     * @type {AprovePromoterRegistrationUseCase}
     */
    private aprovePromoterRegistrationUseCase: AprovePromoterRegistrationUseCase;

    
    /**
     * Creates an instance of AprovePromoterRegistrationController.
     * @date 6/6/2023 - 5:16:45 PM
     *
     * @constructor Marks this part of the code as a constructor
     * @public Marks this method as having "public" visibility
     * @param {AprovePromoterRegistrationUseCase} aprovePromoterRegistrationUseCase
     */
    public constructor (aprovePromoterRegistrationUseCase: AprovePromoterRegistrationUseCase) {
        this.aprovePromoterRegistrationUseCase = aprovePromoterRegistrationUseCase;
    }
    
    /**
     * Manipule the requisition for aprove the promoter register
     * @date 6/6/2023 - 5:21:44 PM
     *
     * @public Marks this method as having "public" visibility
     * @async Marks this method as being asynchronous
     * @param {Request} request
     * @param {Response} response
     * @returns {Promise<Response>} response with the status 204 (No content) in sucess case
     */
    public async handle (request: Request, response: Response) {
        const { promoterCpf }: any = request.params;
        
        await this.aprovePromoterRegistrationUseCase.execute(promoterCpf);

        return response.status(204).send();
    }
}

export { AprovePromoterRegistrationController };