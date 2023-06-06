import { Request, Response } from "express";
import { UpdateUserCpfUseCase } from "./UpdateUserCpfUseCase";

class UpdateUserCpfController {

    public updateUserCpfUseCase: UpdateUserCpfUseCase;

    public constructor (updateUserCpfUseCase: UpdateUserCpfUseCase) {
        this.updateUserCpfUseCase = updateUserCpfUseCase;
    }
    
    public async handle (request: Request, response: Response) {

        const { cpf, tipo } = request.user;
        const { newCpf } = request.body;

        await this.updateUserCpfUseCase.execute(tipo, cpf, newCpf);
        return response.status(204).send();
    }

}

export { UpdateUserCpfController }