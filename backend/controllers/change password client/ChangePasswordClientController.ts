//Most of the variables and some of the text used to document this file were auto-generated using {@link https://marketplace.visualstudio.com/items?itemName=crystal-spider.jsdoc-generator JSDoc Generator by Crystal Spider}

//Import of the ChangePasswordClientUseCase class
import { ChangePasswordClientUseCase as ChangePasswordClientUseCase} from "./ChangePasswordClientUseCase";

import { Request, Response } from "express"; //Import of the Request and Response submodules of the express module (https://www.npmjs.com/package/express)

/**
 * Class for controlling the sending of emails with which an user can change their password
 * @date 5/12/2023 - 5:08:52 PM
 *
 * @class ChangePasswordClientController
 * @typedef {ChangePasswordClientController}
 */
class ChangePasswordClientController {

    /**
     * Creates an instance of {@link ChangePasswordClientUseCase}
     * @date 5/12/2023 - 5:08:52 PM
     *
     * @private Marks this instance as having "private" visibility
     * @type {ChangePasswordClientUseCase}
     */
    private changePasswordClientUseCase: ChangePasswordClientUseCase;
    
    /**
     * Creates an instance of ChangePasswordClientController.
     * @date 5/12/2023 - 5:08:52 PM
     *
     * @constructor Marks this part of the code as a constructor
     * @param {ChangePasswordClientUseCase} changePasswordClientUseCase Private instance of the ChangePasswordClientUseCase class
     */
    constructor (changePasswordClientUseCase: ChangePasswordClientUseCase) {
        this.changePasswordClientUseCase = changePasswordClientUseCase;
    }

    /**
     * Method for requesting the sending of the email containing the link with which an client can change their password
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
        await this.changePasswordClientUseCase.execute(email);
        return response.status(201).json({message: "O link de recuperacao foi enviado ao e-mail do usuario cadastrado!"})
        
    }
}

export { ChangePasswordClientController }; //Class export declarator