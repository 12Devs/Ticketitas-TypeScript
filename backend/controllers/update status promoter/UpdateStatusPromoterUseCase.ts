import { EventRepository } from "../../db/EventRepository";
import { PromoterRepository } from "../../db/PromoterRepository";
import { ApiError } from "../../errors/ApiError";

/**
 * Update status promoter use case class
 * @date 6/6/2023 - 10:42:35 PM
 *
 * @class UpdateStatusPromoterUseCase
 * @typedef {UpdateStatusPromoterUseCase}
 */
class UpdateStatusPromoterUseCase {
    
    /**
     * Create an instance of {@link UpdateStatusPromoterUseCase}
     * @date 6/6/2023 - 10:42:43 PM
     *
     * @private
     * @type {PromoterRepository}
     */
    private promoterRepository: PromoterRepository;
    private eventRepository: EventRepository;
    
    /**
     * Creates an instance of UpdateStatusPromoterUseCase.
     * @date 6/6/2023 - 10:42:47 PM
     *
     * @constructor
     * @public
     * @param {PromoterRepository} promoterRepository
     * @param {EventRepository} eventRepository
     */
    public constructor (promoterRepository: PromoterRepository, eventRepository: EventRepository) {
        this.promoterRepository = promoterRepository;
        this.eventRepository = eventRepository;

    }
    
    /**
     * Method for make a update of a promoter status
     * @date 6/6/2023 - 10:42:52 PM
     *
     * @public
     * @async
     * @param {number} cpf
     * @returns {*}
     */
    public async execute (cpf: number) {
        
        if(!cpf) {
            throw new ApiError("O cpf do promoter é obrigatório!", 422);
        }

        const promoterExists: any = await this.promoterRepository.findStatusByCpf(cpf);

        if (!promoterExists) {
            throw new ApiError("Promoter não encontrado!", 422);
        }

        let newStatus = true;

        if (promoterExists.status == true) {
            newStatus = false
        }

        await this.promoterRepository.updateStatus(cpf, newStatus);

        const allEventsByPromoter: any = await this.eventRepository.findIdStatuByCpfPromoter(cpf);

        if (!allEventsByPromoter) {
            return
        }
        
        for (let event of allEventsByPromoter) {
            await this.eventRepository.supendEvent(event.promoterCpf);
        }
        
    }

}

export { UpdateStatusPromoterUseCase };