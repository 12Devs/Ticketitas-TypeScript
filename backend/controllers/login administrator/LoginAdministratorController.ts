//Most of the variables and some of the text used to document this file were auto-generated using {@link https://marketplace.visualstudio.com/items?itemName=crystal-spider.jsdoc-generator JSDoc Generator by Crystal Spider}

/**
 * Import of the Request and Response submodules of the {@link https://www.npmjs.com/package/express express} module
 */
import { Request, Response } from "express";
/**
 * Import of the class {@link CreateUserToken}
 */
import { createUserToken } from "../../middlewares/CreateUserToken";
/**
 * Import of the class {@link LoginAdministratorUseCase}
 */
import { LoginAdministratorUseCase } from "./LoginAdministratorUseCase";

/**
 * Class for controlling the authentication of an administrator type of user
 * @date 5/8/2023 - 8:48:17 PM
 *
 * @class LoginAdministratorController
 * @typedef {LoginAdministratorController}
 */
class LoginAdministratorController {

    /**
     * Description placeholder
     * @date 5/8/2023 - 8:48:17 PM
     *
     * @private
     * @type {LoginAdministratorUseCase}
     */
    private loginAdministratorUseCase: LoginAdministratorUseCase;
    
    /**
     * Creates an instance of LoginAdministratorController
     * @date 5/8/2023 - 8:48:17 PM
     *
     * @constructor Marks this part of the code as a constructor
     * @param {LoginAdministratorUseCase} loginAdministratorUseCase Private instance of the LoginAdministratorUseCase class
     */
    constructor (loginAdministratorUseCase: LoginAdministratorUseCase) {
        this.loginAdministratorUseCase = loginAdministratorUseCase;
    }

    /**
     * Method for requesting the authentication of an administrator type of user
     * @date 5/8/2023 - 8:48:17 PM
     *
     * @public Marks this method as having "public" visibility
     * @async Marks this method as being asynchronous
     * @param {Request} request Request object
     * @param {Response} response Response object
     * @returns {*}
     */
    public async handle(request: Request, response: Response){

        const { email, senha } = request.body;
        await this.loginAdministratorUseCase.execute(email, senha).then((administrator)=>{
            console.log(administrator)
            createUserToken(administrator, request, response);
        });
        
    }
}

//Class export declarator
export { LoginAdministratorController };