import { CreateEventUseCase } from "./CreateEventUseCase";
import { Request, Response } from "express";

class CreateEventController {

    private createEventUseCase: CreateEventUseCase;

    public constructor (createEventUseCase: CreateEventUseCase) {

        this.createEventUseCase = createEventUseCase;

    }

    public async handle (request: Request, response: Response) {
        
        const {nome, descricao, status, quantPista, quantStage, quantVip, valorPista, valorStage, valorVip} = request.body;

        await this.createEventUseCase.execute(nome, descricao, status, quantPista, quantStage, quantVip, valorPista, valorStage, valorVip);

        return response.status(201).json({message: "Evento criado com sucessso!"});
    }
}

export { CreateEventController };