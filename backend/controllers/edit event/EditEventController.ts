import { EditEventUseCase } from "./EditEventUseCase";
import { Request, Response } from "express";

/**
 * Edit event controller class
 * @date 6/6/2023 - 10:17:33 PM
 *
 * @class EditEventController
 * @typedef {EditEventController}
 */
class EditEventController {
    
    /**
     * Creates an instance of {@link EditEventController}.
     * @date 6/6/2023 - 10:17:38 PM
     *
     * @private
     * @type {EditEventUseCase}
     */
    private editEventUseCase: EditEventUseCase;
    
    /**
     * Creates an instance of EditEventController.
     * @date 6/6/2023 - 10:17:43 PM
     *
     * @constructor
     * @param {EditEventUseCase} editEventUseCase
     */
    constructor (editEventUseCase: EditEventUseCase) {
        this.editEventUseCase = editEventUseCase;
    }
    
    /**
     * Manipulate method for make a edit of a event
     * @date 6/6/2023 - 10:17:53 PM
     *
     * @public
     * @async
     * @param {Request} request
     * @param {Response} response
     * @returns {unknown}
     */
    public async handle (request: Request, response: Response, ){
        const { promoterCpf, id, nome, descricao, dataEvento, quantPista, quantStage, quantVip, valorPista, valorStage, valorVip, cep, estado, cidade, bairro, rua, numero } = request.body;
        const oneEvent = await this.editEventUseCase.execute(promoterCpf, id, nome, descricao, dataEvento, quantPista, quantStage, quantVip, valorPista, valorStage, valorVip, cep, estado, cidade, bairro, rua, numero);

        
        
        return response.status(200).json({oneEvent});
    }



    
}

export {EditEventController}