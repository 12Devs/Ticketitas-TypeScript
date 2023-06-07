//Most of the variables and some of the text used to document this file were auto-generated using {@link https://marketplace.visualstudio.com/items?itemName=crystal-spider.jsdoc-generator JSDoc Generator by Crystal Spider}

 //Import of the NewPasswordPromoterUseCase class
import { NewPasswordPromoterUseCase as NewPasswordPromoterUseCase} from "./NewPasswordPromoterUseCase";

import { Request, Response } from "express"; //Import of the Request and Response submodules of the express module (https://www.npmjs.com/package/express)

/**
 * Class for controlling the proccess of authenticating password new codes and changing the passwords
 * @date 05/17/2023 - 1:08:24 AM
 *
 * @class NewPasswordPromoterController
 * @typedef {NewPasswordPromoterController}
 */
class NewPasswordPromoterController {

    /**
     * Creates an instance of {@link NewPasswordPromoterUseCase}
     * @date 5/12/2023 - 5:08:52 PM
     *
     * @private Marks this instance as having "private" visibility
     * @type {NewPasswordPromoterUseCase}
     */
    private newPasswordPromoterUseCase: NewPasswordPromoterUseCase;
    
    /**
     * Creates an instance of NewPasswordPromoterController.
     * @date 5/12/2023 - 5:08:52 PM
     *
     * @constructor Marks this part of the code as a constructor
     * @param {NewPasswordPromoterUseCase} newPasswordPromoterUseCase Private instance of the NewPasswordPromoterUseCase class
     */
    constructor (newPasswordPromoterUseCase: NewPasswordPromoterUseCase) {
        this.newPasswordPromoterUseCase = newPasswordPromoterUseCase;
    }

    /**
     * Method for requesting the authentication of a password change code and the following change of password
     * @date 5/17/2023 - 1:10:04 AM
     *
     * @public Marks this method as having "public" visibility
     * @async Marks this method as being asynchronous
     * @param {Request} request Request object
     * @param {Response} response Response object
     * @returns {string} Real meaning of the response received from the email sending methods
     */
    public async handle (request: Request, response: Response){

        const { passwordChangeCode, newPassword, newPasswordConfirmation } = request.body;
        await this.newPasswordPromoterUseCase.execute(passwordChangeCode, newPassword, newPasswordConfirmation);
        return response.status(201).json({message: "A senha do usuário que recebu o código foi alterada com sucesso!"})
        
    }
}

export { NewPasswordPromoterController }; //Class export declarator