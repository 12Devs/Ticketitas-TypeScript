import { EventRepository } from "../../db/EventRepository";
import { PromoterRepository } from "../../db/PromoterRepository";
import { ApiError } from "../../errors/ApiError";

class UpdateStatusPromoterUseCase {

    private promoterRepository: PromoterRepository;
    private eventRepository: EventRepository;

    public constructor (promoterRepository: PromoterRepository, eventRepository: EventRepository) {
        this.promoterRepository = promoterRepository;
        this.eventRepository = eventRepository;

    }

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