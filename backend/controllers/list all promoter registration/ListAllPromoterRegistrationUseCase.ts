import { PromoterRegistrationRequestRepository } from "../../db/PromoterRegistrationRequestRepository";


/**
 * List events use case class
 * @date 6/6/2023 - 10:20:09 PM
 *
 * @class ListAllPromoterRegistrationUseCase
 * @typedef {ListAllPromoterRegistrationUseCase}
 */
class ListAllPromoterRegistrationUseCase {
    
    /**
     * Creates an instance of {@link ListAllPromoterRegistrationUseCase}.
     * @date 6/6/2023 - 10:20:14 PM
     *
     * @private
     * @type {EventRepository}
     */
    private promoterRegistrationRequestRepository: PromoterRegistrationRequestRepository;
    
    /**
     * Creates an instance of ListAllPromoterRegistrationUseCase.
     * @date 6/6/2023 - 10:20:18 PM
     *
     * @constructor
     * @param {EventRepository} eventRepository
     */
    constructor (promoterRegistrationRequestRepository: PromoterRegistrationRequestRepository) {
        this.promoterRegistrationRequestRepository = promoterRegistrationRequestRepository;
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
        const allPromoterRegistration = await this.promoterRegistrationRequestRepository.findAllPromoterRegistration();
        return allPromoterRegistration;
    }

}

export { ListAllPromoterRegistrationUseCase };