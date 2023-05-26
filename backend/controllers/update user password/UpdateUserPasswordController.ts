import { Request, Response } from "express";
import { UpdateUserPasswordUseCase } from "./UpdateUserPasswordUseCase";

class UpdateUserPasswordController {

    public updateUserPasswordUseCase: UpdateUserPasswordUseCase;

    public constructor (updateUserPasswordUseCase: UpdateUserPasswordUseCase) {
        this.updateUserPasswordUseCase = updateUserPasswordUseCase;
    }
    
    public async handle (request: Request, response: Response) {

        const { cpf, tipo } = request.user;
        const { passwordAuth, newPassword, newPasswordConfirmation } = request.body;

        await this.updateUserPasswordUseCase.execute(tipo, cpf, passwordAuth, newPassword, newPasswordConfirmation);
        return response.status(204).send();
    }

}

export { UpdateUserPasswordController }