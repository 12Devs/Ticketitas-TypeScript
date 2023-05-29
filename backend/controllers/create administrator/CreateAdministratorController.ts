//Most of the variables and some of the text used to document this file were auto-generated using {@link https://marketplace.visualstudio.com/items?itemName=crystal-spider.jsdoc-generator JSDoc Generator by Crystal Spider}

/**
 * Import of the class {@link CreateAdministratorUseCase}
 */
import { CreateAdministratorUseCase as CreateAdministratorUseCase } from "./CreateAdministratorUseCase";
/**
 * Import of the Request and Response submodules of the {@link https://www.npmjs.com/package/express express} module
 */
import { Request, Response } from "express";

/**
 * Class for controlling the creation of an administrator type of user
 * @date 5/8/2023 - 4:56:44 PM
 * 
 * @typedef {CreateAdministratorController}
 */
class CreateAdministratorController {

    /**
     * Creates an instance of {@link CreateAdministratorUseCase}
     * @date 5/8/2023 - 4:56:44 PM
     *
     * @private Marks this instance as having "private" visility
     * @type {CreateAdministratorUseCase}
     */
    private createAdministratorUseCase: CreateAdministratorUseCase;

    /**
     * Constructor for instances of {@link CreateAdministratorController}
     * @date 5/8/2023 - 4:56:44 PM
     *
     * @constructor Marks this part of the code as a constructor
     * @param {CreateAdministratorUseCase} createAdministratorUseCase Private instance of the CreateAdministratorUseCase class
     */
    constructor (createAdministratorUseCase: CreateAdministratorUseCase) {
        this.createAdministratorUseCase = createAdministratorUseCase;
    }

    /**
     * Method for requesting the creation of an administrator and forwarding the response received from such a request
     * @date 5/8/2023 - 4:56:43 PM
     *
     * @public Marks this method as having "public" visibility
     * @async Marks this method as being asynchronous
     * @param {Request} request Request object
     * @param {Response} response Response object
     * @returns {string} Real meaning of the response received from the creation methods
     */
    public async handle (request: Request, response: Response){

        const { cpf, tipo } = request.user;
        const { name, newAdminCpf, email, phone } = request.body;
        const createInfo = await this.createAdministratorUseCase.execute(name, newAdminCpf, email, phone, cpf, tipo);
        return response.status(201).json({createInfo})
        
    }

}

//Class export declarator
export { CreateAdministratorController };