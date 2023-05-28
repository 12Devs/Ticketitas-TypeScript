import { PromoterRegistrationRequestRepository } from "../../db/PromoterRegistrationRequestRepository";
import { PromoterRepository } from "../../db/PromoterRepository";
import { ApiError } from "../../errors/ApiError";


class AprovePromoterRegistrationUseCase {

    private promoterRegistrationRequestRepository: PromoterRegistrationRequestRepository;
    private promoterRepository: PromoterRepository;

    public constructor (promoterRegistrationRequestRepository: PromoterRegistrationRequestRepository, promoterRepository: PromoterRepository) {
        this.promoterRegistrationRequestRepository = promoterRegistrationRequestRepository;
        this.promoterRepository = promoterRepository;
    }

    public async execute (promoterCpf: number) {

        if(!promoterCpf) {
            throw new ApiError("O cpf do promoter é obrigatório!", 422);
        }

        const registrationRequestExists = await this.promoterRegistrationRequestRepository.registrationRequestExists(promoterCpf);
        
        if (!registrationRequestExists) {
            throw new ApiError("Não existe solicitação de cadastro para esse promoter!", 422);
        }

        await this.promoterRegistrationRequestRepository.remove(promoterCpf);
        
        await this.promoterRepository.updateStatus(promoterCpf);
    }

}

export { AprovePromoterRegistrationUseCase };