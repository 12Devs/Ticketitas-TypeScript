import { Request, Response } from "express";
import { LoginPromoterUseCase } from "./LoginPromoterUseCase";

/**
 * Login promoter controller class
 * @date 6/6/2023 - 10:33:46 PM
 *
 * @class LoginPromoterController
 * @typedef {LoginPromoterController}
 */
class LoginPromoterController {
    
    /**
     * Creates an instance of {@link LoginPromoterController}.
     * @date 6/6/2023 - 10:33:51 PM
     *
     * @private
     * @type {LoginPromoterUseCase}
     */
    private loginPromoterUseCase: LoginPromoterUseCase;
    
    /**
     * Creates an instance of LoginPromoterController.
     * @date 6/6/2023 - 10:33:56 PM
     *
     * @constructor
     * @param {LoginPromoterUseCase} loginPromoterUseCase
     */
    constructor (loginPromoterUseCase: LoginPromoterUseCase) {
        this.loginPromoterUseCase = loginPromoterUseCase;
    }
    
    /**
     * Manipulate method for make a login promoter
     * @date 6/6/2023 - 10:34:00 PM
     *
     * @public
     * @async
     * @param {Request} request
     * @param {Response} response
     * @returns {unknown}
     */
    public async handle(request: Request, response: Response){

        const { email, senha } = request.body;
        const authenticateInfo = await this.loginPromoterUseCase.execute(email, senha);
        
        return response.json({authenticateInfo});
    }
}

export { LoginPromoterController };