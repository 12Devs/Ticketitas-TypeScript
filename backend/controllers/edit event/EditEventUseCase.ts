import { EventRepository } from "../../db/EventRepository";



/**
 * Edit event use case class
 * @date 6/6/2023 - 10:18:01 PM
 *
 * @class EditEventUseCase
 * @typedef {EditEventUseCase}
 */
class EditEventUseCase{
    
    /**
     * Create an instance of {@link EditEventUseCase}
     * @date 6/6/2023 - 10:18:11 PM
     *
     * @private
     * @type {EventRepository}
     */
    private eventRepository: EventRepository;

    
    /**
     * Creates an instance of EditEventUseCase.
     * @date 6/6/2023 - 10:18:16 PM
     *
     * @constructor
     * @param {EventRepository} eventRepository
     */
    constructor (eventRepository: EventRepository) {
        this.eventRepository = eventRepository;
    }

    
    /**
     * Method for make a creation of a event
     * @date 6/6/2023 - 10:18:20 PM
     *
     * @public
     * @async
     * @param {number} promoterCpf
     * @param {string} id
     * @param {string} nome
     * @param {string} descricao
     * @param {Date} dataEvento
     * @param {number} quantPista
     * @param {number} quantStage
     * @param {number} quantVip
     * @param {number} valorPista
     * @param {number} valorStage
     * @param {number} valorVip
     * @param {number} cep
     * @param {string} estado
     * @param {string} cidade
     * @param {string} bairro
     * @param {string} rua
     * @param {number} numero
     * @returns {unknown}
     */
    public async execute (promoterCpf: number, id: string, nome: string, descricao: string, dataEvento: Date, quantPista: number, quantStage: number, quantVip: number, valorPista: number, valorStage: number, valorVip: number, cep: number, estado: string, cidade: string, bairro: string, rua: string, numero: number){
        const oneEvent = await this.eventRepository.updateData(promoterCpf, id, nome, descricao, dataEvento, quantPista, quantStage, quantVip, valorPista, valorStage, valorVip, cep, estado, cidade, bairro, rua, numero);
        return oneEvent;
    }



}
export { EditEventUseCase };