import { CreateCheckoutUseCase } from "./CreateCheckoutUseCase";
import { Request, Response } from "express";


/**
 * Create checkout controller class
 * @date 6/6/2023 - 5:36:06 PM
 *
 * @class CreateCheckoutController
 * @typedef {CreateCheckoutController}
 */
class CreateCheckoutController {
    
    /**
     * Creates an instances of {@link CreateCheckoutController}
     * @date 6/6/2023 - 5:36:29 PM
     *
     * @private Marks this instance as having "private" visibility
     * @type {CreateCheckoutUseCase}
     */
    private createCheckoutUseCase: CreateCheckoutUseCase;

    
    /**
     * Creates an instance of CreateCheckoutController.
     * @date 6/6/2023 - 5:39:53 PM
     *
     * @constructor Marks this part of the code as a constructor
     * @public Marks this method as having "public" visibility
     * @param {CreateCheckoutUseCase} createCheckoutUseCase
     */
    public constructor (createCheckoutUseCase: CreateCheckoutUseCase) {
        this.createCheckoutUseCase = createCheckoutUseCase;
    }

    
    /**
     * Manipule the requisition for create a checkout
     * @date 6/6/2023 - 5:40:19 PM
     *
     * @public Marks this method as having "public" visibility
     * @async Marks this method as being asynchronous
     * @param {Request} request
     * @param {Response} response
     * @returns {Promise<Response>} response with the status 201 (No content) in sucess case
     */
    public async handle (request: Request, response: Response) {

        const { eventId, pistaAmount, stageAmount, vipAmount, pistaAmountHalf, stageAmountHalf, vipAmountHalf, freeAmount, amountSale } = request.body;

        const checkout: any = await this.createCheckoutUseCase.execute(eventId, pistaAmount, stageAmount, vipAmount, pistaAmountHalf, stageAmountHalf, vipAmountHalf, freeAmount, amountSale);

        return response.status(201).json({checkout});
    }

}

export { CreateCheckoutController }