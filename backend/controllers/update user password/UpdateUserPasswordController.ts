//Most of the variables and some of the text used to document this file were auto-generated using {@link https://marketplace.visualstudio.com/items?itemName=crystal-spider.jsdoc-generator JSDoc Generator by Crystal Spider}

import { Request, Response } from "express"; //Import of the Request and Response submodules of the express module (https://www.npmjs.com/package/express)
import { UpdateUserPasswordUseCase } from "./UpdateUserPasswordUseCase"; //Import of the UpdateUserPasswordUseCase class

/**
 * Class for executing the update of user passwords
 * @date 5/28/2023 - 4:10:10 AM
 *
 * @class UpdateUserPasswordController
 * @typedef {UpdateUserPasswordController}
 */
class UpdateUserPasswordController {

    /**
     * Declares an instance of {@link UpdateUserPasswordUseCase}
     * @date 5/28/2023 - 4:10:10 AM
     *
     * @public Marks this instance as having "public" visibility
     * @type {UpdateUserPasswordUseCase}
     */
    public updateUserPasswordUseCase: UpdateUserPasswordUseCase;

    /**
     * Constructor for instances of {@link UpdateUserPasswordUseCase}
     * @date 5/28/2023 - 4:10:10 AM
     *
     * @constructor Marks this part of the code as a constructor
     * @public Marks this constructor as having "public" visibility
     * @param {UpdateUserPasswordUseCase} updateUserPasswordUseCase
     */
    public constructor (updateUserPasswordUseCase: UpdateUserPasswordUseCase) {
        this.updateUserPasswordUseCase = updateUserPasswordUseCase;
    }
    
    /**
     * Method for requesting the update of the password of an user and forwarding the response received from such a request
     * @date 5/28/2023 - 4:10:10 AM
     *
     * @public Marks this method as having "public" visibility
     * @async Marks this method as being asynchronous
     * @param {Request} request Request object
     * @param {Response} response Response object
     * @returns {string} Real meaning of the response received from the update methods
     */
    public async handle (request: Request, response: Response) {

        const { cpf, tipo } = request.user; //Obtaining token info
        const { passwordAuth, newPassword, newPasswordConfirmation } = request.body; //Obtaining json form info

        //Executes the user address update request
        await this.updateUserPasswordUseCase.execute(tipo, cpf, passwordAuth, newPassword, newPasswordConfirmation);
        return response.status(204).send();
    }

}

export { UpdateUserPasswordController } //Class export declarator