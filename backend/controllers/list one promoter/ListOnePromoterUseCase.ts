import { PromoterRepository } from "../../db/PromoterRepository";
import { EnderecoUserRepository } from "../../db/EnderecoUserRepository";
import { ApiError } from "../../errors/ApiError";

class ListOnePromoterUseCase {

    private promoterRepository: PromoterRepository;
    private enderecoUserRepository: EnderecoUserRepository;

    constructor (promoterRepository: PromoterRepository, enderecoUserRepository: EnderecoUserRepository) {
        this.promoterRepository = promoterRepository;
        this.enderecoUserRepository = enderecoUserRepository;
    }

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