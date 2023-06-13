import { EnderecoEventRepository } from "../../db/EnderecoEventRepository";
import { EventRepository } from "../../db/EventRepository";
import { ApiError } from "../../errors/ApiError";

/**
 * List events for a promoter use case class
 * @date 6/6/2023 - 10:31:57 PM
 *
 * @class ListEventsForPromoterUseCase
 * @typedef {ListEventsForPromoterUseCase}
 */
class ListEventsForPromoterUseCase {
    
    /**
     * Creates an instance of {@link ListEventsForPromoterUseCase}.
     * @date 6/6/2023 - 10:32:02 PM
     *
     * @private
     * @type {EventRepository}
     */
    private eventRepository: EventRepository;

    /**
     * Creates an instance of {@link ListEventsForPromoterUseCase}.
     * @date 6/6/2023 - 10:32:02 PM
     *
     * @private
     * @type {EnderecoEventRepository}
     */
    private enderecoEventRepository: EnderecoEventRepository;
    
    /**
     * Creates an instance of ListEventsForPromoterUseCase.
     * @date 6/6/2023 - 10:32:06 PM
     *
     * @constructor
     * @param {EventRepository} eventRepository
     */
    constructor (eventRepository: EventRepository, enderecoEventRepository: EnderecoEventRepository) {
        this.eventRepository = eventRepository;
        this.enderecoEventRepository = enderecoEventRepository;
    }
    
    /**
     * Method for make a creation of a event
     * @date 6/6/2023 - 10:32:11 PM
     *
     * @public
     * @async
     * @param {number} promoterCpf
     * @returns {unknown}
     */
    public async execute (promoterCpf: number){
        const events: any = await this.eventRepository.findByCpfPromoter(promoterCpf);

        for (var event of events) {
            const enderecoEvent = await this.enderecoEventRepository.findOneEnderecoEvent(event.enderecoEventId);
            event.enderecoEvent = enderecoEvent;
        }

        return events;
    }

}

export { ListEventsForPromoterUseCase };