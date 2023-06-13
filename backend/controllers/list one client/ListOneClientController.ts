import { ListOneClientUseCase } from "./ListOneClientUseCase";
import { Request, Response } from "express";

/**
 * List one client controller class
 * @date 6/6/2023 - 10:24:50 PM
 *
 * @class ListOneClientController
 * @typedef {ListOneClientController}
 */
class ListOneClientController {
    
    /**
     * Creates an instance of {@link ListOneClientController}.
     * @date 6/6/2023 - 10:24:55 PM
     *
     * @private
     * @type {ListOneClientUseCase}
     */
    private listOneClientUseCase: ListOneClientUseCase;
    
    /**
     * Creates an instance of ListOneClientController.
     * @date 6/6/2023 - 10:25:01 PM
     *
     * @constructor
     * @public
     * @param {ListOneClientUseCase} listOneClientUseCase
     */
    public constructor (listOneClientUseCase: ListOneClientUseCase) {
        this.listOneClientUseCase = listOneClientUseCase;
    }
    
    /**
     * Manipulate method for make a list of one client
     * @date 6/6/2023 - 10:25:05 PM
     *
     * @public
     * @async
     * @param {Request} request
     * @param {Response} response
     * @returns {unknown}
     */
    public async handle (request: Request, response: Response){
        const { cpf }: any = request.user;
        const ClientInfos = await this.listOneClientUseCase.execute(cpf);
        return response.status(200).json({ClientInfos});
    }

}

export { ListOneClientController };