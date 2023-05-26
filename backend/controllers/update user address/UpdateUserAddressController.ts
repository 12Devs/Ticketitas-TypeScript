import { Request, Response } from "express";
import { UpdateUserAddressUseCase } from "./UpdateUserAddressUseCase";

class UpdateUserAddressController {

    public updateUserAddressUseCase: UpdateUserAddressUseCase;

    public constructor (updateUserAddressUseCase: UpdateUserAddressUseCase) {
        this.updateUserAddressUseCase = updateUserAddressUseCase;
    }
    
    public async handle (request: Request, response: Response) {

        const { cpf, tipo } = request.user;
        const { cep, cidade, estado, bairro, rua, numero } = request.body;

        await this.updateUserAddressUseCase.execute(tipo, cpf, cep, cidade, estado, bairro, rua, numero);
        return response.status(204).send();
    }

}

export { UpdateUserAddressController }