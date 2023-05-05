import { CreateAdministratorUseCase as CreateAdministratorUseCase } from "./CreateAdministratorUseCase";
import { Request, Response } from "express";


class CreateAdministratorController {

    private createAdministradorUseCase: CreateAdministratorUseCase;

    constructor (createAdministradorUseCase: CreateAdministratorUseCase) {
        this.createAdministradorUseCase = createAdministradorUseCase;
    }

    public async handle (request: Request, response: Response){

        const { nome, cpf, email, telefone } = request.body;
        const { cep, cidade, estado, bairro, rua, numero } = request.body;
        await this.createAdministradorUseCase.execute(nome, cpf, email, telefone, cep, cidade, estado, bairro, rua, numero);
        return response.status(201).json({message: "Admin criado com sucessso!"})
        
    }

}

export { CreateAdministratorController };