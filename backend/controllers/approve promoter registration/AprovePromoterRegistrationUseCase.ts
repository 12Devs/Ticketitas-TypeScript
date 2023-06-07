import { PromoterRegistrationRequestRepository } from "../../db/PromoterRegistrationRequestRepository";
import { PromoterRepository } from "../../db/PromoterRepository";
import { ApiError } from "../../errors/ApiError";


/**
 * Promoter Registration Approval Use Case Class
 * @date 6/6/2023 - 5:01:41 PM
 *
 * @class AprovePromoterRegistrationUseCase
 * @typedef {AprovePromoterRegistrationUseCase}
 */
class AprovePromoterRegistrationUseCase {
    
    /**
     * Creates an instances of {@link AprovePromoterRegistrationUseCase}
     * @date 6/6/2023 - 5:04:08 PM
     *
     * @private Marks this instance as having "private" visibility
     * @type {PromoterRegistrationRequestRepository}
     */
    private promoterRegistrationRequestRepository: PromoterRegistrationRequestRepository;
    private promoterRepository: PromoterRepository;

    
    /**
     * Creates an instance of AprovePromoterRegistrationUseCase.
     * @date 6/6/2023 - 5:05:21 PM
     *
     * @constructor Marks this part of the code as a constructor
     * @public Marks this method as having "public" visibility
     * @param {PromoterRegistrationRequestRepository} promoterRegistrationRequestRepository
     * @param {PromoterRepository} promoterRepository
     */
    public constructor (promoterRegistrationRequestRepository: PromoterRegistrationRequestRepository, promoterRepository: PromoterRepository) {
        this.promoterRegistrationRequestRepository = promoterRegistrationRequestRepository;
        this.promoterRepository = promoterRepository;
    }

    
    /**
     * Method for aprove the registration of promother
     * @date 6/6/2023 - 5:06:23 PM
     *
     * @public Marks this method as having "public" visibility
     * @async Marks this method as being asynchronous
     * @param {number} promoterCpf
     * @returns {*} 
     */
    public async execute (promoterCpf: number) {

        if(!promoterCpf) {
            throw new ApiError("O cpf do promoter é obrigatório!", 422);
        }

        const registrationRequestExists = await this.promoterRegistrationRequestRepository.registrationRequestExists(promoterCpf);
        
        if (!registrationRequestExists) {
            throw new ApiError("Não existe solicitação de cadastro para esse promoter!", 422);
        }

        await this.promoterRegistrationRequestRepository.remove(promoterCpf);
        
        await this.promoterRepository.updateStatusRegistration(promoterCpf);
    }

}

export { AprovePromoterRegistrationUseCase };