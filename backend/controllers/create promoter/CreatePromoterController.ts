import { CreatePromoterUseCase } from "./CreatePromoterUseCase";
import { Request, Response } from "express";


/**
 * Create promoter controller class
 * @date 6/6/2023 - 10:15:09 PM
 *
 * @class CreatePromoterController
 * @typedef {CreatePromoterController}
 */
class CreatePromoterController {
    
    /**
     * Creates an instance of {@link CreatePromoterController}.
     * @date 6/6/2023 - 10:15:23 PM
     *
     * @private
     * @type {CreatePromoterUseCase}
     */
    private createPromoterUseCase: CreatePromoterUseCase;

    
    /**
     * Creates an instance of CreatePromoterController.
     * @date 6/6/2023 - 10:15:29 PM
     *
     * @constructor
     * @param {CreatePromoterUseCase} createPromoterUseCase
     */
    constructor (createPromoterUseCase: CreatePromoterUseCase) {
        this.createPromoterUseCase = createPromoterUseCase;
    }

    
    /**
     * Method for make a creation of a promoter
     * @date 6/6/2023 - 10:15:35 PM
     *
     * @public
     * @async
     * @param {Request} request
     * @param {Response} response
     * @returns {unknown}
     */
    public async handle (request: Request, response: Response){

        const { nome, cpf, email, telefone, senha, confirmacaoSenha } = request.body;
        const { cep, cidade, estado, bairro, rua, numero } = request.body;
        const createInfo = await this.createPromoterUseCase.execute(nome, cpf, email, telefone, senha, confirmacaoSenha, cep, cidade, estado, bairro, rua, numero);
        return response.status(201).json({createInfo});
        
    }

}

export { CreatePromoterController };