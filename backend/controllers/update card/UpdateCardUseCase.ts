import { CardRepository } from "../../db/CardRepository";
import { ApiError } from "../../errors/ApiError";
import bcrypt from 'bcrypt';

class UpdateCardUseCase {

    private cardRepository: CardRepository;

    public constructor (cardRepository: CardRepository) {
        this.cardRepository = cardRepository;
    }

    public async execute (cpf: number, cardNumber: number, holder: string, expirationDate: string, cvv: number){

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

        if(!expirationDate) {
            throw new ApiError("A data de validade do cartão é obrigatória!", 422);
        }

        if(!cvv) {
            throw new ApiError("O cvv do cartão é obrigatório!", 422);
        }

        if(`${cvv}`.length !== 3) {
            throw new ApiError("O cvv do cartão deve ter 3 dígitos!", 422);
        }

        const salt = await bcrypt.genSalt(11);
        const cardNumberHash = await bcrypt.hash("cardNumber", salt);
        const holderHash = await bcrypt.hash(holder, salt);
        const expirationDateHash = await bcrypt.hash(expirationDate, salt);
        const cvvHash = await bcrypt.hash("cvv", salt);
        
        const cardExists: any = await this.cardRepository.findByCpf(cpf);

        if(cardExists) {
            await this.cardRepository.remove(cardExists.id);
        }

        await this.cardRepository.create(cpf, cardNumberHash, holderHash, expirationDateHash, cvvHash);
    }

}

export { UpdateCardUseCase };