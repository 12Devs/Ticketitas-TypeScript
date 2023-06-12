//Most of the variables and some of the text used to document this file were auto-generated using {@link https://marketplace.visualstudio.com/items?itemName=crystal-spider.jsdoc-generator JSDoc Generator by Crystal Spider}

import { Request, Response } from "express"; //Import of the Request and Response submodules of the express module (https://www.npmjs.com/package/express)
import { UpdateUserNameUseCase } from "./UpdateUserNameUseCase"; //Import of the UpdateUserAddressUseCase class

/**
 * Class for controlling the update of user names
 * @date 5/28/2023 - 3:28:41 AM
 *
 * @class UpdateUserNameController
 * @typedef {UpdateUserNameController}
 */
class UpdateUserNameController {

    /**
     * Declares an instance of {@link UpdateUserNameUseCase}
     * @date 5/28/2023 - 3:28:41 AM
     *
     * @public Marks this instance as having "public" visibility
     * @type {UpdateUserNameUseCase}
     */
    public updateUserNameUseCase: UpdateUserNameUseCase;

    /**
     * Constructor for instances of {@link UpdateUserNameUseCase}
     * @date 5/28/2023 - 3:28:41 AM
     *
     * @constructor Marks this part of the code as a constructor
     * @public Marks this constructor as having "public" visibility
     * @param {UpdateUserNameUseCase} updateUserNameUseCase
     */
    public constructor (updateUserNameUseCase: UpdateUserNameUseCase) {
        this.updateUserNameUseCase = updateUserNameUseCase;
    }
    
    /**
     * Method for requesting the update of the name of an user and forwarding the response received from such a request
     * @date 5/28/2023 - 3:28:41 AM
     *
     * @public Marks this method as having "public" visibility
     * @async Marks this method as being asynchronous
     * @param {Request} request Request object
     * @param {Response} response Response object
     * @returns {string} Real meaning of the response received from the update methods
     */
    public async handle (request: Request, response: Response) {

        const { cpf, tipo } = request.user; //Obtaining token info
        const { newName } = request.body; //Obtaining json form info

        //Executes the user name update request
        await this.updateUserNameUseCase.execute(tipo, cpf, newName);
        return response.status(202).json({message: "O nome do usuário foi modificado com sucesso."});
    }

}

export { UpdateUserNameController } //Class export declarator