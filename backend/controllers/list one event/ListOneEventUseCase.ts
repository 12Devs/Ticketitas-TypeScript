import { EnderecoEventRepository } from "../../db/EnderecoEventRepository";
import { EventRepository } from "../../db/EventRepository";
import { ApiError } from "../../errors/ApiError";

/**
 * List one event use case class
 * @date 6/6/2023 - 10:26:30 PM
 *
 * @class ListOneEventUseCase
 * @typedef {ListOneEventUseCase}
 */
class ListOneEventUseCase {
    
    /**
     * Creates an instance of {@link ListOneEventUseCase}.
     * @date 6/6/2023 - 10:26:37 PM
     *
     * @private
     * @type {EventRepository}
     */
    private eventRepository: EventRepository;
    private enderecoEventRepository: EnderecoEventRepository;
    
    /**
     * Creates an instance of ListOneEventUseCase.
     * @date 6/6/2023 - 10:27:02 PM
     *
     * @constructor
     * @param {EventRepository} eventRepository
     * @param {EnderecoEventRepository} enderecoEventRepository
     */
    constructor (eventRepository: EventRepository, enderecoEventRepository: EnderecoEventRepository) {
        this.eventRepository = eventRepository;
        this.enderecoEventRepository = enderecoEventRepository;
    }
    
    /**
     * Method for make a creation of a event
     * @date 6/6/2023 - 10:27:06 PM
     *
     * @public
     * @async
     * @param {string} id
     * @returns {unknown}
     */
    public async execute (id: string){
        const event: any = await this.eventRepository.findOneEvent(id);
    
        if(!event) {
            throw new ApiError("Evento não encontrado", 400);
        }

        const enderecoEvent: any = await this.enderecoEventRepository.findOneEnderecoEvent(event.enderecoEventId);

        
        return { event, enderecoEvent };
    }

}

export { ListOneEventUseCase };