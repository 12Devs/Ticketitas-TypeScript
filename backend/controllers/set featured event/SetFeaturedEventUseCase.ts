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
        const event: any = await this.eventRepository.findDestaqueById(id);

        if (!event) {
            throw new ApiError("Evento não encontrado!", 422);
        }

        if (event.status == false) {
            throw new ApiError("Eventos desativados não podem ser destaque", 422);
        }

        let newStatus = true;

        if (event.destaque == true) {
            newStatus = false
        }

        await this.eventRepository.setFeatured(id, newStatus);
    }
}

export { SetFeaturedEventUseCase };