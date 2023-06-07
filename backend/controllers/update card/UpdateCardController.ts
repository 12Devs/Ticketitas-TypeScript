import { UpdateCardUseCase } from "./UpdateCardUseCase";
import { Request, Response } from "express";

/**
 * Update card controller class
 * @date 6/6/2023 - 10:40:08 PM
 *
 * @class UpdateCardController
 * @typedef {UpdateCardController}
 */
class UpdateCardController {
    
    /**
     * Creates an instance of {@link UpdateCardController}.
     * @date 6/6/2023 - 10:40:12 PM
     *
     * @private
     * @type {UpdateCardUseCase}
     */
    private creatCardUseCase: UpdateCardUseCase;
    
    /**
     * Creates an instance of UpdateCardController.
     * @date 6/6/2023 - 10:40:15 PM
     *
     * @constructor
     * @public
     * @param {UpdateCardUseCase} creatCardUseCase
     */
    public constructor (creatCardUseCase: UpdateCardUseCase) {
        this.creatCardUseCase = creatCardUseCase;
    }
    
    /**
     * Manipulate method for make a update card
     * @date 6/6/2023 - 10:40:18 PM
     *
     * @public
     * @async
     * @param {Request} request
     * @param {Response} response
     * @returns {unknown}
     */
    public async handle (request: Request, response: Response){

        const { cpf, cardNumber, holder, monthExpirationDate, yearExpirationDate, cvv } = request.body;
        await this.creatCardUseCase.execute(cpf, cardNumber, holder, monthExpirationDate, yearExpirationDate, cvv);
        return response.status(201).json({message: "Cartão atualizado com sucessso!"});
    }
}

export { UpdateCardController };