import { CreateAdmUseCase } from "./CreateAdmUseCase";
import { Request, Response } from "express";

class CreateAdmController {


    private createAdmUseCase: CreateAdmUseCase;

    constructor (createAdmUseCase: CreateAdmUseCase) {
        this.createAdmUseCase = createAdmUseCase;
    }


    public async handle (request: Request, response: Response){

        const { nome, cpf, email, telefone, senha} = request.body;
        await this.createAdmUseCase.execute(nome, cpf, email, telefone, senha);
        return response.status(201).json({message: "adm criado com sucessso!"});
        
    }


}
export { CreateAdmController };