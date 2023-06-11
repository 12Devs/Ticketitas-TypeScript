import { CardRepository } from "../../db/CardRepository";
import { ApiError } from "../../errors/ApiError";
import bcrypt from 'bcrypt';

/**
 * Update card use case class
 * @date 6/6/2023 - 10:40:25 PM
 *
 * @class UpdateCardUseCase
 * @typedef {UpdateCardUseCase}
 */
class UpdateCardUseCase {
    
    /**
     * Creates an instance of {@link UpdateCardUseCase}.
     * @date 6/6/2023 - 10:40:29 PM
     *
     * @private
     * @type {CardRepository}
     */
    private cardRepository: CardRepository;
    
    /**
     * Creates an instance of UpdateCardUseCase.
     * @date 6/6/2023 - 10:40:32 PM
     *
     * @constructor
     * @public
     * @param {CardRepository} cardRepository
     */
    public constructor (cardRepository: CardRepository) {
        this.cardRepository = cardRepository;
    }
    
    /**
     * Method for update a card
     * @date 6/6/2023 - 10:40:36 PM
     *
     * @public
     * @async
     * @param {number} cpf
     * @param {number} cardNumber
     * @param {string} holder
     * @param {number} monthExpirationDate
     * @param {number} yearExpirationDate
     * @param {number} cvv
     * @returns {*}
     */
    public async execute (cpf: number, cardNumber: number, holder: string, monthExpirationDate: number, yearExpirationDate: number, cvv: number){

        //Validations
        if(!cardNumber) {
            throw new ApiError("O número do cartão é obrigatório!", 422);
        }

        if(13 > `${cardNumber}`.length || `${cardNumber}`.length > 16) {
            throw new ApiError("O número do cartão deve ter entre 13 e 16 dígitos!", 422);
        }

        if(!holder) {
            throw new ApiError("O nome do titular do cartão é obrigatório!", 422);
        }

        if(monthExpirationDate === null || monthExpirationDate === undefined) {
            throw new ApiError("A data de validade do cartão é obrigatória!", 422);
        }

        if(yearExpirationDate === null || yearExpirationDate === undefined) {
            throw new ApiError("A data de validade do cartão é obrigatória!", 422);
        }

        if(!cvv) {
            throw new ApiError("O cvv do cartão é obrigatório!", 422);
        }

        if(`${cvv}`.length !== 3) {
            throw new ApiError("O cvv do cartão deve ter 3 dígitos!", 422);
        }

        const expirationDate = new Date(yearExpirationDate, (monthExpirationDate - 1), 1);
        
        const salt = await bcrypt.genSalt(11);
        
        const cvvHash: any = await bcrypt.hash("cvv", salt);
        
        const cardExists: any = await this.cardRepository.findByCpf(cpf);

        if(cardExists) {
            await this.cardRepository.remove(cardExists.id);
        }

        await this.cardRepository.create(cpf, cardNumber, holder, expirationDate, cvvHash);
    }

}

export { UpdateCardUseCase };