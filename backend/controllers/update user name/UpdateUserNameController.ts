import { Request, Response } from "express";
import { UpdateUserNameUseCase } from "./UpdateUserNameUseCase";

class UpdateUserNameController {

    public updateUserNameUseCase: UpdateUserNameUseCase;

    public constructor (updateUserNameUseCase: UpdateUserNameUseCase) {
        this.updateUserNameUseCase = updateUserNameUseCase;
    }
    
    public async handle (request: Request, response: Response) {

        const { cpf, tipo } = request.user;
        const { newName } = request.body;

        await this.updateUserNameUseCase.execute(tipo, cpf, newName);
        return response.status(204).send();
    }

}

export { UpdateUserNameController }