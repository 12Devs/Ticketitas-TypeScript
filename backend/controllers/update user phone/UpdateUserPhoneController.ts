import { Request, Response } from "express";
import { UpdateUserPhoneUseCase } from "./UpdateUserPhoneUseCase";

class UpdateUserPhoneController {

    public updateUserPhoneUseCase: UpdateUserPhoneUseCase;

    public constructor (updateUserPhoneUseCase: UpdateUserPhoneUseCase) {
        this.updateUserPhoneUseCase = updateUserPhoneUseCase;
    }
    
    public async handle (request: Request, response: Response) {

        const { cpf, tipo } = request.user;
        const { newPhone } = request.body;

        await this.updateUserPhoneUseCase.execute(tipo, cpf, newPhone);
        return response.status(204).send();
    }

}

export { UpdateUserPhoneController }