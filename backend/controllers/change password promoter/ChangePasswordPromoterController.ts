//Most of the variables and some of the text used to document this file were auto-generated using {@link https://marketplace.visualstudio.com/items?itemName=crystal-spider.jsdoc-generator JSDoc Generator by Crystal Spider}

//Import of the ChangePasswordAdministratorUseCase class
import { ChangePasswordPromoterUseCase as ChangePasswordPromoterUseCase} from "./ChangePasswordPromoterUseCase";

import { Request, Response } from "express"; //Import of the Request and Response submodules of the express module (https://www.npmjs.com/package/express)

/**
 * Class for controlling the sending of emails with which an user can change their password
 * @date 5/12/2023 - 5:08:52 PM
 *
 * @class ChangePasswordPromoterController
 * @typedef {ChangePasswordPromoterController}
 */
class ChangePasswordPromoterController {

    /**
     * Creates an instance of {@link ChangePasswordPromoterUseCase}
     * @date 5/12/2023 - 5:08:52 PM
     *
     * @private Marks this instance as having "private" visibility
     * @type {ChangePasswordPromoterUseCase}
     */
    private changePasswordPromoterUseCase: ChangePasswordPromoterUseCase;
    
    /**
     * Creates an instance of ChangePasswordPromoterController.
     * @date 5/12/2023 - 5:08:52 PM
     *
     * @constructor Marks this part of the code as a constructor
     * @param {ChangePasswordPromoterUseCase} changePasswordPromoterUseCase Private instance of the ChangePasswordPromoterUseCase class
     */
    constructor (changePasswordPromoterUseCase: ChangePasswordPromoterUseCase) {
        this.changePasswordPromoterUseCase = changePasswordPromoterUseCase;
    }

    /**
     * Method for requesting the sending of the email containing the link with which an promoter can change their password
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
        await this.changePasswordPromoterUseCase.execute(email);
        return response.status(201).json({message: "O link de recuperacao foi enviado ao e-mail do usuario cadastrado!"})
        
    }
}

export { ChangePasswordPromoterController }; //Class export declarator