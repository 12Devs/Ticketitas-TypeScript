import { Request, Response } from "express";
import { LoginAdministratorUseCase } from "./LoginAdministratorUseCase";

/**
 * Login administrator controller class
 * @date 6/6/2023 - 10:32:19 PM
 *
 * @class LoginAdministratorController
 * @typedef {LoginAdministratorController}
 */
class LoginAdministratorController {
    
    /**
     * Creates an instance of {@link LoginAdministratorController}.
     * @date 6/6/2023 - 10:32:23 PM
     *
     * @private
     * @type {LoginAdministratorUseCase}
     */
    private loginAdministratorUseCase: LoginAdministratorUseCase;
    
    /**
     * Creates an instance of LoginAdministratorController.
     * @date 6/6/2023 - 10:32:29 PM
     *
     * @constructor
     * @param {LoginAdministratorUseCase} loginAdministratorUseCase
     */
    constructor (loginAdministratorUseCase: LoginAdministratorUseCase) {
        this.loginAdministratorUseCase = loginAdministratorUseCase;
    }
    
    /**
     * Manipulate method for make a login administrator
     * @date 6/6/2023 - 10:32:33 PM
     *
     * @public
     * @async
     * @param {Request} request
     * @param {Response} response
     * @returns {unknown}
     */
    public async handle(request: Request, response: Response){

        const { email, senha } = request.body;
        
        const authenticateInfo = await this.loginAdministratorUseCase.execute(email, senha);
        
        return response.json({authenticateInfo});
    }
}

export { LoginAdministratorController };