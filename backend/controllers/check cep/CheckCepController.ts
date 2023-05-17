import { CheckCepUseCase } from "./CheckCepUseCase";
import { Request, Response } from "express";

class CheckCepController {

    private checkCepUseCase: CheckCepUseCase;

    constructor (checkCepUseCase: CheckCepUseCase) {
        this.checkCepUseCase = checkCepUseCase;
    }

    public async handle (request: Request, response: Response){

        const { cep }: any = request.params;
        
        const enderecoViaCep = await this.checkCepUseCase.execute(cep);
        return response.status(200).json(enderecoViaCep);
        
    }

}

export { CheckCepController };