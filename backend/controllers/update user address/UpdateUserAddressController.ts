//Most of the variables and some of the text used to document this file were auto-generated using {@link https://marketplace.visualstudio.com/items?itemName=crystal-spider.jsdoc-generator JSDoc Generator by Crystal Spider}

import { Request, Response } from "express"; //Import of the Request and Response submodules of the express module (https://www.npmjs.com/package/express)
import { UpdateUserAddressUseCase } from "./UpdateUserAddressUseCase"; //Import of the UpdateUserAddressUseCase class

/**
 * Class for controlling the update of user addresses
 * @date 5/27/2023 - 9:10:44 PM
 *
 * @class UpdateUserAddressController
 * @typedef {UpdateUserAddressController}
 */
class UpdateUserAddressController {

    /**
     * Declares an instance of {@link UpdateUserAddressUseCase}
     * @date 5/27/2023 - 9:10:44 PM
     *
     * @public Marks this instance as having "public" visibility
     * @type {UpdateUserAddressUseCase}
     */
    public updateUserAddressUseCase: UpdateUserAddressUseCase;

    /**
     * Constructor for instances of {@link UpdateUserAddressUseCase}
     * @date 5/27/2023 - 9:10:44 PM
     *
     * @constructor Marks this part of the code as a constructor
     * @public Marks this constructor as having "public" visibility
     * @param {UpdateUserAddressUseCase} updateUserAddressUseCase
     */
    public constructor (updateUserAddressUseCase: UpdateUserAddressUseCase) {
        this.updateUserAddressUseCase = updateUserAddressUseCase;
    }
    
    /**
     * Method for requesting the update of the address of an user and forwarding the response received from such a request
     * @date 5/27/2023 - 9:10:44 PM
     *
     * @public Marks this method as having "public" visibility
     * @async Marks this method as being asynchronous
     * @param {Request} request Request object
     * @param {Response} response Response object
     * @returns {string} Real meaning of the response received from the update methods
     */
    public async handle (request: Request, response: Response) {

        const { cpf, tipo } = request.user; //Obtaining token info
        const { cep, cidade, estado, bairro, rua, numero } = request.body; //Obtaining json form info

        //Executes the user address update request
        await this.updateUserAddressUseCase.execute(tipo, cpf, cep, cidade, estado, bairro, rua, numero);
        return response.status(200).json({message: "O endereço do usuário foi modificado com sucesso."});
    }

}

export { UpdateUserAddressController } //Class export declarator