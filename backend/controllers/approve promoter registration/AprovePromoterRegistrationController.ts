import { AprovePromoterRegistrationUseCase } from "./AprovePromoterRegistrationUseCase";
import { Request, Response } from "express";

class AprovePromoterRegistrationController {

    private aprovePromoterRegistrationUseCase: AprovePromoterRegistrationUseCase;

    public constructor (aprovePromoterRegistrationUseCase: AprovePromoterRegistrationUseCase) {
        this.aprovePromoterRegistrationUseCase = aprovePromoterRegistrationUseCase;
    }

    public async handle (request: Request, response: Response) {
        const { promoterCpf }: any = request.params;

        console.log("AQUII: ", promoterCpf)
        await this.aprovePromoterRegistrationUseCase.execute(promoterCpf);

        return response.status(204).send();
    }
}

export { AprovePromoterRegistrationController };