import { CreateClientUseCase } from "./CreateClientUseCase";
import { Request, Response } from "express";


/**
 * Create client controller class
 * @date 6/6/2023 - 5:58:57 PM
 *
 * @class CreateClientController
 * @typedef {CreateClientController}
 */
class CreateClientController {
    
    /**
     * Creates an instances of {@link CreateClientController}
     * @date 6/6/2023 - 5:59:24 PM
     *
     * @private Marks this instance as having "private" visibility
     * @type {CreateClientUseCase}
     */
    private createClienteUseCase: CreateClientUseCase;

    
    /**
     * Creates an instance of CreateClientController.
     * @date 6/6/2023 - 6:03:47 PM
     *
     * @constructor
     * @param {CreateClientUseCase} createClienteUseCase
     */
    constructor (createClienteUseCase: CreateClientUseCase) {
        this.createClienteUseCase = createClienteUseCase;
    }

    
    /**
     * Manipulate the requisition for create a client
     * @date 6/6/2023 - 6:03:56 PM
     *
     * @public Marks this method as having "public" visibility
     * @async Marks this method as being asynchronous
     * @param {Request} request
     * @param {Response} response
     * @returns {unknown}
     */
    public async handle (request: Request, response: Response){

        const { nome, cpf, email, telefone, senha, confirmacaoSenha } = request.body;
        const { cep, cidade, estado, bairro, rua, numero } = request.body;
        const createInfo = await this.createClienteUseCase.execute(nome, cpf, email, telefone, senha, confirmacaoSenha, cep, cidade, estado, bairro, rua, numero);
        return response.status(201).json({createInfo});
        
    }

}

export { CreateClientController };