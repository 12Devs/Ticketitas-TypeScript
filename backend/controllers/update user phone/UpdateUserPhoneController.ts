//Most of the variables and some of the text used to document this file were auto-generated using {@link https://marketplace.visualstudio.com/items?itemName=crystal-spider.jsdoc-generator JSDoc Generator by Crystal Spider}

import { Request, Response } from "express"; //Import of the Request and Response submodules of the express module (https://www.npmjs.com/package/express)
import { UpdateUserPhoneUseCase } from "./UpdateUserPhoneUseCase"; //Import of the UpdateUserAddressUseCase class

/**
 * Class for controlling the update of user phone numbers
 * @date 5/28/2023 - 3:47:02 AM
 *
 * @class UpdateUserPhoneController
 * @typedef {UpdateUserPhoneController}
 */
class UpdateUserPhoneController {

    /**
     * Declares an instance of {@link UpdateUserPhoneUseCase}
     * @date 5/28/2023 - 3:47:02 AM
     *
     * @public Marks this instance as having "public" visibility
     * @type {UpdateUserPhoneUseCase}
     */
    public updateUserPhoneUseCase: UpdateUserPhoneUseCase;

    /**
     * Constructor for instances of {@link UpdateUserPhoneUseCase}
     * @date 5/28/2023 - 3:47:02 AM
     *
     * @constructor Marks this part of the code as a constructor
     * @public Marks this constructor as having "public" visibility
     * @param {UpdateUserPhoneUseCase} updateUserPhoneUseCase
     */
    public constructor (updateUserPhoneUseCase: UpdateUserPhoneUseCase) {
        this.updateUserPhoneUseCase = updateUserPhoneUseCase;
    }
    
    /**
     * Method for requesting the update of the phone number of an user and forwarding the response received from such a request
     * @date 5/28/2023 - 3:47:02 AM
     *
     * @public Marks this method as having "public" visibility
     * @async Marks this method as being asynchronous
     * @param {Request} request Request object
     * @param {Response} response Response object
     * @returns {string} Real meaning of the response received from the update methods
     */
    public async handle (request: Request, response: Response) {

        const { cpf, tipo } = request.user; //Obtaining token info
        const { newPhone } = request.body; //Obtaining json form info

        //Executes the user phone number update request
        await this.updateUserPhoneUseCase.execute(tipo, cpf, newPhone);
        return response.status(202).json({message: "O número de telefone do usuário foi modificado com sucesso."});
    }

}

export { UpdateUserPhoneController } //Class export declarator