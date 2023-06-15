//Most of the variables and some of the text used to document this file were auto-generated using {@link https://marketplace.visualstudio.com/items?itemName=crystal-spider.jsdoc-generator JSDoc Generator by Crystal Spider}

import { Request, Response } from "express"; //Import of the Request and Response submodules of the express module (https://www.npmjs.com/package/express)
import { UpdateUserEmailUseCase } from "./UpdateUserEmailUseCase"; //Import of the UpdateUserEmailUseCase class

export interface UserRequest extends Request {
    user: any
}

/**
 * Class for executing the update of user emails
 * This is a test class created to use an extended version of express' 'Request' object, needed to run jest unit tests, as jest doesn't recognize custom typings in ".d.ts" files.
 * It is otherwise IDENTICAL to its Controller class
 * @date 6/21/2023 - 9:12:50 PM
 *
 * @class UpdateUserEmailController
 * @typedef {UpdateUserEmailController}
 */
class UpdateUserEmailController {

    /**
     * Declares an instance of {@link UpdateUserEmailUseCase}
     * @date 5/28/2023 - 4:10:10 AM
     *
     * @public Marks this instance as having "public" visibility
     * @type {UpdateUserEmailUseCase}
     */
    public updateUserEmailUseCase: UpdateUserEmailUseCase;

    /**
     * Constructor for instances of {@link UpdateUserEmailUseCase}
     * @date 5/28/2023 - 4:10:10 AM
     *
     * @constructor Marks this part of the code as a constructor
     * @public Marks this constructor as having "public" visibility
     * @param {UpdateUserEmailUseCase} updateUserEmailUseCase
     */
    public constructor (updateUserEmailUseCase: UpdateUserEmailUseCase) {
        this.updateUserEmailUseCase = updateUserEmailUseCase;
    }
    
    /**
     * Method for requesting the update of the email of an user and forwarding the response received from such a request
     * @date 6/21/2023 - 9:12:50 PM
     *
     * @public Marks this method as having "public" visibility
     * @async Marks this method as being asynchronous
     * @param {UserRequest} request Request object
     * @param {Response} response Response object
     * @returns {string} Real meaning of the response received from the update methods
     */
    public async handle (request: UserRequest, response: Response) {

        const { cpf, tipo } = request.user; //Obtaining token info
        const { passwordAuth, newEmail, newEmailConfirmation } = request.body; //Obtaining json form info

        //Executes the user address update request
        await this.updateUserEmailUseCase.execute(tipo, cpf, passwordAuth, newEmail, newEmailConfirmation);
        return response.status(200).json({message: "O senha do usuário foi modificada com sucesso."});
    }

}

export { UpdateUserEmailController } //Class export declarator