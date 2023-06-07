import { EnderecoEventRepository } from "../../db/EnderecoEventRepository";
import { EventRepository } from "../../db/EventRepository";


/**
 * List highlights use case class
 * @date 6/6/2023 - 10:20:55 PM
 *
 * @class ListHighlightsUseCase
 * @typedef {ListHighlightsUseCase}
 */
class ListHighlightsUseCase {
    
    /**
     * Creates an instance of {@link ListHighlightsUseCase}.
     * @date 6/6/2023 - 10:21:00 PM
     *
     * @private
     * @type {EventRepository}
     */
    private eventRepository: EventRepository;
    private enderecoEventRepository: EnderecoEventRepository;
    
    /**
     * Creates an instance of ListHighlightsUseCase.
     * @date 6/6/2023 - 10:21:07 PM
     *
     * @constructor
     * @param {EventRepository} eventRepository
     * @param {EnderecoEventRepository} enderecoEventRepository
     */
    constructor(eventRepository: EventRepository, enderecoEventRepository: EnderecoEventRepository) {
        this.eventRepository = eventRepository;
        this.enderecoEventRepository = enderecoEventRepository;
    }

    /**
     * Method for make a creation of a event highlight
     * @date 6/6/2023 - 10:21:14 PM
     *
     * @public
     * @async
     * @returns {unknown}
     */
    public async execute() {

        const allHighlights: any = await this.eventRepository.findAllHighlights();

        for (let highlight of allHighlights) {
            const enderecoHighlight = await this.enderecoEventRepository.findOneEnderecoEvent(highlight.enderecoEventId);
            highlight.enderecoEvent = enderecoHighlight;
        }
        return allHighlights;
    }

}

export { ListHighlightsUseCase };