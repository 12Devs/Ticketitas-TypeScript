import { RemovePromoterUseCase } from "./RemovePromoterUseCase";
import { Request, Response } from "express";

/**
 * Remove promoter controller class
 * @date 6/6/2023 - 10:38:43 PM
 *
 * @class RemovePromoterController
 * @typedef {RemovePromoterController}
 */
class RemovePromoterController {
    
    /**
     * Creates an instance of {@link RemovePromoterController}.
     * @date 6/6/2023 - 10:38:48 PM
     *
     * @private
     * @type {RemovePromoterUseCase}
     */
    private removePromoterUseCase: RemovePromoterUseCase;
    
    /**
     * Creates an instance of RemovePromoterController.
     * @date 6/6/2023 - 10:38:52 PM
     *
     * @constructor
     * @param {RemovePromoterUseCase} removePromoterUseCase
     */
    constructor (removePromoterUseCase: RemovePromoterUseCase) {
        this.removePromoterUseCase = removePromoterUseCase;
    }
    
    /**
     * Manipulate method for make a remove promoter
     * @date 6/6/2023 - 10:39:01 PM
     *
     * @public
     * @async
     * @param {Request} request
     * @param {Response} response
     * @returns {unknown}
     */
    public async handle (request: Request, response: Response, ){
        const { promoterCpf, id, nome, descricao, dataEvento, quantPista, quantStage, quantVip, valorPista, valorStage, valorVip, cep, estado, cidade, bairro, rua, numero } = request.body;
        const removePromoterr = await this.removePromoterUseCase.execute(promoterCpf);

        
        
        return response.status(200).json({removePromoterr});
    }



    
}

export {RemovePromoterController}