import { Request, Response } from "express";
import { UpdateUserEmailUseCase } from "./UpdateUserEmailUseCase";

class UpdateUserEmailController {

    public updateUserEmailUseCase: UpdateUserEmailUseCase;

    public constructor (updateUserEmailUseCase: UpdateUserEmailUseCase) {
        this.updateUserEmailUseCase = updateUserEmailUseCase;
    }
    
    public async handle (request: Request, response: Response) {

        const { cpf, tipo } = request.user;
        const { passwordAuth, newEmail, newEmailConfirmation } = request.body;

        await this.updateUserEmailUseCase.execute(tipo, cpf, passwordAuth, newEmail, newEmailConfirmation);
        return response.status(204).send();
    }

}

export { UpdateUserEmailController }