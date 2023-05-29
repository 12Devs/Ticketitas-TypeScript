//Most of the variables and some of the text used to document this file were auto-generated using {@link https://marketplace.visualstudio.com/items?itemName=crystal-spider.jsdoc-generator JSDoc Generator by Crystal Spider}

//Import of the ChangePasswordAdministratorUseCase class
import { ChangePasswordAdministratorUseCase as ChangePasswordAdministratorUseCase} from "./ChangePasswordAdministratorUseCase";

import { Request, Response } from "express"; //Import of the Request and Response submodules of the express module (https://www.npmjs.com/package/express)

/**
 * Class for controlling the sending of emails with which an user can change their password
 * @date 5/12/2023 - 5:08:52 PM
 *
 * @class ChangePasswordAdministratorController
 * @typedef {ChangePasswordAdministratorController}
 */
class ChangePasswordAdministratorController {

    /**
     * Creates an instance of {@link ChangePasswordAdministratorUseCase}
     * @date 5/12/2023 - 5:08:52 PM
     *
     * @private Marks this instance as having "private" visibility
     * @type {ChangePasswordAdministratorUseCase}
     */
    private changePasswordAdministratorUseCase: ChangePasswordAdministratorUseCase;
    
    /**
     * Creates an instance of ChangePasswordAdministratorController.
     * @date 5/12/2023 - 5:08:52 PM
     *
     * @constructor Marks this part of the code as a constructor
     * @param {ChangePasswordAdministratorUseCase} changePasswordAdministratorUseCase Private instance of the ChangePasswordAdministratorUseCase class
     */
    constructor (changePasswordAdministratorUseCase: ChangePasswordAdministratorUseCase) {
        this.changePasswordAdministratorUseCase = changePasswordAdministratorUseCase;
    }

    /**
     * Method for requesting the sending of the email containing the link with which an administrator can change their password
     * @date 5/12/2023 - 5:08:52 PM
     *
     * @public Marks this method as having "public" visibility
     * @async Marks this method as being asynchronous
     * @param {Request} request Request object
     * @param {Response} response Response object
     * @returns {string} Real meaning of the response received from the email sending methods
     */
    public async handle (request: Request, response: Response){

        const { email } = request.body; //Obtaining json form info
        
        //Executes the administrator remote password update request
        const resetPasswordInfo = await this.changePasswordAdministratorUseCase.execute(email);
        return response.status(201).json({resetPasswordInfo})
        
    }
}

export { ChangePasswordAdministratorController }; //Class export declarator