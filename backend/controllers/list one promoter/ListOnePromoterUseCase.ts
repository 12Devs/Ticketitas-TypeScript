import { PromoterRepository } from "../../db/PromoterRepository";
import { EnderecoUserRepository } from "../../db/EnderecoUserRepository";
import { ApiError } from "../../errors/ApiError";

/**
 * List one promoter use case class
 * @date 6/6/2023 - 10:28:00 PM
 *
 * @class ListOnePromoterUseCase
 * @typedef {ListOnePromoterUseCase}
 */
class ListOnePromoterUseCase {
    
    /**
     * Creates an instance of {@link ListOnePromoterUseCase}.
     * @date 6/6/2023 - 10:28:06 PM
     *
     * @private
     * @type {PromoterRepository}
     */
    private promoterRepository: PromoterRepository;
    private enderecoUserRepository: EnderecoUserRepository;
    
    /**
     * Creates an instance of ListOnePromoterUseCase.
     * @date 6/6/2023 - 10:28:11 PM
     *
     * @constructor
     * @param {PromoterRepository} promoterRepository
     * @param {EnderecoUserRepository} enderecoUserRepository
     */
    constructor (promoterRepository: PromoterRepository, enderecoUserRepository: EnderecoUserRepository) {
        this.promoterRepository = promoterRepository;
        this.enderecoUserRepository = enderecoUserRepository;
    }
    
    /**
     * Method for list one promoter
     * @date 6/6/2023 - 10:28:15 PM
     *
     * @public
     * @async
     * @param {number} cpf
     * @returns {unknown}
     */
    public async execute (cpf: number){
        const promoter: any = await this.promoterRepository.findOnePromoter(cpf);
    
        if(!promoter) {
            throw new ApiError("Promoter não encontrado", 400);
        }

        const enderecoPromoter: any = await this.enderecoUserRepository.findOneEnderecoUser(promoter.enderecoUserId);

        
        return { promoter, enderecoPromoter };
    }

}

export { ListOnePromoterUseCase };