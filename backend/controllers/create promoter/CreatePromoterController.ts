import { CreatePromoterUseCase } from "./CreatePromoterUseCase";
import { Request, Response } from "express";


class CreatePromoterController {

    private createPromoterUseCase: CreatePromoterUseCase;

    constructor (createPromoterUseCase: CreatePromoterUseCase) {
        this.createPromoterUseCase = createPromoterUseCase;
    }

    public async handle (request: Request, response: Response){

        const { nome, cpf, email, telefone, senha, confirmacaoSenha } = request.body;
        const { cep, cidade, estado, bairro, rua, numero } = request.body;
        await this.createPromoterUseCase.execute(nome, cpf, email, telefone, senha, confirmacaoSenha, cep, cidade, estado, bairro, rua, numero);
        return response.status(201).json({message: "Promoter criado com sucessso!"});
        
    }

}

export { CreatePromoterController };