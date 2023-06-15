import { EventRepository } from "../../db/EventRepository";


/**
 * List events use case class
 * @date 6/6/2023 - 10:20:09 PM
 *
 * @class ListActiveEventsUseCase
 * @typedef {ListActiveEventsUseCase}
 */
class ListActiveEventsUseCase {
    
    /**
     * Creates an instance of {@link ListActiveEventsUseCase}.
     * @date 6/6/2023 - 10:20:14 PM
     *
     * @private
     * @type {EventRepository}
     */
    private eventRepository: EventRepository;
    
    /**
     * Creates an instance of ListActiveEventsUseCase.
     * @date 6/6/2023 - 10:20:18 PM
     *
     * @constructor
     * @param {EventRepository} eventRepository
     */
    constructor (eventRepository: EventRepository) {
        this.eventRepository = eventRepository;
    }
    
    /**
     * Method for make a creation of a event
     * @date 6/6/2023 - 10:20:22 PM
     *
     * @public
     * @async
     * @returns {unknown}
     */
    public async execute (){
        const allActiveEvents = await this.eventRepository.findAllActiveEvents();
        return allActiveEvents;
    }

}

export { ListActiveEventsUseCase };