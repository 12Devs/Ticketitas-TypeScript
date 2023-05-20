import { MakePurchaseUseCase } from "./MakePurchaseUseCase";
import { Request, Response } from "express";

class MakePurchaseController {

    private makePurchaseUseCase: MakePurchaseUseCase;

    public constructor (makePurchaseUseCase: MakePurchaseUseCase) {
        this.makePurchaseUseCase = makePurchaseUseCase
    }

    public async handle (request: Request, response: Response) {

        
        const {pistaAmount, stageAmount, vipAmount, clientCpf, eventId} = request.body;

        await this.makePurchaseUseCase.execute(pistaAmount, stageAmount, vipAmount, clientCpf, eventId);
        
        return response.status(201).json({message: "Venda efetuada com sucesso!"});
    }
    
}

export { MakePurchaseController };