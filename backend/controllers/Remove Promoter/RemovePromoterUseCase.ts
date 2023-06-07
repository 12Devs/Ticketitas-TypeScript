import { PromoterRepository } from "../../db/PromoterRepository";



/**
 * Create event use case class
 * @date 6/6/2023 - 10:39:10 PM
 *
 * @class RemovePromoterUseCase
 * @typedef {RemovePromoterUseCase}
 */
class RemovePromoterUseCase{
    
    /**
     * Create an instance of {@link RemovePromoterUseCase}
     * @date 6/6/2023 - 10:39:18 PM
     *
     * @private
     * @type {PromoterRepository}
     */
    private promoterRepository: PromoterRepository;

    
    /**
     * Creates an instance of RemovePromoterUseCase.
     * @date 6/6/2023 - 10:39:22 PM
     *
     * @constructor
     * @param {PromoterRepository} eventRepository
     */
    constructor (eventRepository: PromoterRepository) {
        this.promoterRepository = eventRepository;
    }

    
    /**
     * Method for make a creation of a event
     * @date 6/6/2023 - 10:39:26 PM
     *
     * @public
     * @async
     * @param {number} promoterCpf
     * @returns {unknown}
     */
    public async execute (promoterCpf: number){
        const oneEvent = await this.promoterRepository.RemovePromoterByCpf(promoterCpf);
        return oneEvent;
    }



}
export { RemovePromoterUseCase };