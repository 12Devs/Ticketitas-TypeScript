import { EventRepository } from "../../db/EventRepository";
import { ApiError } from "../../errors/ApiError";

class UpdateStatusEventUseCase {

    private eventRepository: EventRepository;

    public constructor (eventRepository: EventRepository) {
        this.eventRepository = eventRepository;
    }

    public async execute (id: string, promoterCpf: number) {

        if (!id) {
            throw new ApiError("Id do evento é obrigatório", 422);
        }

        if (!promoterCpf) {
            throw new ApiError("Cpf do promoter é obrigatório", 422);
        }

        const belongsToPromoter: any = await this.eventRepository.findByIdAndCpfPromoter(id, promoterCpf);

        if (!belongsToPromoter) {
            throw new ApiError("Evento não encontrado ou não pertence ao promoter!", 422);
        }

        let newStatus = true;

        if (belongsToPromoter.status == true) {
            newStatus = false
        }

        await this.eventRepository.updateStatus(id, promoterCpf, newStatus);
    }
}

export { UpdateStatusEventUseCase };