import { Request, Response } from "express";
import { LoginClientUseCase } from "./LoginClientUseCase";

/**
 * Login client controller class
 * @date 6/6/2023 - 10:33:09 PM
 *
 * @class LoginClientController
 * @typedef {LoginClientController}
 */
class LoginClientController {
    
    /**
     * Creates an instance of {@link LoginClientController}.
     * @date 6/6/2023 - 10:33:13 PM
     *
     * @private
     * @type {LoginClientUseCase}
     */
    private loginClientUseCase: LoginClientUseCase;
    constructor (loginClientUseCase: LoginClientUseCase) {
        this.loginClientUseCase = loginClientUseCase;
    }
    
    /**
     * Manipulate method for make a login client
     * @date 6/6/2023 - 10:33:18 PM
     *
     * @public
     * @async
     * @param {Request} request
     * @param {Response} response
     * @returns {unknown}
     */
    public async handle(request: Request, response: Response){

        const { email, senha } = request.body;
        const authenticateInfo = await this.loginClientUseCase.execute(email, senha);
        
        return response.json({authenticateInfo});
    }
}

export { LoginClientController };