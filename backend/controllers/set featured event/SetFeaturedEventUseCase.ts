import { EventRepository } from "../../db/EventRepository";
import { ApiError } from "../../errors/ApiError";


class SetFeaturedEventUseCase {

    private eventRepository: EventRepository;

    public constructor (eventRepository: EventRepository){
        this.eventRepository = eventRepository;
    }

    public async execute (id: string) {
        //Validations
        if(!id) {
            throw new ApiError("O id é obrigatório!", 422);
        }

        await this.eventRepository.setFeatured(id);
    }
}

export { SetFeaturedEventUseCase };