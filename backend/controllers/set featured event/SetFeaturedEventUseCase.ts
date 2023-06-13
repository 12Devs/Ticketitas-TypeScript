import { EventRepository } from "../../db/EventRepository";
import { ApiError } from "../../errors/ApiError";


/**
 * Set featured event use case class
 * @date 6/6/2023 - 10:39:50 PM
 *
 * @class SetFeaturedEventUseCase
 * @typedef {SetFeaturedEventUseCase}
 */
class SetFeaturedEventUseCase {
    
    /**
     * Create an instance of {@link SetFeaturedEventUseCase}
     * @date 6/6/2023 - 10:39:53 PM
     *
     * @private
     * @type {EventRepository}
     */
    private eventRepository: EventRepository;
    
    /**
     * Creates an instance of SetFeaturedEventUseCase.
     * @date 6/6/2023 - 10:39:57 PM
     *
     * @constructor
     * @public
     * @param {EventRepository} eventRepository
     */
    public constructor (eventRepository: EventRepository){
        this.eventRepository = eventRepository;
    }
    
    /**
     * Method for make a creation of a event
     * @date 6/6/2023 - 10:40:01 PM
     *
     * @public
     * @async
     * @param {string} id
     * @returns {*}
     */
    public async execute (id: string) {
        //Validations
        if(!id) {
            throw new ApiError("O id é obrigatório!", 422);
        }

        await this.eventRepository.setFeatured(id);
    }
}

export { SetFeaturedEventUseCase };