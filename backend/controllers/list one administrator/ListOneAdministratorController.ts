import { ListOneAdministratorUseCase } from "./ListOneAdministratorUseCase";
import { Request, Response } from "express";

/**
 * List one administrator controller class
 * @date 6/6/2023 - 10:21:44 PM
 *
 * @class ListOneAdministratorController
 * @typedef {ListOneAdministratorController}
 */
class ListOneAdministratorController {
    
    /**
     * Creates an instance of {@link ListOneAdministratorController}.
     * @date 6/6/2023 - 10:21:52 PM
     *
     * @private
     * @type {ListOneAdministratorUseCase}
     */
    private listOneAdministratorUseCase: ListOneAdministratorUseCase;
    
    /**
     * Creates an instance of ListOneAdministratorController.
     * @date 6/6/2023 - 10:22:01 PM
     *
     * @constructor
     * @public
     * @param {ListOneAdministratorUseCase} listOneAdministratorUseCase
     */
    public constructor (listOneAdministratorUseCase: ListOneAdministratorUseCase) {
        this.listOneAdministratorUseCase = listOneAdministratorUseCase;
    }
    
    /**
     * Manipulate method for make a list of one administrator
     * @date 6/6/2023 - 10:22:05 PM
     *
     * @public
     * @async
     * @param {Request} request
     * @param {Response} response
     * @returns {unknown}
     */
    public async handle (request: Request, response: Response){
        const { cpf }: any = request.user;
        const AdministratorInfos = await this.listOneAdministratorUseCase.execute(cpf);
        return response.status(200).json({AdministratorInfos});
    }

}

export { ListOneAdministratorController };