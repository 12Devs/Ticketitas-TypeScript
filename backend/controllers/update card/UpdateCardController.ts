import { UpdateCardUseCase } from "./UpdateCardUseCase";
import { Request, Response } from "express";

class UpdateCardController {

    private creatCardUseCase: UpdateCardUseCase;

    public constructor (creatCardUseCase: UpdateCardUseCase) {
        this.creatCardUseCase = creatCardUseCase;
    }

    public async handle (request: Request, response: Response){

        const { cpf, cardNumber, holder, monthExpirationDate, yearExpirationDate, cvv } = request.body;
        await this.creatCardUseCase.execute(cpf, cardNumber, holder, monthExpirationDate, yearExpirationDate, cvv);
        return response.status(201).json({message: "Cartão atualizado com sucessso!"});
    }
}

export { UpdateCardController };