import { CardRepository } from "../../db/CardRepository";
import { ApiError } from "../../errors/ApiError";

/**
 * List one card use case class
 * @date 6/6/2023 - 10:23:27 PM
 *
 * @class ListOneCardUseCase
 * @typedef {ListOneCardUseCase}
 */
class ListOneCardUseCase {
    
    /**
     * Creates an instance of {@link ListOneCardUseCase}.
     * @date 6/6/2023 - 10:23:35 PM
     *
     * @private
     * @type {CardRepository}
     */
    private cardRepository: CardRepository;
    
    /**
     * Creates an instance of ListOneCardUseCase.
     * @date 6/6/2023 - 10:23:40 PM
     *
     * @constructor
     * @param {CardRepository} cardRepository
     */
    constructor (cardRepository: CardRepository) {
        this.cardRepository = cardRepository;
    }
    
    /**
     * Method for make a creation of a event
     * @date 6/6/2023 - 10:23:46 PM
     *
     * @public
     * @async
     * @param {number} clientCpf
     * @returns {unknown}
     */
    public async execute (clientCpf: number){
        const card: any = await this.cardRepository.findAllByCpf(clientCpf);
    
        if(!card) {
            throw new ApiError("Cartão não encontrado", 400);
        }

        return { card };
    }

}

export { ListOneCardUseCase };