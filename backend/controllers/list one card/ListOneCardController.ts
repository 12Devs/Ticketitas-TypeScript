import { ListOneCardUseCase } from "./ListOneCardUseCase";
import { Request, Response } from "express";

/**
 * List one card controller class
 * @date 6/6/2023 - 10:22:59 PM
 *
 * @class ListOneCardController
 * @typedef {ListOneCardController}
 */
class ListOneCardController {
    
    /**
     * Creates an instance of {@link ListOneCardController}.
     * @date 6/6/2023 - 10:23:03 PM
     *
     * @private
     * @type {ListOneCardUseCase}
     */
    private listOneCardUseCase: ListOneCardUseCase;
    
    /**
     * Creates an instance of ListOneCardController.
     * @date 6/6/2023 - 10:23:08 PM
     *
     * @constructor
     * @public
     * @param {ListOneCardUseCase} listOneCardUseCase
     */
    public constructor (listOneCardUseCase: ListOneCardUseCase) {
        this.listOneCardUseCase = listOneCardUseCase;
    }
    
    /**
     * Manipulate method for make a list of one card
     * @date 6/6/2023 - 10:23:12 PM
     *
     * @public
     * @async
     * @param {Request} request
     * @param {Response} response
     * @returns {unknown}
     */
    public async handle (request: Request, response: Response){
        const { cpf }: any = request.user;
        const cardInfos = await this.listOneCardUseCase.execute(cpf);
        return response.status(200).json({cardInfos});
    }

}

export { ListOneCardController };