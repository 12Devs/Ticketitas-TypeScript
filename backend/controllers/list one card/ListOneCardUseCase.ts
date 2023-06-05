import { CardRepository } from "../../db/CardRepository";
import { ApiError } from "../../errors/ApiError";

class ListOneCardUseCase {

    private cardRepository: CardRepository;

    constructor (cardRepository: CardRepository) {
        this.cardRepository = cardRepository;
    }

    public async execute (clientCpf: number){
        const card: any = await this.cardRepository.findAllByCpf(clientCpf);
    
        if(!card) {
            throw new ApiError("Cartão não encontrado", 400);
        }

        return { card };
    }

}

export { ListOneCardUseCase };