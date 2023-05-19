import { CreateEventUseCase } from "./CreateEventUseCase";
import { Request, Response } from "express";

class CreateEventController {

    private createEventUseCase: CreateEventUseCase;

    public constructor (createEventUseCase: CreateEventUseCase) {

        this.createEventUseCase = createEventUseCase;

    }

    public async handle (request: Request, response: Response) {
        
        const {promoterCpf, nome, descricao, dataEvento, status, quantPista, quantStage, quantVip, valorPista, valorStage, valorVip} = request.body;
        const { cep, cidade, estado, bairro, rua, numero } = request.body;

        await this.createEventUseCase.execute(promoterCpf, nome, descricao, dataEvento, status, quantPista, quantStage, quantVip, valorPista, valorStage, valorVip, cep, cidade, estado, bairro, rua, numero);

        return response.status(201).json({message: "Evento criado com sucessso!"});
    }
}

export { CreateEventController };