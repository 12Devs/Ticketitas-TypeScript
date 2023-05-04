import { CreateClientUseCase } from "./CreateClientUseCase";
import { Request, Response } from "express";


class CreateClientController {

    private createClienteUseCase: CreateClientUseCase;

    constructor (createClienteUseCase: CreateClientUseCase) {
        this.createClienteUseCase = createClienteUseCase;
    }

    public async handle (request: Request, response: Response){

        const { nome, cpf, email, telefone, senha, confirmacaoSenha } = request.body;
        const { cep, cidade, estado, bairro, rua, numero } = request.body;
        await this.createClienteUseCase.execute(nome, cpf, email, telefone, senha, confirmacaoSenha, cep, cidade, estado, bairro, rua, numero);
        return response.status(201).json({message: "Client criado com sucessso!"})
        
    }

}

export { CreateClientController };