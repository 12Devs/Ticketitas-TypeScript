import { RemovePromoterUseCase } from "./RemovePromoterUseCase";
import { Request, Response } from "express";

class RemovePromoterController {

    private removePromoterUseCase: RemovePromoterUseCase;

    constructor (removePromoterUseCase: RemovePromoterUseCase) {
        this.removePromoterUseCase = removePromoterUseCase;
    }
    

    //removendo promoter
    public async handle (request: Request, response: Response, ){
        const { promoterCpf, id, nome, descricao, dataEvento, quantPista, quantStage, quantVip, valorPista, valorStage, valorVip, cep, estado, cidade, bairro, rua, numero } = request.body;
        const removePromoterr = await this.removePromoterUseCase.execute(promoterCpf);

        
        
        return response.status(200).json({removePromoterr});
    }



    
}

export {RemovePromoterController}