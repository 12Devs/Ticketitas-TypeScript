import { PromoterRepository } from "../../db/PromoterRepository";


/**
 * List events use case class
 * @date 6/6/2023 - 10:20:09 PM
 *
 * @class ListAllPromotersUseCase
 * @typedef {ListAllPromotersUseCase}
 */
class ListAllPromotersUseCase {
    
    /**
     * Creates an instance of {@link ListAllPromotersUseCase}.
     * @date 6/6/2023 - 10:20:14 PM
     *
     * @private
     * @type {EventRepository}
     */
    private promoterRepository: PromoterRepository;
    
    /**
     * Creates an instance of ListAllPromotersUseCase.
     * @date 6/6/2023 - 10:20:18 PM
     *
     * @constructor
     * @param {EventRepository} eventRepository
     */
    constructor (promoterRepository: PromoterRepository) {
        this.promoterRepository = promoterRepository;
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
        const allPromoters = await this.promoterRepository.findAllPromoters();
        return allPromoters;
    }

}

export { ListAllPromotersUseCase };