import { EditEventUseCase } from "./EditEventUseCase";
import { Request, Response } from "express";

class EditEventController {

    private editEventUseCase: EditEventUseCase;

    constructor (editEventUseCase: EditEventUseCase) {
        this.editEventUseCase = editEventUseCase;
    }
    

    //Alterando dados do evento
    public async handle (request: Request, response: Response, ){
        const { promoterCpf, id, nome, descricao, dataEvento, quantPista, quantStage, quantVip, valorPista, valorStage, valorVip, cep, estado, cidade, bairro, rua, numero } = request.body;
        const oneEvent = await this.editEventUseCase.execute(promoterCpf, id, nome, descricao, dataEvento, quantPista, quantStage, quantVip, valorPista, valorStage, valorVip, cep, estado, cidade, bairro, rua, numero);

        
        
        return response.status(200).json({oneEvent});
    }



    
}

export {EditEventController}