import { UpdateStatusPromoterUseCase } from "./UpdateStatusPromoterUseCase";
import { Request, Response } from "express";

class UpdateStatusPromoterController {

    private updateStatusPromoterUseCase: UpdateStatusPromoterUseCase;

    public constructor (updateStatusPromoterUseCase: UpdateStatusPromoterUseCase) {
        this.updateStatusPromoterUseCase = updateStatusPromoterUseCase;
    }

    public async handle (request: Request, response: Response) {
        const { cpf }: any = request.params;

        await this.updateStatusPromoterUseCase.execute(cpf);
        return response.status(204).send();
    }
}

export { UpdateStatusPromoterController };