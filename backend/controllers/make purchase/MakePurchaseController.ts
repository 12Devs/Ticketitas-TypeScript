import { MakePurchaseUseCase } from "./MakePurchaseUseCase";
import { Request, Response } from "express";

/**
 * Make purchase controller class
 * @date 6/6/2023 - 10:35:07 PM
 *
 * @class MakePurchaseController
 * @typedef {MakePurchaseController}
 */
class MakePurchaseController {
    
    /**
     * Creates an instance of {@link MakePurchaseController}.
     * @date 6/6/2023 - 10:35:16 PM
     *
     * @private
     * @type {MakePurchaseUseCase}
     */
    private makePurchaseUseCase: MakePurchaseUseCase;
    
    /**
     * Creates an instance of MakePurchaseController.
     * @date 6/6/2023 - 10:35:21 PM
     *
     * @constructor
     * @public
     * @param {MakePurchaseUseCase} makePurchaseUseCase
     */
    public constructor (makePurchaseUseCase: MakePurchaseUseCase) {
        this.makePurchaseUseCase = makePurchaseUseCase
    }
    
    /**
     * Manipulate method for make a purchase
     * @date 6/6/2023 - 10:35:24 PM
     *
     * @public
     * @async
     * @param {Request} request
     * @param {Response} response
     * @returns {unknown}
     */
    public async handle (request: Request, response: Response) {

        
        const { pistaAmount, stageAmount, vipAmount, pistaAmountHalf, stageAmountHalf, vipAmountHalf, freeAmount, walletValue, clientName, clientCpf, email, eventId, checkoutId } = request.body;

        await this.makePurchaseUseCase.execute(pistaAmount, stageAmount, vipAmount, pistaAmountHalf, stageAmountHalf, vipAmountHalf, freeAmount, walletValue, clientName, clientCpf, email, eventId, checkoutId );
        
        return response.status(201).json({message: "Venda efetuada com sucesso!"});
    }
    
}

export { MakePurchaseController };