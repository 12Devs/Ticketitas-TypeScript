import { Request, Response } from "express";
import { UpdateUserCpfUseCase } from "./UpdateUserCpfUseCase";

/**
 * Update user cpf controller class
 * @date 6/6/2023 - 10:43:39 PM
 *
 * @class UpdateUserCpfController
 * @typedef {UpdateUserCpfController}
 */
class UpdateUserCpfController {
    
    /**
     * Creates an instance of {@link UpdateUserCpfController}.
     * @date 6/6/2023 - 10:43:43 PM
     *
     * @public
     * @type {UpdateUserCpfUseCase}
     */
    public updateUserCpfUseCase: UpdateUserCpfUseCase;
    
    /**
     * Creates an instance of UpdateUserCpfController.
     * @date 6/6/2023 - 10:43:47 PM
     *
     * @constructor
     * @public
     * @param {UpdateUserCpfUseCase} updateUserCpfUseCase
     */
    public constructor (updateUserCpfUseCase: UpdateUserCpfUseCase) {
        this.updateUserCpfUseCase = updateUserCpfUseCase;
    }
    
    /**
     * Manipulate method for make a update user cpf
     * @date 6/6/2023 - 10:43:51 PM
     *
     * @public
     * @async
     * @param {Request} request
     * @param {Response} response
     * @returns {unknown}
     */
    public async handle (request: Request, response: Response) {

        const { cpf, tipo } = request.user;
        const { newCpf } = request.body;

        await this.updateUserCpfUseCase.execute(tipo, cpf, newCpf);
        return response.status(202).json({message: "O número de cpf do usuário foi modificado com sucesso."});
    }

}

export { UpdateUserCpfController }