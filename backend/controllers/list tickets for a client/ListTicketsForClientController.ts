import { Request, Response } from "express";
import { ListTicketsForClientUseCase } from "./ListTicketsForClientUseCase";

/**
 * List tickets for a client controller class
 * @date 6/6/2023 - 10:30:58 PM
 *
 * @class ListTicketsForClientController
 * @typedef {ListTicketsForClientController}
 */
class ListTicketsForClientController {
    
    /**
     * Creates an instance of {@link ListTicketsForClientController}.
     * @date 6/6/2023 - 10:31:07 PM
     *
     * @private
     * @type {ListTicketsForClientUseCase}
     */
    private listTicketsForClientUseCase: ListTicketsForClientUseCase;
    
    /**
     * Creates an instance of ListTicketsForClientController.
     * @date 6/6/2023 - 10:31:11 PM
     *
     * @constructor
     * @public
     * @param {ListTicketsForClientUseCase} listTicketsForClientUseCase
     */
    public constructor (listTicketsForClientUseCase: ListTicketsForClientUseCase) {
        this.listTicketsForClientUseCase = listTicketsForClientUseCase;
    }
    
    /**
     * Manipulate method for make a list of tickets for a client
     * @date 6/6/2023 - 10:31:16 PM
     *
     * @public
     * @async
     * @param {Request} request
     * @param {Response} response
     * @returns {unknown}
     */
    public async handle (request: Request, response: Response){
        const { cpf }: any = request.user;
        const PromoterInfos = await this.listTicketsForClientUseCase.execute(cpf);
        return response.status(200).json({PromoterInfos});
    }

}

export { ListTicketsForClientController };