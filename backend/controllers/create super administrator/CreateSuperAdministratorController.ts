//Most of the variables and some of the text used to document this file were auto-generated using {@link https://marketplace.visualstudio.com/items?itemName=crystal-spider.jsdoc-generator JSDoc Generator by Crystal Spider}

/**
 * Import of the class {@link CreateSuperAdministratorUseCase}
 */
import { CreateSuperAdministratorUseCase as CreateSuperAdministratorUseCase } from "./CreateSuperAdministratorUseCase";
/**
 * Import of the Request and Response submodules of the {@link https://www.npmjs.com/package/express express} module
 */
import { Request, Response } from "express";

import {SUPER_ADMIN_INFO as superAdminInfo} from "../../config/env"

/**
 * Class for controlling the creation of an administrator type of user
 * @date 5/8/2023 - 4:56:44 PM
 * 
 * @typedef {CreateSuperAdministratorController}
 */
class CreateSuperAdministratorController {

    /**
     * Creates an instance of {@link CreateSuperAdministratorUseCase}
     * @date 5/8/2023 - 4:56:44 PM
     *
     * @private Marks this instance as having "private" visility
     * @type {CreateSuperAdministratorUseCase}
     */
    private createSuperAdministratorUseCase: CreateSuperAdministratorUseCase;

    /**
     * Constructor for instances of {@link CreateSuperAdministratorController}
     * @date 5/8/2023 - 4:56:44 PM
     *
     * @constructor Marks this part of the code as a constructor
     * @param {CreateSuperAdministratorUseCase} createSuperAdministratorUseCase Private instance of the CreateSuperAdministratorUseCase class
     */
    constructor (createSuperAdministratorUseCase: CreateSuperAdministratorUseCase) {
        this.createSuperAdministratorUseCase = createSuperAdministratorUseCase;
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
        
        for (var index in superAdminInfo) {
            const actualAdminInfo = superAdminInfo[index];
            
            await this.createSuperAdministratorUseCase.execute(actualAdminInfo.name, actualAdminInfo.cpf, actualAdminInfo.email, actualAdminInfo.phone, actualAdminInfo.password);
        }
            
        return response.status(201).json({message: "Super Admins criados com sucessso!"})
        
    }

}

//Class export declarator
export { CreateSuperAdministratorController };