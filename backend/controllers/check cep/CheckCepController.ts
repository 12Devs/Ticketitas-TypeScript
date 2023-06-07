import { CheckCepUseCase } from "./CheckCepUseCase";
import { Request, Response } from "express";


/**
 * Chek CEP class controller
 * @date 6/6/2023 - 5:27:42 PM
 *
 * @class CheckCepController
 * @typedef {CheckCepController}
 */
class CheckCepController {
    
    /**
     * Create an instance of {@link CheckCepController}
     * @date 6/6/2023 - 5:28:37 PM
     *
     * @private Marks this instance as having "private" visibility
     * @type {CheckCepUseCase}
     */
    private checkCepUseCase: CheckCepUseCase;

    
    /**
     * Creates an instance of CheckCepController.
     * @date 6/6/2023 - 5:29:16 PM
     *
     * @constructor Marks this part of the code as a constructor
     * @param {CheckCepUseCase} checkCepUseCase
     */
    constructor (checkCepUseCase: CheckCepUseCase) {
        this.checkCepUseCase = checkCepUseCase;
    }

    
    /**
     * Manipule the requisition for get the datas of CEP
     * @date 6/6/2023 - 5:29:54 PM
     *
     * @public Marks this method as having "public" visibility
     * @async Marks this method as being asynchronous
     * @param {Request} request
     * @param {Response} response
     * @returns {Promise<Response>} response with the status 200 (No content) in sucess case
     */
    public async handle (request: Request, response: Response){

        const { cep }: any = request.params;
        
        const enderecoViaCep = await this.checkCepUseCase.execute(cep);
        return response.status(200).json(enderecoViaCep);
        
    }

}

export { CheckCepController };