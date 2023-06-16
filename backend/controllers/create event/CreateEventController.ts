import { CreateEventUseCase } from "./CreateEventUseCase";
import { Request, Response } from "express";



/**
 * Create event controller class
 * @date 6/6/2023 - 10:04:39 PM
 *
 * @class CreateEventController
 * @typedef {CreateEventController}
 */
class CreateEventController {

    
    /**
     * Creates an instances of {@link CreateEventController}
     * @date 6/6/2023 - 10:04:50 PM
     *
     * @private
     * @type {CreateEventUseCase}
     */
    private createEventUseCase: CreateEventUseCase;

    

    /**
     * Creates an instance of CreateEventController.
     * @date 6/6/2023 - 10:05:13 PM
     *
     * @constructor
     * @public
     * @param {CreateEventUseCase} createEventUseCase
     */
    public constructor (createEventUseCase: CreateEventUseCase) {

        this.createEventUseCase = createEventUseCase;

    }

    

    /**
     * Manipulate the requisition for create a event
     * @date 6/6/2023 - 10:05:34 PM
     *
     * @public
     * @async
     * @param {Request} request
     * @param {Response} response
     * @returns {unknown}
     */
    public async handle (request: Request, response: Response) {
        
        const {promoterCpf, nome, descricao, dataEvento, status, quantPista, quantStage, quantVip, valorPista, valorStage, valorVip, porcentagemMeia, porcentagemGratis} = request.body;
        const { cep, cidade, estado, bairro, rua, numero } = request.body;

        const event = await this.createEventUseCase.execute(promoterCpf, nome, descricao, dataEvento, status, quantPista, quantStage, quantVip, valorPista, valorStage, valorVip, porcentagemMeia, porcentagemGratis, cep, cidade, estado, bairro, rua, numero);

        return response.status(201).json(event);
    }
}

export { CreateEventController };