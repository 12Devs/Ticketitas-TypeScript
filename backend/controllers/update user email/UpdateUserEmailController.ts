//Most of the variables and some of the text used to document this file were auto-generated using {@link https://marketplace.visualstudio.com/items?itemName=crystal-spider.jsdoc-generator JSDoc Generator by Crystal Spider}

import { Request, Response } from "express"; //Import of the Request and Response submodules of the express module (https://www.npmjs.com/package/express)
import { UpdateUserEmailUseCase } from "./UpdateUserEmailUseCase"; //Import of the UpdateUserEmailUseCase class

/**
 * Class for controlling the update of user emails
 * @date 5/28/2023 - 2:08:10 AM
 *
 * @class UpdateUserEmailController
 * @typedef {UpdateUserEmailController}
 */
class UpdateUserEmailController {

    /**
     * Declares an instance of {@link UpdateUserEmailUseCase}
     * @date 5/28/2023 - 2:09:54 AM
     *
     * @public Marks this instance as having "public" visibility
     * @type {UpdateUserEmailUseCase}
     */
    public updateUserEmailUseCase: UpdateUserEmailUseCase;

    /**
     * Constructor for instances of {@link UpdateUserEmailUseCase}
     * @date 5/28/2023 - 2:09:54 AM
     *
     * @constructor Marks this part of the code as a constructor
     * @public Marks this constructor as having "public" visibility
     * @param {UpdateUserEmailUseCase} updateUserEmailUseCase Instance of UpdateUserEmailUseCase
     */
    public constructor (updateUserEmailUseCase: UpdateUserEmailUseCase) {
        this.updateUserEmailUseCase = updateUserEmailUseCase;
    }
    
    /**
     * Method for requesting the update of the email of an user and forwarding the response received from such a request
     * @date 5/28/2023 - 2:09:54 AM
     *
     * @public Marks this method as having "public" visibility
     * @async Marks this method as being asynchronous
     * @param {Request} request Request object
     * @param {Response} response Response object
     * @returns {string} Real meaning of the response received from the update methods
     */
    public async handle (request: Request, response: Response) {

        const { cpf, tipo } = request.user; //Obtaining token info
        const { passwordAuth, newEmail, newEmailConfirmation } = request.body; //Obtaining json form info

        //Executes the user address update request
        await this.updateUserEmailUseCase.execute(tipo, cpf, passwordAuth, newEmail, newEmailConfirmation);
        return response.status(200).json({message: "O email do usuário foi modificado com sucesso."});
    }

}

export { UpdateUserEmailController } //Class export declarator